import { Report } from '../report'
import { getFetuWeight } from '../settings'
import { sexIsFemale } from '../reportHelpers'
import { renderSection, renderProperty } from './helpers'
import { formatNumber, formatPercentage } from '../../utils/formatter'

export const renderFetus = async (report: Report) => {
    if (!sexIsFemale(report.sex) || !report.fetus ||  Object.keys(report.fetus).length === 0) return null

    const P = +(report.fetus.find(fetus => fetus.type === 'P')?.value || 0)
    const M = +(report.fetus.find(fetus => fetus.type === 'M')?.value || 0)
    const G = +(report.fetus.find(fetus => fetus.type === 'G')?.value || 0)

    if (!P && !M && !G) {
        return renderSection('Fêmeas prenhas', { text: 'NENHUM FETO' })
    }

    const totalQuantity = P + M + G

    const PV = report.pv / 100
    const PC = report.pc / 100

    const totalWeight = P*getFetuWeight('P') + M*getFetuWeight('M') + G*getFetuWeight('G')
    const newPV = PV - (totalWeight / report.numberOfAnimals)
    const newRC = (PC / newPV) * 100

    return renderSection('Fêmeas prenhas', {
        table: {
            widths: ['*', '*', '*'],
            body: [
                [
                    renderProperty('Terço inicial de gestação', `${P}`),
                    renderProperty('Terço média de gestação', `${M}`),
                    renderProperty('Terço final de gestação', `${G}`)
                ],
                [
                    renderProperty('Quantidade total', `${totalQuantity}`),
                    renderProperty('Peso total', `${formatNumber(totalWeight)}KG`),
                    ''
                ],
                [
                    renderProperty('Peso vivo', `${formatNumber(newPV)} KG`),
                    renderProperty('Peso de carcaça', `${formatNumber(PC)} KG`),
                    renderProperty('Rendimento de carcaça', `${formatPercentage(newRC)}`)
                ]
            ]
        },
        colSpan: 2,
        layout: 'noBorders'
    })
}