import { Report } from '../report'
import { renderSection } from './helpers'

export const renderPenalties = (report: Report) => {
    const text = report.penalties || 'Nenhuma'

    return renderSection('Desclassificações', { text: text.toUpperCase() })
}