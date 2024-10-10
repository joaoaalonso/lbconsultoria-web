import { Report } from '../report'
import { renderSection } from './helpers'

export const renderComments = (report: Report) => {
    if (!report.comments) return null

    return renderSection('Observações adicionais', { text: report.comments.toUpperCase() })
}