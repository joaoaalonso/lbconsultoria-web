import React, { useState } from 'react'

import { FaPrint, FaDownload } from 'react-icons/fa6'
import { IoShareSocialOutline } from 'react-icons/io5'

import logo from '../../../images/logo.jpeg'
import Loading from '../../../components/Loading'

import { Report } from '../../../services/report'
import { downloadReportPDF } from '../../../services/generateReport'

type ReportHeaderProps = {
    report: Report
}


const ReportHeader: React.FC<ReportHeaderProps> = ({ report }) => {
    const [generatingPdf, setGeneratingPdf] = useState(false)

    const downloadPDF = () => {
        setGeneratingPdf(true)
        downloadReportPDF(report)
            .finally(() => setGeneratingPdf(false))
    }

    return (
        <div className='report-header'>
            <Loading loading={generatingPdf} text='Gerando PDF...' />
                
            <img src={logo} alt="Relatório de abate" />
            RELATÓRIO DE ABATE

            <div className='buttons'>
                <button onClick={downloadPDF} className='hide-desk'>
                    <IoShareSocialOutline size={24} color='#ff19d5' />
                </button>
                <button onClick={downloadPDF} className='hide-mobile'>
                    <FaDownload size={24} color='#ff19d5' />
                </button>
                <button onClick={window.print} className='hide-mobile'>
                    <FaPrint size={24} color='#ff19d5' />
                </button>
            </div>
        </div>
    )
}

export default ReportHeader