import { Report } from '../report'
import { renderSection } from './helpers'

export const renderPenalties = (report: Report) => {
  const penaltyItems = report.penaltyItems?.filter((item) => item.quantity || item.reason)

  if (penaltyItems?.length) {
    return renderSection('Desclassificações', {
      table: {
        widths: ['*', '*'],
        body: [
          [
            { text: 'QUANTIDADE', bold: true },
            { text: 'MOTIVO', bold: true },
          ],
          ...penaltyItems.map((item) => [item.quantity.toUpperCase(), item.reason.toUpperCase()]),
        ],
      },
      layout: 'noBorders',
    })
  }

  const text = report.penalties || 'Nenhuma'
  return renderSection('Desclassificações', { text: text.toUpperCase() })
}
