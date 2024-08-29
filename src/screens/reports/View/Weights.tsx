import React from 'react'

import { Report } from '../../../services/report'
import { formatCurrency, formatNumber } from '../../../utils/formatter'

type ReportWeightsProps = {
    report: Report
}

const ReportWeights: React.FC<ReportWeightsProps> = ({ report }) => {
    const ARROBA = 15.0
    const PC = report.pc / 100
    const PV = report.pv / 100
    const RC = (PC/PV)*100

    const totalWeight = PC * report.numberOfAnimals
    const avg = (report.pc / 100) / ARROBA
    const value = report.arroba ? report.arroba / 100 : ''

    return (
        <div className="section">
            <div className="section-title">
                PESOS
            </div>

            <div className='section-content'>
                <div className='column'>
                    <p>VALOR DA @ NEGOCIADA: <b>{value ? formatCurrency(value) : ''}</b></p>
                    <p>PESO TOTAL@: <b>{formatNumber(totalWeight)}</b></p>
                    <p>PESO VIVO: <b>{formatNumber(PV)}KG</b></p>
                    <p>PREMIAÇÕES: <b>{report.awards || 'NENHUMA'}</b></p>
                </div>

                <div className='column'>
                    <p>PESO TOTAL: <b>{formatNumber(totalWeight/ARROBA)}KG</b></p>
                    <p>MÉDIA DO LOTE: <b>{formatNumber(avg)}</b></p>
                    <p>PESO DE CARCAÇA: <b>{formatNumber(PC)}KG</b></p>
                    <p>RENDIMENTO DE CARCAÇA: <b>{RC.toFixed(1)}%</b></p>
                </div>
            </div>
        </div>
    )   
}

export default ReportWeights