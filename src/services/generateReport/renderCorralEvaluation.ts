import { Report } from '../report'
import { renderSection } from './helpers'

export const renderCorralEvaluation = (report: Report) => {
    if (!report.corralEvaluation) return null

    return renderSection('Avaliação do curral', { text: report.corralEvaluation.toUpperCase() })
}