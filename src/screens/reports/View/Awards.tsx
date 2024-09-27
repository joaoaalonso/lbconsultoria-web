import React from 'react'

import { Report } from '../../../services/report'

type ReportAwardsProps = {
    report: Report
}

const ReportAwards: React.FC<ReportAwardsProps> = ({ report }) => {
    return (
        <div className="section">
            <div className="section-title">
                BONIFICAÇÕES
            </div>

            <div className='section-content'>
                <p>{report.awards?.toUpperCase() || 'NENHUMA'}</p>
            </div>
        </div>
    )   
}

export default ReportAwards