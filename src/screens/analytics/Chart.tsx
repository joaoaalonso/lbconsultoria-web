import './Chart.css'

import React from 'react'
import html2canvas from 'html2canvas'
import { Chart as ChartComponent, AxisOptions } from 'react-charts'

import Button from '../../components/Button'

import { AnalyticsResult } from '../../services/analytics'

interface ChartProps {
    analytics: AnalyticsResult[]
}

const Chart: React.FC<ChartProps> = ({ analytics }) => {
    const data = [
        {
            label: 'Abates',
            data: analytics
        }
    ]

    const primaryAxis = React.useMemo((): AxisOptions<AnalyticsResult> => ({
        getValue: datum => datum.date,
    }), [])
    
    const secondaryAxes = React.useMemo((): AxisOptions<AnalyticsResult>[] => [
        {
            getValue: datum => datum.count,
            min: 0,
        },
    ], [])

    const downloadChart = () => {
        const div = document.getElementById('chart-wrapper')
        if (div) {
            html2canvas(div)
                .then(canvas => {
                    const fileName = 'grafico.png'
                    canvas.toBlob((blob => {
                        if (!blob) return

                        const files = [new File([blob], fileName, { type: blob?.type })]
                        if (window.innerWidth < 800 && navigator.canShare && navigator.canShare({ files })) {
                            navigator.share({ files })
                                .catch(console.log)
                        } else {
                            const blobUrl = URL.createObjectURL(blob)
                            const link = document.createElement("a")

                            link.href = blobUrl
                            link.download = fileName

                            document.body.appendChild(link)

                            link.dispatchEvent(
                                new MouseEvent('click', { 
                                bubbles: true, 
                                cancelable: true, 
                                view: window 
                                })
                            )

                            document.body.removeChild(link)
                        }
                    }))

                })
        }
    }

    return (
        <>
            <div id='chart-wrapper' className='chart-wrapper'>
                <ChartComponent
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,
                        defaultColors: ['#ff19d5']
                    }}
                />
            </div>
            <Button onClick={downloadChart} variant='secondary' text='Download' />
        </>
    )
}

export default Chart