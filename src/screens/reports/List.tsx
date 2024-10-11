import React, { useState, useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import Loading from '../../components/Loading'
import TextField from '../../components/TextField'
import ReportCard from '../../components/ReportCard'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getReports, Report } from '../../services/report'
import { downloadReportPDFBySlug } from '../../services/generateReport'

const ReportListScreen = () => {
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [reports, setReports] = useState<Report[]>([])
    const [generatingPdf, setGeneratingPdf] = useState(false)

    useEffect(() => {
        getReports()
            .then(setReports)
            .finally(() => setLoading(false))
    }, [])


    function getFilteredReports() {
        if (!searchTerm) return reports

        const term = searchTerm.toLowerCase()

        return reports.filter(report => {
            return report.user.name.toLowerCase().includes(term) ||
                report.slaughterhouse.name.toLowerCase().includes(term) ||
                report.ranch.name.toLowerCase().includes(term)
        })
    }

    const downloadPdf = async (reportSlug: string) => {
        setGeneratingPdf(true)
        downloadReportPDFBySlug(reportSlug)
            .finally(() => setGeneratingPdf(false))
    }

    return (
        <ScreenTemplate
            title='Relatórios'
            noBackground
            rightComponent={(
                <Link to='/relatorios/adicionar'>
                    <BiPlus size={25} className='svg-button' />
                </Link>
            )}
        >
            <>
                <Loading loading={generatingPdf} text='Gerando PDF...' />
                {!loading && <TextField placeholder='Pesquisar' onChange={setSearchTerm} />}
                
                {getFilteredReports().map(report => (
                    <ReportCard key={report.id} report={report} downloadPdf={downloadPdf} />
                ))}
                
                {!reports.length && !loading && <p>Nenhum relatório cadastrado</p>}
                {!!loading && <p>Carregando relatórios...</p>}
                {!!reports.length && !getFilteredReports().length && <p>Nenhum relatório encontrado</p>}
            </>
        </ScreenTemplate>
    )
}

export default ReportListScreen