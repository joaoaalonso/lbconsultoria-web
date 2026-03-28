import React from 'react'

import { Report } from '../../../services/report'
import { sortByType } from '../../../utils/sort'
import { formatNumber } from '../../../utils/formatter'
import { getArroba } from '../../../services/settings'
import { getFinishingName } from '../../../services/reportHelpers'

type ReportEvaluationProps = {
  report: Report
}

const ReportEvaluation: React.FC<ReportEvaluationProps> = ({ report }) => {
  const calculatePercentage = (value: string): string => {
    const percentage = (+value / report.numberOfAnimals) * 100
    return percentage.toFixed(0)
  }

  const maturity = report.maturity ? sortByType(report.maturity) : undefined
  const finishing = report.finishing ? sortByType(report.finishing) : undefined
  const rumenScores = report.rumenScore ? sortByType(report.rumenScore) : undefined

  const vaccineWeight = report.vaccineWeight / 100
  const vaccinePrice = ((report.arroba || 0) / (100 * getArroba())) * vaccineWeight

  const filterData = (data: { seq: string; type: string; value: string }) => {
    return data.seq && data.type && data.value
  }

  const dif = report.dif?.filter(filterData)
  const bruises = report.bruises?.filter(filterData)

  return (
    <div className="section">
      <div className="section-title">AVALIAÇÃO DE ABATE</div>

      <div className="section-content">
        <div className="column">
          <p>
            <b>MATURIDADE</b>
          </p>
          {maturity
            ?.filter((m) => m.value !== '0')
            .map((m) => (
              <p key={`m-${m.type}-${m.value}`}>
                {m.type} DENTES - {calculatePercentage(m.value)}% ({m.value})
              </p>
            ))}
        </div>
        <div className="column">
          <p>
            <b>ACABAMENTO</b>
          </p>
          {finishing
            ?.filter((f) => f.value !== '0')
            .map((f) => (
              <p key={`f-${f.type}-${f.value}`}>
                {getFinishingName(f.type)} - {calculatePercentage(f.value)}% ({f.value})
              </p>
            ))}
        </div>
        <div className="column">
          <p>
            <b>ESCORE RUMINAL</b>
          </p>
          {rumenScores
            ?.filter((r) => r.value !== '0')
            .map((r) => (
              <p key={`r-${r.type}-${r.value}`}>
                {r.type} - {calculatePercentage(r.value)}% ({r.value})
              </p>
            ))}
        </div>
      </div>

      {!!report.vaccineWeight && (
        <div className="section-content">
          <div className="column">
            <p>PESO DE VACINA: {formatNumber(vaccineWeight)}KG/CBÇ</p>
          </div>
          <div className="column" style={{ flex: 2 }}>
            <p>R$ {formatNumber(vaccinePrice)}/CBÇ</p>
          </div>
        </div>
      )}

      {!!dif?.length && (
        <div className="section-content">
          <table className="section-table">
            <tr>
              <th colSpan={3}>
                <b>DIF</b>
              </th>
            </tr>
            <tr>
              <th>SEQUENCIAL</th>
              <th>MOTIVO</th>
              <th>DESTINO</th>
            </tr>
            {dif.map((dif) => (
              <tr>
                <td>{dif.seq}</td>
                <td>{dif.type.toLocaleUpperCase()}</td>
                <td>{dif.value.toLocaleUpperCase()}</td>
              </tr>
            ))}
          </table>
        </div>
      )}

      {!!bruises?.length && (
        <div className="section-content">
          <table className="section-table">
            <tr>
              <th colSpan={3}>
                <b>HEMATOMAS</b>
              </th>
            </tr>
            <tr>
              <th>SEQUENCIAL</th>
              <th>LOCAL</th>
              <th>ORIGEM</th>
            </tr>
            {bruises.map((bruise) => (
              <tr>
                <td>{bruise.seq}</td>
                <td>{bruise.type.toLocaleUpperCase()}</td>
                <td>{bruise.value.toLocaleUpperCase()}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  )
}

export default ReportEvaluation
