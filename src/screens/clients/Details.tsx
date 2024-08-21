import 'react-responsive-modal/styles.css';

import React, { useState, useEffect, useCallback } from 'react'
import swal from 'sweetalert'
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import Table from '../../components/Table'
import ReportCard from '../../components/ReportCard'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getReportsByUser, Report } from '../../services/report'
import { getClient, deleteClient, User } from '../../services/users'
import { getRanches, deleteRanch, Ranch } from '../../services/ranches'

const ClientDetailsScreen = () => {
    const { state } = useLocation()
    const [client, setClient] = useState<User>(state)
    const [ranches, setRanches] = useState<Ranch[]>([])
    const [reports, setReports] = useState<Report[]>([])

    const { userId } = useParams()
    const navigate = useNavigate()

    const fetch = useCallback(() => {
        if (userId) {
            if (!state) getClient(userId).then(setClient)
            getRanches(userId).then(setRanches)
        }
    }, [state, userId])

    useEffect(() => {
        fetch()
        if (userId) {
            getReportsByUser(userId)
                .then(setReports)
        }
    }, [userId, fetch])

    const removeClient = () => {
        if (!userId) return
        swal({
            title: 'Deseja realmente remover o cliente?',
            text: 'Todos os relatórios desse cliente também serão removidos.',
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
                deleteClient(userId)
                    .then(() => { swal('', 'Cliente removido com sucesso!', 'success') })
                    .then(() => navigate('/clientes'))
                    .catch(e => swal('', e.message, 'error'))
            }
        })
    }

    const renderTopBarButtons = () => {
        return (
            <div className="column">
                <BiEdit 
                    size={25} 
                    className='svg-button' 
                    onClick={() => navigate(`/clientes/${userId}/editar`, { state: client })} 
                    />
                <BiTrash onClick={removeClient} size={25} className='svg-button' />
            </div>
        )
    }

    const removeRanch = (ranch: Ranch) => {
        swal({
            title: 'Deseja realmente remover essa propriedade?', 
            text: 'Os relatórios relacionados a essa propriedade também serão removidos.',
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
                deleteRanch(ranch.id)
                    .then(() => { swal('', 'Propriedade removida com sucesso!', 'success') })
                    .then(fetch)
                    .catch(e => swal('', e.message, 'error'))
            }
        })
    }

    const renderAddress = () => {
        const addressComponents: string[] = []

        if (client?.streetName) addressComponents.push(client.streetName)
        if (client?.streetNumber) addressComponents.push(client.streetNumber)
        if (client?.addressComplement) addressComponents.push(client.addressComplement)
        if (client?.neighborhood) addressComponents.push(client.neighborhood)
        if (client?.postalCode) addressComponents.push(client.postalCode)
        if (client?.city) addressComponents.push(client.city)
        if (client?.state) addressComponents.push(client.state)
        
        return addressComponents.join(', ')
    }

    return (
        <ScreenTemplate
            backLink='/clientes'
            title='Detalhes do cliente'
            rightComponent={renderTopBarButtons()}
        >
            <>
                <p>Nome: {client?.name || '-'}</p>
                <p>Endereço: {renderAddress()}</p>
                <p>CPF/CNPJ: {client?.document || '-'}</p>
                <p>Email: {client?.email || '-'}</p>
                <p>Telefone: {client?.phone || '-'}</p>
                <Table 
                    title='Propriedades'
                    righComponent={
                        <BiPlus
                            size={25}
                            className='svg-button'
                            onClick={() => navigate(`/clientes/${userId}/propriedades`)}
                        />
                    }
                >
                    <>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Endereço</th>
                                <th>Cidade</th>
                                <th>Estado</th>
                                <th>Inscrição</th>
                                <th>Observações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranches.map(ranch => (
                                <tr key={ranch.id}>
                                    <td>{ranch.name}</td>
                                    <td>{ranch.address}</td>
                                    <td>{ranch.city}</td>
                                    <td>{ranch.state}</td>
                                    <td>{ranch.ie}</td>
                                    <td>{ranch.comments}</td>
                                    <td>
                                        <BiEdit
                                            size={15}
                                            onClick={() => navigate(`/clientes/${userId}/propriedades/${ranch.id}`, { state: ranch })}
                                        />
                                    </td>
                                    <td><BiTrash size={15} onClick={() => removeRanch(ranch)} /></td>
                                </tr>
                            ))}
                            {!ranches.length && <tr><td colSpan={6}>Nenhuma propriedade cadastrada</td></tr>}
                        </tbody>
                    </>
                </Table>

                <p>Relatórios</p>
                {reports.map(report => (
                    <Link key={report.id} to={`/relatorios/${report.id}`} state={report}>
                        <ReportCard report={report} />
                    </Link>
                ))}
                {!reports.length && <p>Nenhum relatório cadastrado</p>}
            </>
        </ScreenTemplate>
    )
}

export default ClientDetailsScreen