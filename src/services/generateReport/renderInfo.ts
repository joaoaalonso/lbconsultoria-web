import { Report } from '../report'
import { formatDate } from '../../utils/formatter'
import { renderProperty, renderSection } from './helpers'

export const renderInfo = (report: Report) => {
    return renderSection('Informações', {
        table: {
            widths: ['*', '*'],
            body: [
                [
                    renderProperty('DATA DE ABATE', formatDate(new Date(report.date))),
                    renderProperty('Nº DE ANIMAIS', report.numberOfAnimals.toString()),
                ],
                [
                    renderProperty('UNIDADE ABATEDOURA', report.slaughterhouse.name), 
                    renderProperty('LOTE ', report.batch)
                ],
                [
                    renderProperty('MUNICÍPIO', report.slaughterhouseUnit.city),
                    renderProperty('CURRAL', report.cattleShed)
                ],
                [
                    renderProperty('PROPRIETÁRIO', report.user.name),
                    renderProperty('SEQUENCIAL', report.sequential)
                ],
                [
                    renderProperty('PROPRIEDADE', report.ranch.name),
                    renderProperty('RAÇA', report.breed.toUpperCase())
                ],
                [
                    renderProperty('MUNÍCIPIO', report.ranch.city),
                    renderProperty('SEXO', report.sex.toUpperCase())
                ],
            ]
        },
        colSpan: 2,
        layout: 'noBorders'
    })
}