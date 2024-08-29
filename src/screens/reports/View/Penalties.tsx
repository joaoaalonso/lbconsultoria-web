import React from 'react'

import { Report } from '../../../services/report'

type ReportPenaltiesProps = {
    report: Report
}

const ReportPenalties: React.FC<ReportPenaltiesProps> = ({ report }) => {
    return (
        <div className="section">
            <div className="section-title">
                PENALIZAÇÕES
            </div>

            <div className='section-content'>
                <p>{report.penalties?.toUpperCase() || 'NENHUMA'}</p>
            </div>
        </div>
    )   
}

export default ReportPenalties