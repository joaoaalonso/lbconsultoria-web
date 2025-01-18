import './Chart.css'

import React, { useEffect } from 'react'

import Button from '../../../components/Button'

import { generateChart } from '../../../services/chart'
import { AnalyticsClientResult } from '../../../services/analytics'

interface ChartProps {
    userName?: string
    ranchName?: string
    analytics: AnalyticsClientResult[]
}

const Chart: React.FC<ChartProps> = ({ analytics, userName, ranchName }) => {
    const getChartTitle = () => {
        const parts = ['CONTROLE DE ABATE']
        if (ranchName) {
            parts.push(ranchName.toUpperCase())
        } else if (userName) {
            parts.push(userName.toUpperCase())
        }
        return parts.join(' - ')
    }
    
    const getChartSubtitle = () => {
        return `TOTAL DE ANIMAIS: ${analytics.reduce((acc, cur) => acc + cur.numberOfAnimals, 0)}`
    }

    useEffect(() => {
        const aspectRatio = window.innerWidth < 800 ? 0.5 : 2

        const element: any = document.getElementById('chart')
        if (!element) return

        const chart = generateChart(element, analytics, aspectRatio)

        return () => {
            if (chart) chart.destroy()
        }
    }, [analytics])

    const generatePdf = async (): Promise<void> => {
        const chartEl = document.createElement('canvas')
        chartEl.style.display = 'none'

        const chartContainer = document.createElement('div')
        chartContainer.style.width = '800px'
        chartContainer.style.height = '600px'

        chartContainer.appendChild(chartEl)

        document.body.append(chartContainer)

        const chart = generateChart(chartEl, analytics, 1, true, false)

        const pdfMake = await import('pdfmake/build/pdfmake')
        const { vfs } = await import('../../../services/generateReport/vfs')
        
        const docDefinitions = {
            pageSize: 'A4',
            info: {
                title: getChartTitle()
            },
            content: [
                {
                    stack: [
                        { text: getChartTitle(), alignment: 'center', bold: true, fontSize: 12 },
                        { text: getChartSubtitle(), alignment: 'center', bold: true, fontSize: 8 },
                        { 
                            image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAAAAAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCADIAMgDASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAYHBQgBBAkDAv/EAD8QAAEDBAECBAQCBgkDBQAAAAEAAgMEBQYRBxIhCBMxURQiQWEVcRYXIzJCgTNYYnJzgpGV0lKhsRglKFO0/8QAHAEBAAEFAQEAAAAAAAAAAAAAAAQCAwUGBwEI/8QAOhEAAQQBAwIEBAQCCQUAAAAAAQACAxEEBRIhMUEGEyJRYXGRoQcUMoFCwVJUYpKx0tPw8RUjgqLR/9oADAMBAAIRAxEAPwD1TREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREWEy2636yWh90sFgdepad3XLQxTCOeWLR6vJLvlLx2Ia4gO0RsHSza4Podqpjg1wJFj2/wCFcie2N4c5ocB2N0fhwQfoQVSlV4uOIaehqmVd2r7TdoGPAt9ytVRHM2UDs1zWtPbfY6KxeE+NHivI5YKLIW12OVUnZz6tgkpQ7/Fb6A+7mj76VJeM/khuR58zB7b5PwWPMaKqRrWl0tW4bILtb0xpA6d66i77LXZdO03wjgZuE2eVrmueLHqBodv4R168g/NfR/hz8KdF1nR2ZmSySJ8oDgN4cWg9K9DRRFGiCRwL6r1LouV+MbgxslHyFjkoedN1c4dn+RdtSWmq6WshbUUlRHNE8bbJG8OafyI7FeRxYw+rGn8wpHiXImdYG978Oyu5WkSfvx0837J/5xnbSfvrasZHgAbbx5uf7Q/mP/ihZ/4FARk4GZ6vZ7ePq0mv7pXqnseqq7LvEhxnit4fjkFZX3+7xnpkobHRurZI3ezi35Wn7b2tceOORc+q+M825I5Mz7IK+xMg/BqK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QxSN8mWIt+TuD+13/JfawnkH4/WTNx8UflnXwLpzL19tf0g1r139fRSRFb88mMRkA1045Vj868wCBzQQLAJHIs31+ZRERWFDREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREX//Z',
                            width: 100,
                            alignment: 'center'
                        },
                    ]
                },
                {
                    image: chart.toBase64Image(),
                    fit: [550, 760], 
                    alignment: 'center' 
                }
            ]
        }

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

    return (
        <>
            <div className='chart-header'>
                <span className="chart-title">{getChartTitle()}</span>
                <span className='chart-subtitle'>{getChartSubtitle()}</span>
            </div>
            <canvas id="chart"></canvas>
            <Button
                text='Gerar PDF'
                onClick={generatePdf}
            />
        </>
    )
}

export default Chart