import { Report } from '../report'
import { getArroba } from '../settings'
import { renderProperty, renderSection } from './helpers'
import { formatNumber, formatPercentage } from '../../utils/formatter'

export const renderWeight = (report: Report) => {
    const ARROBA = getArroba()
    const totalWeight = report.totalWeight / 1000
    const PC = totalWeight / report.numberOfAnimals
    const PV = report.pv / 100
    const RC = (PC/PV)*100

    const avg = formatNumber(PC / ARROBA)
    const value = report.arroba ? formatNumber(report.arroba / 100) : ''

    return renderSection('Pesos', {
        table: {
            widths: ['*', '*'],
            body: [
                [
                    renderProperty('Valor da @ negociada', !!value ? `R$${value}` : '-'),
                    renderProperty('Média do lote@', `${avg}`)
                ],
                [
                    renderProperty('Peso total', `${formatNumber(totalWeight)}KG`),
                    renderProperty('Peso de carcaça', `${formatNumber(PC)}KG`)
                ],
                [
                    renderProperty('Peso total@', `${formatNumber(totalWeight/ARROBA)}`),
                    renderProperty('Rendimento de carcaça', `${Number.isFinite(RC) ? formatPercentage(RC) : "-"}`),
                ],
                [
                    renderProperty('Peso vivo', `${formatNumber(PV)}KG`),
                    ''
                ]
            ]
        },
        colSpan: 2,
        layout: 'noBorders'
    })
}