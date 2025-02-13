import './Details.css'

import React, { useState, useEffect, useCallback } from 'react'
import swal from 'sweetalert'
import { IoSearch } from 'react-icons/io5'
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'

import Table from '../../components/Table'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import ReportCard from '../../components/ReportCard'
import ScreenTemplate from '../../components/ScreenTemplate'

import { isAdmin, recoveryPassword } from '../../services/auth'
import { getReportsByUser, Report } from '../../services/report'
import { formatDocument, formatPhone } from '../../utils/formatter'
import { getClient, deleteClient, User } from '../../services/users'
import { downloadReportPDFById } from '../../services/generateReport'
import { getRanches, deleteRanch, Ranch } from '../../services/ranches'

const ClientDetailsScreen = () => {
    const [loading, setLoading] = useState(true)
    const [loadingReports, setLoadingReports] = useState(true)
    const [client, setClient] = useState<User>()
    const [ranches, setRanches] = useState<Ranch[]>([])
    const [reports, setReports] = useState<Report[]>([])
    const [sendingEmail, setSendingEmail] = useState(false)
    const [generatingPdf, setGeneratingPdf] = useState(false)

    const { userId } = useParams()
    const navigate = useNavigate()

    const fetch = useCallback(() => {
        if (userId) {
            getClient(userId)
                .then(setClient)
                .catch(e => swal('', e.message, 'error'))
                .finally(() => setLoading(false))
            getRanches(userId)
                .then(setRanches)
        }
    }, [userId])

    useEffect(() => {
        fetch()
        if (userId) {
            getReportsByUser(userId)
                .then(setReports)
                .catch(e => swal('', e.message, 'error'))
                .finally(() => setLoadingReports(false))
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
                    onClick={() => navigate(`/clientes/${userId}/editar`)} 
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

    const downloadPdf = async (reportId: string) => {
        setGeneratingPdf(true)
        downloadReportPDFById(reportId)
            .finally(() => setGeneratingPdf(false))
    }

    const sendPasswordEmail = () => {
        if (!client?.email || !client?.document) return

        return swal({
            title: 'Deseja enviar o e-mail de criação de senha?',
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
                setSendingEmail(true)
                return recoveryPassword(client.document)
                    .then(() => swal('', 'E-mail de criação de senha enviado com sucesso.', 'success'))
                    .catch(() => swal('', 'Não foi possível enviar o e-mail.', 'error'))
                    .finally(() => setSendingEmail(false))
            }
        })
    }

    const showAddress = (address: string) => {
        swal(address)
    }

    return (
        <ScreenTemplate
            backLink='/clientes'
            title='Detalhes do cliente'
            rightComponent={renderTopBarButtons()}
        >
            <>
                <Loading loading={loading} />
                <Loading loading={sendingEmail} text="Enviando e-mail..." />
                <Loading loading={generatingPdf} text='Gerando PDF...' />

                <p>Nome: {client?.name || '-'}</p>
                <p>Endereço: {renderAddress()}</p>
                <p>CPF/CNPJ: {client?.document ? formatDocument(client.document) : '-'}</p>
                <p>Email: {client?.email || '-'}</p>
                <p>Telefone: {client?.phone ? formatPhone(client.phone) : '-'}</p>

                {!!client?.email && !!client?.document && (
                    <p>
                        <Button 
                            text='Enviar e-mail de senha'
                            onClick={sendPasswordEmail}
                        />
                    </p>
                )}

                {isAdmin() && !!client && (
                    <p>
                        <Button
                            text='Gerar relatório de controle'
                            onClick={() => navigate(`/graficos?userId=${client.id}`)}
                        />
                    </p>
                )}

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
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranches.map(ranch => (
                                <tr key={ranch.id}>
                                    <td>{ranch.name}</td>
                                    <td className='address-field'>
                                        <span>{ranch.address}</span>
                                        <IoSearch onClick={() => showAddress(ranch.address)} />
                                    </td>
                                    <td>{ranch.city}</td>
                                    <td>{ranch.state}</td>
                                    <td>{ranch.ie}</td>
                                    <td>{ranch.comments}</td>
                                    <td>
                                        <BiEdit
                                            size={15}
                                            onClick={() => navigate(`/clientes/${userId}/propriedades/${ranch.id}`)}
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
                    <ReportCard key={report.id} report={report} downloadPdf={downloadPdf} />
                ))}
                {!!loadingReports && <p>Carregando relatórios...</p>}
                {!loadingReports && !reports.length && <p>Nenhum relatório cadastrado</p>}
            </>
        </ScreenTemplate>
    )
}

export default ClientDetailsScreen