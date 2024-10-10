import { Report } from '../report'
import { renderSection } from './helpers'

export const renderAwards = (report: Report) => {
    const text = report.awards || 'Nenhuma'

    return renderSection('Bonificações', { text: text.toUpperCase() })
}