import React from 'react'

import { Report } from '../../../services/report'

type ReportCommentsProps = {
    report: Report
}

const ReportComments: React.FC<ReportCommentsProps> = ({ report }) => {
    if (!report.comments) return null
    
    return (
        <div className="section">
            <div className="section-title">
                OBSERVAÇÕES ADICIONAIS
            </div>

            <div className='section-content'>
                <p>{report.comments.toUpperCase()}</p>
            </div>
        </div>
    )   
}

export default ReportComments