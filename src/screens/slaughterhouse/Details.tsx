import React, { useState, useEffect, useCallback } from 'react'
import swal from 'sweetalert'
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Table from '../../components/Table'
import ReportCard from '../../components/ReportCard'
import ScreenTemplate from '../../components/ScreenTemplate'

import { 
    deleteSlaughterhouse, 
    getSlaughterhouse, 
    getSlaughterhouseUnits, 
    deleteSlaughterhouseUnit,
    Slaughterhouse, 
    SlaughterhouseUnit
} from '../../services/slaughterhouse'
import { getReportsBySlaughterhouse, Report } from '../../services/report'
import Loading from '../../components/Loading'

const SlaughterhouseDetailsScreen = () => {
    const [units, setUnits] = useState<SlaughterhouseUnit[]>([])
    const [slaughterhouse, setSlaughterhouse] = useState<Slaughterhouse>()
    const [reports, setReports] = useState<Report[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingReports, setLoadingReports] = useState(true)

    const { slaughterhouseId } = useParams()
    
    const navigate = useNavigate();

    const fetch = useCallback(() => {
        if (slaughterhouseId) {
            getSlaughterhouse(slaughterhouseId)
                .then(setSlaughterhouse)
                .catch(e => swal('', e.message, 'error'))
                .finally(() => setLoading(false))
            getSlaughterhouseUnits(slaughterhouseId)
                .then(setUnits)
        }
    }, [slaughterhouseId])

    useEffect(() => {
        fetch()
        if(slaughterhouseId) {
            getReportsBySlaughterhouse(slaughterhouseId)
                .then(setReports)
                .catch(e => swal('', e.message, 'error'))
                .finally(() => setLoadingReports(false))
        }
    }, [slaughterhouseId, fetch])

    function removeSlaughterhouse() {
        if (!slaughterhouseId) return
        swal({
            title: 'Deseja realmente remover esse abatedouro?',
            text: 'Todos os relatórios relacionados a esse abatedouro também serão removidos.',
            icon: 'warning',
            buttons: {
                cancel: {
                    visible: true,
                    text: 'Não'
                },
                confirm: {
                    text: 'Sim',
                },
            },
            dangerMode: true,
        })
        .then(confirm => {
            if (confirm) {
                deleteSlaughterhouse(slaughterhouseId)
                    .then(() => { swal('', 'Abatedouro removido com sucesso!', 'success') })
                    .then(() => navigate('/abatedouros'))
                    .catch(swal)
            }
        })
    }

    function renderTopBarButtons() {
        return (
            <div className="column">
                <BiEdit
                    size={25}
                    className='svg-button'
                    onClick={() => navigate(`/abatedouros/${slaughterhouseId}/editar`)}
                />
                <BiTrash onClick={removeSlaughterhouse} size={25} className='svg-button' />
            </div>
        )
    }

    function deleteUnit(unit: SlaughterhouseUnit) {
        swal({
            title: 'Deseja realmente remover essa unidade abatedoura?',
            text: 'Todos os relatórios relacionados a essa unidade também serão removidos.',
            icon: 'warning',
            buttons: {
                cancel: {
                    visible: true,
                    text: 'Não'
                },
                confirm: {
                    text: 'Sim',
                },
            },
            dangerMode: true,
        })
        .then(confirm => {
            if (confirm) {
                deleteSlaughterhouseUnit(unit.slaughterhouseId, unit.id)
                    .then(() => { swal('', 'Unidade abatedoura removida com sucesso!', 'success') })
                    .then(fetch)
                    .catch(swal)
            }
        })
    }

    return (
        <ScreenTemplate
            backLink='/slaughterhouses'
            title='Detalhes do abatedouro'
            rightComponent={renderTopBarButtons()}
        >
            <>

                <Loading loading={loading} />

                <p>Nome: {slaughterhouse?.name}</p>
                <Table
                    title='Unidades abatedoura'
                    righComponent={
                        <BiPlus
                            size={25}
                            className='svg-button'
                            onClick={() => navigate(`/abatedouros/${slaughterhouseId}/unidades/adicionar`)}
                        />
                    }
                >
                    <>
                        <thead>
                            <tr>
                                <th>Cidade</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {units.map(unit => (
                                <tr key={unit.id}>
                                    <td>{unit.city}</td>
                                    <td>{unit.state}</td>
                                    <td>
                                        <BiEdit
                                            size={15}
                                            onClick={() => navigate(`/abatedouros/${slaughterhouseId}/unidades/${unit.id}/editar`)}
                                        />
                                    </td>
                                    <td><BiTrash size={15} onClick={() => deleteUnit(unit)} /></td>
                                </tr>
                            ))}
                            {!units.length && <tr><td colSpan={3}>Nenhuma unidade abatedoura cadastrada</td></tr>}
                        </tbody>
                    </>
                </Table>
                
                <p>Relatórios</p>
                {reports.map(report => (
                    <Link key={report.id} to={`/reports/${report.id}`}>
                        <ReportCard report={report} />
                    </Link>
                ))}
                {!!loadingReports && <p>Carregando relatórios...</p>}
                {!loadingReports && !reports.length && <p>Nenhum relatório cadastrado</p>}
            </>
        </ScreenTemplate>
    )
}

export default SlaughterhouseDetailsScreen