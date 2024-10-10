import React from 'react'

import { FaPrint, FaDownload } from 'react-icons/fa6'

import logo from '../../../images/logo.jpeg'
import { Report } from '../../../services/report'
import { downloadReportPDF } from '../../../services/generateReport'

type ReportHeaderProps = {
    report: Report
}


const ReportHeader: React.FC<ReportHeaderProps> = ({ report }) => {
    const downloadPDF = () => {
        downloadReportPDF(report)
    }

    return (
        <div className='report-header'>
            <img src={logo} alt="Relatório de abate" />
            RELATÓRIO DE ABATE

            <div className='buttons'>
                <button onClick={downloadPDF}>
                    <FaDownload size={24} color='#ff19d5' />
                </button>
                <button onClick={window.print}>
                    <FaPrint size={24} color='#ff19d5' />
                </button>
            </div>
        </div>
    )
}

export default ReportHeader