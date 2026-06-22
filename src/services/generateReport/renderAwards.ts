import { Report } from '../report'
import { renderSection, rowDividerLayout } from './helpers'

export const renderAwards = (report: Report) => {
  const awardItems = report.awardItems?.filter(
    (item) => item.program || item.percentage || item.disqualification,
  )

  if (awardItems?.length) {
    return renderSection('Bonificações', {
      table: {
        widths: ['*', '*', '*'],
        body: [
          [
            { text: 'PROGRAMA', bold: true },
            { text: 'PORCENTAGEM', bold: true },
            { text: 'DESCLASSIFICAÇÃO', bold: true },
          ],
          ...awardItems.map((item) => [
            item.program.toUpperCase(),
            item.percentage.toUpperCase(),
            item.disqualification.toUpperCase(),
          ]),
        ],
      },
      layout: rowDividerLayout,
    })
  }

  const text = report.awards || 'Nenhuma'
  return renderSection('Bonificações', { text: text.toUpperCase() })
}
