import pdfMake from 'pdfmake/build/pdfmake'

import vfs from './vfs'
import { formatDate } from '../../utils/formatter'
import { getReportBySlug, Report } from '../report'

import { renderInfo } from './renderInfo'
import { renderFetus } from './renderFetus'
import { renderAwards } from './renderAwards'
import { renderHeader } from './renderHeader'
import { getPhotosProperties, renderPhotos } from './renderPhotos'
import { renderWeight } from './renderWeights'
import { renderComments } from './renderComments'
import { renderPenalties } from './renderPenalties'
import { renderSignature } from './renderSignature'
import { renderEvaluation } from './renderEvaluation'
import { renderCorralEvaluation } from './renderCorralEvaluation'

export const generateReportStructure = async (report: Report): Promise<any> => {
    const sections = [
        renderHeader,
        renderInfo,
        renderCorralEvaluation,
        renderWeight,
        renderEvaluation,
        renderAwards,
        renderPenalties,
        renderFetus,
        renderComments,
        renderSignature,
        renderPhotos
    ]

    async function renderSections() {
        const processedSections: any = []
        for(let i = 0; i < sections.length; i++) {
            processedSections.push(await sections[i](report))
        }
        return processedSections
    }

    return {
        info: {
            title: `${report.ranch.name} ${formatDate(report.date)} ${report.sex}`,
        },
        pageSize: 'A4',
        defaultStyle: {
            fontSize: 9
        },
        content: [
            {
                stack: await renderSections()
            }
        ],
        images: getPhotosProperties(report)
    }
}

export const downloadReportPDFBySlug = async (reportSlug: string): Promise<void> => {
    return getReportBySlug(reportSlug)
        .then(downloadReportPDF)
}

export const downloadReportPDF = async (report: Report): Promise<void> => {
    const docDefinitions = await generateReportStructure(report)

    pdfMake.vfs = vfs
    // pdfMake.createPdf(docDefinitions).download(`${docDefinitions.title}.pdf`)
    pdfMake.createPdf(docDefinitions).open({}, window.open("", "_blank"))
}