import { formatDate } from '../../utils/formatter'
import { getReport, Report } from '../report'

import { renderInfo } from './renderInfo'
import { renderFetus } from './renderFetus'
import { renderAwards } from './renderAwards'
import { renderHeader } from './renderHeader'
import { renderWeight } from './renderWeights'
import { renderComments } from './renderComments'
import { renderPenalties } from './renderPenalties'
import { renderSignature } from './renderSignature'
import { renderEvaluation } from './renderEvaluation'
import { renderCorralEvaluation } from './renderCorralEvaluation'
import { getPhotosProperties, renderPhotos } from './renderPhotos'

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
            title: `${report.ranch.name} ${formatDate(report.date).replaceAll('/', '-')} ${report.sex}`,
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

export const downloadReportPDFById = async (reportId: string): Promise<void> => {
    return getReport(reportId)
        .then(downloadReportPDF)
}

export const downloadReportPDF = async (report: Report): Promise<void> => {
    const docDefinitions = await generateReportStructure(report)
    
    const pdfMake = await import('pdfmake/build/pdfmake')
    const { vfs } = await import('./vfs')
    
    const fileName = `${docDefinitions.info.title}.pdf`
    const pdf = pdfMake.createPdf(docDefinitions, null, null, vfs)

    if (window.innerWidth >= 800) {
        return pdf.download(fileName)
    }

    return new Promise((resolve) => {
        pdf.getBlob(blob => {
            const files = [new File([blob], fileName, { type: 'application/pdf' })]
            if (navigator.canShare && navigator.canShare({ files })) {
                navigator.share({ files })
                    .catch(console.log)
            } else {
                pdf.download(fileName)
            }
            return resolve()
        })
    })
}