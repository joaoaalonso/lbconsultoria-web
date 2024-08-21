import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import Table from '../../components/Table'
// import ReportCard from '../../components/ReportCard'
import ScreenTemplate from '../../components/ScreenTemplate'

import { 
    deleteSlaughterhouse, 
    getSlaughterhouse, 
    getSlaughterhouseUnits, 
    deleteSlaughterhouseUnit,
    Slaughterhouse, 
    SlaughterhouseUnit
} from '../../services/slaughterhouse'
// import { getReportsBy, ReportItem } from '../../services/report'

const SlaughterhouseDetailsScreen = () => {
    const { state } = useLocation()
    // const [modalIsOpen, setModalIsOpen] = useState(false)
    // const [unitModalIsOpen, setUnitModalIsOpen] = useState(false)
    
    const [units, setUnits] = useState<SlaughterhouseUnit[]>([])
    const [slaughterhouse, setSlaughterhouse] = useState<Slaughterhouse>(state)
    // const [reports, setReports] = useState<ReportItem[]>([])

    // const [selectedUnit, setSelectedUnit] = useState<SlaughterhouseUnit>()
    
    const { slaughterhouseId } = useParams()
    
    const navigate = useNavigate();

    useEffect(() => {
        fetch()
        // if(slaughterhouseId) {
        //     getReportsBy('slaughterhouseId', parseInt(id)).then(setReports)
        // }
    }, [slaughterhouseId])

    function fetch() {
        if (slaughterhouseId) {
            if (!state) getSlaughterhouse(slaughterhouseId).then(setSlaughterhouse)
            getSlaughterhouseUnits(slaughterhouseId).then(setUnits)
        }
    }

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
                    onClick={() => navigate(`/abatedouros/${slaughterhouseId}/editar`, { state: slaughterhouse })}
                />
                <BiTrash onClick={removeSlaughterhouse} size={25} className='svg-button' />
            </div>
        )
    }

    function handleOnSave() {
        fetch()
        // resetModal()
    }

    function resetModal() {
        // setModalIsOpen(false)
        // setUnitModalIsOpen(false)
        // setSelectedUnit(undefined)
    }

    function editUnit(unit: SlaughterhouseUnit) {
        // setSelectedUnit(unit)
        // setUnitModalIsOpen(true)
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
                                            onClick={() => navigate(`/abatedouros/${slaughterhouseId}/unidades/${unit.id}/editar`, { state: unit })}
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
                {/* {reports.map(report => (
                    <Link key={report.id} to={`/reports/${report.id}`}>
                        <ReportCard report={report} />
                    </Link>
                ))}
                {!reports.length && <p>Nenhum relatório cadastrado</p>} */}

                {/* <Modal open={modalIsOpen} onClose={resetModal}>
                    <div style={{ width: 400, padding: 24, paddingTop: 36 }}>
                        <SlaughterhouseForm
                            onSave={handleOnSave}
                            slaughterhouse={slaughterhouse}
                        />
                    </div>
                </Modal>
                {!!slaughterhouse &&
                    <Modal open={unitModalIsOpen} onClose={resetModal}>
                        <div style={{ width: 400, padding: 24, paddingTop: 36 }}>
                            <SlaughterhouseUnitForm
                                onSave={handleOnSave}
                                slaughterhouseId={slaughterhouse.id}
                                slaughterhouseUnit={selectedUnit}
                            />
                        </div>
                    </Modal>
                } */}
            </>
        </ScreenTemplate>
    )
}

export default SlaughterhouseDetailsScreen