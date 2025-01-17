import 'react-loading-skeleton/dist/skeleton.css'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import Loading from '../../components/Loading'
import TextField from '../../components/TextField'
import ReportCard from '../../components/ReportCard'
import SkeletonReportCard from '../../components/ReportCard/skeleton'
import ScreenTemplate from '../../components/ScreenTemplate'

import { isEmployee } from '../../services/auth'
import { getReports, SimpleReport } from '../../services/report'
import { downloadReportPDFById } from '../../services/generateReport'

const ReportListScreen = () => {
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [reports, setReports] = useState<SimpleReport[]>([])
    const [generatingPdf, setGeneratingPdf] = useState(false)

    const [hasNextPage, setHasNextPage] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (!hasNextPage) return

        getReports(page)
            .then(newReports => {
                if (newReports.length === 0) setHasNextPage(false)
                if (page > 1) {
                    setReports(current => { return [...current, ...newReports] })
                } else {
                    setReports(newReports)
                }
            })
            .finally(() => setLoading(false))
    }, [hasNextPage, page])


    const getFilteredReports = () => {
        if (!searchTerm) return reports
        const term = searchTerm.toLowerCase()

        return reports.filter(report => {
            return report.user.name.toLowerCase().includes(term) ||
                report.slaughterhouse.name.toLowerCase().includes(term) ||
                report.ranch.name.toLowerCase().includes(term)
        })
    }

    const downloadPdf = async (reportId: string) => {
        setGeneratingPdf(true)
        downloadReportPDFById(reportId)
            .finally(() => setGeneratingPdf(false))
    }

    const observer: any = useRef()

    const endPageElementRef = useCallback(
        (node) => {
          if (loading) return;
          if (observer.current) observer.current.disconnect();
    
          observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              setPage(currentPage => currentPage + 1)
            }
          });
    
          if (node) observer.current.observe(node);
        },
        [loading]
      );

    return (
        <ScreenTemplate
            title='Relatórios'
            noBackground
            rightComponent={
                isEmployee() && (
                    <Link to='/relatorios/adicionar'>
                        <BiPlus size={25} className='svg-button' />
                    </Link>
                )
            }
        >
            <>
                <Loading loading={generatingPdf} text='Gerando PDF...' />
                <TextField placeholder='Pesquisar' onChange={setSearchTerm} />
                
                {loading && [...Array(5)].map((item, i) => <SkeletonReportCard />)}
                
                {getFilteredReports().map(report => (
                    <ReportCard report={report} downloadPdf={downloadPdf} />
                ))}
                
                {!reports.length && !loading && <p>Nenhum relatório cadastrado</p>}
                {!!reports.length && !getFilteredReports().length && <p>Nenhum relatório encontrado</p>}
                <div ref={endPageElementRef}>
                    {hasNextPage && [...Array(5)].map((item, i) => <SkeletonReportCard />)}
                </div>
            </>
        </ScreenTemplate>
    )
}

export default ReportListScreen