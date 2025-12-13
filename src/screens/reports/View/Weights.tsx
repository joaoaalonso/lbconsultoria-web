import React from 'react'

import { Report } from '../../../services/report'
import { formatCurrency, formatNumber, formatPercentage } from '../../../utils/formatter'
import { getArroba } from '../../../services/settings'

type ReportWeightsProps = {
    report: Report
}

const ReportWeights: React.FC<ReportWeightsProps> = ({ report }) => {
    const ARROBA = getArroba()
    const totalWeight = report.totalWeight / 100
    const PC = totalWeight / report.numberOfAnimals
    const PV = report.pv / 100
    const RC = (PC/PV)*100

    const avg = PC / ARROBA
    const value = report.arroba ? report.arroba / 100 : ''

    return (
        <div className="section">
            <div className="section-title">
                PESOS
            </div>

            <div className='section-content'>
                <div className='column'>
                    <p>VALOR DA @ NEGOCIADA: <b>{ !!value ? formatCurrency(value) : '-'}</b></p>
                    <p>PESO TOTAL: <b>{formatNumber(totalWeight/ARROBA)}KG</b></p>
                    <p>PESO TOTAL@: <b>{formatNumber(totalWeight)}</b></p>
                    <p>PESO VIVO: <b>{formatNumber(PV)}KG</b></p>
                </div>

                <div className='column'>
                    <p>MÉDIA DO LOTE: <b>{formatNumber(avg)}</b></p>
                    <p>PESO DE CARCAÇA: <b>{formatNumber(PC)}KG</b></p>
                    <p>RENDIMENTO DE CARCAÇA: <b>{Number.isFinite(RC) ? formatPercentage(RC) : "-"}</b></p>
                </div>
            </div>
        </div>
    )   
}

export default ReportWeights