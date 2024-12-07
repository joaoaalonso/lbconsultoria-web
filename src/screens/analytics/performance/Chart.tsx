import './Chart.css'

import React from 'react'
import { Chart as ChartComponent, AxisOptions, UserSerie } from 'react-charts'

import { getSexLabel } from '../../../services/reportHelpers'
import { AnalyticsPerformanceResult } from '../../../services/analytics'

interface ChartProps {
    analytics: AnalyticsPerformanceResult[]
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

    return (
        <>
            <div id='chart-wrapper' className='chart-wrapper'>
                <ChartComponent
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,
                        getSeriesStyle,
                        defaultColors: ["#ff19d5"],
                    }}
                />
            </div>
        </>
    )
}

export default Chart