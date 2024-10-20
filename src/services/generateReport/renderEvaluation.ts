import { getArroba } from '../settings'
import { renderSection } from './helpers'
import { ObjectTypeValue, Report } from '../report'
import { getFinishingName } from '../reportHelpers'
import { formatNumber, formatPercentage } from '../../utils/formatter'

const formatRow = (data: ObjectTypeValue[], report: Report, sufix: string = '', getTypeName?: (name: string) => string) => {
    return data.map(d => {
        if (d.value === '0') return null
        const percentil = formatPercentage((+d.value / report.numberOfAnimals) * 100)
        const typeName = !!getTypeName ? getTypeName(d.type) : d.type
        return `${typeName}${sufix} - ${percentil} (${d.value})`
    }).filter(Boolean)
}

const renderDif = (report: Report, margin: number[]) => {
    if (!report.dif?.filter(dif => !!dif.seq).length) return null
    return {
        table: {
            widths: ['*', '*', '*'],
            body: [
                [ 
                    { text: 'DIF - SEQUENCIAL', bold: true },
                    { text: 'MOTIVO', bold: true },
                    { text: 'DESTINO', bold: true }
                ],
                ...report.dif.map(d => [ d.seq, d.type, d.value ])
            ]
        },
        layout: 'noBorders',
        margin
    }
}

const renderBruises = (report: Report) => {
    if (!report.bruises?.filter(bruise => !!bruise.seq).length) return null
    return {
        table: {
            widths: ['*', '*', '*'],
            body: [
                [ 
                    { text: 'HEMATOMAS - SEQUENCIAL', bold: true }, 
                    { text: 'LOCAL', bold: true },
                    { text: 'ORIGEM', bold: true }
                ],
                ...report.bruises.map(d => [ d.seq, d.type, d.value ])
            ]
        },
        layout: 'noBorders'
    }
}

const renderVaccinePrice = (report: Report) => {
    if (!report.arroba) return ''
    const vaccineWeight = report.vaccineWeight / 100
    const vaccinePrice = (report.arroba / 100) / getArroba() * vaccineWeight
    return `R$ ${formatNumber(vaccinePrice)}/CBÇ`
}

export const renderEvaluation = (report: Report) => {
    const margin = [0, 0, 0, 4]

    const maturity = formatRow(report.maturity || [], report, ' DENTES')
    const finishing = formatRow(report.finishing || [], report, '', getFinishingName)
    const rumenScore = formatRow(report.rumenScore || [], report)

    const rows = []
    for(let i = 0; i < 5; i++) {
        const row: any = []
        if (!maturity[i] && !finishing[i] && !rumenScore[i]) continue
        row.push(maturity[i] || '')
        row.push(finishing[i] || '')
        row.push(rumenScore[i] || '')
        rows.push(row)
    }

    const vaccineWeight = report.vaccineWeight / 100

    return renderSection('Avaliação de abate', {
        stack: [
            {
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        [ 
                            { text: 'MATURIDADE', bold: true }, 
                            { text: 'ACABAMENTO', bold: true }, 
                            { text: 'ESCORE RUMINAL', bold: true }
                        ],
                        ...rows,
                        [`PESO DE VACINA: ${formatNumber(vaccineWeight)} KG/CBÇ`, renderVaccinePrice(report), '']
                    ]
                },
                layout: 'noBorders',
                margin
            },
            renderDif(report, margin),
            renderBruises(report)
        ]
    })
}