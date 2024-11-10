import React, { useCallback, useEffect } from 'react'
import ChartJS from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import { getSexLabel } from '../../services/reportHelpers'
import { AnalyticsResult } from '../../services/analytics'
import { formatCurrency, formatNumber, formatPercentage, formatDate } from '../../utils/formatter'

interface ChartProps {
    userName?: string
    ranchName?: string
    analytics: AnalyticsResult[]
}

const Chart: React.FC<ChartProps> = ({ analytics, userName, ranchName }) => {
    const getChartTitle = useCallback(() => {
        const parts = ['CONTROLE DE ABATE']
        if (ranchName) {
            parts.push(ranchName.toUpperCase())
        } else if (userName) {
            parts.push(userName.toUpperCase())
        }
        return parts.join(' - ')
    }, [userName, ranchName])

    useEffect(() => {
        let chart: any
        
        const element: any = document.getElementById('chart')
        if (!element) return

        const datasets: any = [
            {
                label: 'Peso em arroba',
                type: 'bar',
                borderColor: '#5083b9',
                backgroundColor: '#5083b9',
                data: analytics.map(row => row.pva / 100),
                formatter: (value: number) => `${formatNumber(value)}@`
            },
            {
                label: 'Rendimento de carcaça',
                type: 'bar',
                borderColor: '#be504b',
                backgroundColor: '#be504b',
                data: analytics.map(row => row.rc / 100),
                formatter: formatPercentage
            },
            {
                label: 'Valor da arroba',
                type: 'line',
                borderColor: '#9bbe5a',
                backgroundColor: '#9bbe5a',
                data: analytics.map(row => row.value / 100),
                formatter: formatCurrency
            }
        ]

        chart = new ChartJS(
            element,
            {
                plugins: [ChartDataLabels],
                data: {
                    labels: analytics.map(row => [
                        row.slaughterhouseName,
                        getSexLabel(row.sex),
                        row.breed,
                        formatDate(row.date)
                    ]),
                    datasets
                },
                options: {
                    plugins: {
                        tooltip: {
                            enabled: false
                        },
                        title: {
                            text: getChartTitle(),
                            font: {
                                size: 20
                            },
                            display: true,
                        },
                        subtitle: {
                            text: `TOTAL DE ANIMAIS: ${analytics.reduce((acc, cur) => acc + cur.numberOfAnimals, 0)}`,
                            font: {
                                weight: 'bold'
                            },
                            display: true
                        },
                        datalabels: {
                            align: 'top',
                            anchor: 'end',
                            font: {
                                weight: 'bold'
                            },
                            formatter: function(value, context) {
                                const dataset = datasets[context.datasetIndex]
                                return dataset ? dataset.formatter(value) : value
                            }
                        }
                    }
                }
            }
        )

        return () => {
            if (chart) chart.destroy()
        }
    }, [analytics, getChartTitle])

    return (
        <canvas id="chart"></canvas>
    )
}

export default Chart