import React from 'react'

import { Report } from '../../../services/report'

type ReportAwardsProps = {
  report: Report
}

const ReportAwards: React.FC<ReportAwardsProps> = ({ report }) => {
  const awardItems = report.awardItems?.filter(
    (item) => item.program || item.percentage || item.disqualification,
  )

  return (
    <div className="section">
      <div className="section-title">BONIFICAÇÕES</div>

      <div className="section-content">
        {awardItems?.length ? (
          <table className="section-table">
            <tr>
              <th>PROGRAMA</th>
              <th>PORCENTAGEM</th>
              <th>DESCLASSIFICAÇÃO</th>
            </tr>
            {awardItems.map((item, index) => (
              <tr key={`award-${index}`}>
                <td>{item.program.toUpperCase()}</td>
                <td>{item.percentage.toUpperCase()}</td>
                <td style={{ whiteSpace: 'pre-wrap' }}>{item.disqualification.toUpperCase()}</td>
              </tr>
            ))}
          </table>
        ) : (
          <p>{report.awards?.toUpperCase() || 'NENHUMA'}</p>
        )}
      </div>
    </div>
  )
}

export default ReportAwards
