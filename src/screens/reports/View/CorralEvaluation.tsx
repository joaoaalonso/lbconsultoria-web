import React from 'react'

import { Report } from '../../../services/report'

type ReportCorralEvaluationProps = {
    report: Report
}

const ReportCorralEvaluation: React.FC<ReportCorralEvaluationProps> = ({ report }) => {
    return (
        <div className="section">
            <div className="section-title">
                AVALIAÇÃO DO CURRAL
            </div>

            <div className='section-content'>
                <p>{report.corralEvaluation.toUpperCase()}</p>
            </div>
        </div>
    )   
}

export default ReportCorralEvaluation