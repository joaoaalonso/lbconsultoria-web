import React from 'react'

import { Report } from '../../../services/report'

type ReportPenaltiesProps = {
  report: Report
}

const ReportPenalties: React.FC<ReportPenaltiesProps> = ({ report }) => {
  const penaltyItems = report.penaltyItems?.filter((item) => item.quantity || item.reason)

  return (
    <div className="section">
      <div className="section-title">DESCLASSIFICAÇÕES</div>

      <div className="section-content">
        {penaltyItems?.length ? (
          <table className="section-table">
            <tr>
              <th>QUANTIDADE</th>
              <th>MOTIVO</th>
            </tr>
            {penaltyItems.map((item, index) => (
              <tr key={`penalty-${index}`}>
                <td>{item.quantity.toUpperCase()}</td>
                <td>{item.reason.toUpperCase()}</td>
              </tr>
            ))}
          </table>
        ) : (
          <p>{report.penalties?.toUpperCase() || 'NENHUMA'}</p>
        )}
      </div>
    </div>
  )
}

export default ReportPenalties
