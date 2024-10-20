import './Chart.css'

import React from 'react'
import { Chart as ChartComponent, AxisOptions } from 'react-charts'

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

    return (
        <div className='chart-wrapper'>
            <ChartComponent
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                    defaultColors: ['#ff19d5']
                }}
            />
        </div>
    )
}

export default Chart