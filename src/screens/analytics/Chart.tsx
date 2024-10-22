import './Chart.css'

import React from 'react'
import html2canvas from 'html2canvas'
import { Chart as ChartComponent, AxisOptions, UserSerie } from 'react-charts'

import Button from '../../components/Button'

import { AnalyticsResult } from '../../services/analytics'
import { getSexLabel } from '../../services/reportHelpers'

interface ChartProps {
    analytics: AnalyticsResult[]
}

type SerieData = {
    date: string
    count: number
}

const Chart: React.FC<ChartProps> = ({ analytics }) => {
    let data: UserSerie<SerieData>[] = []
    const rawData: any = {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, analytic] of Object.entries(analytics)) {
        for (const key in analytic) {
            const label = getSexLabel(key)
            if (!label) continue
            if (!rawData[key]) {
                rawData[key] = {
                    label,
                    data: []
                }
            }
            rawData[key].data.push({ date: analytic.date, count: analytic[key] })
        }
    }
    data = Object.entries(rawData).map<UserSerie<SerieData>>((arr: any) => arr[1])

    const primaryAxis = React.useMemo((): AxisOptions<SerieData> => ({
        getValue: datum => datum.date,
    }), [])
    
    const secondaryAxes = React.useMemo((): AxisOptions<SerieData>[] => [
        {
            getValue: datum => datum.count,
            min: 0,
            stacked: true
        },
    ], [])

    const getSeriesStyle = React.useCallback((series) => {
        const colorPalette = {
          'Novilha': "#ff19d5",
          'Vaca': "#ff2b9f",
          'Macho inteiro': "#ff6a70",
          'Macho castrado': "#ffa151",
          'Macho inteiro/castrado': "#ffd04e",
        };
    
        return {
          fill: colorPalette[series.label],
        };
      }, []);
    

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
                        getSeriesStyle,
                        defaultColors: ["#ff19d5"]
                    }}
                />
            </div>
            <Button
                style={{ marginBottom: 12 }}
                onClick={downloadChart}
                variant='primary'
                text='Download'
            />
        </>
    )
}

export default Chart