import ChartJS from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import { AnalyticsResult } from './analytics'
import { getSexLabel } from './reportHelpers'
import { formatCurrency, formatDate, formatNumber, formatPercentage } from '../utils/formatter'

export const generateChart = (element: any, analytics: AnalyticsResult[], aspectRatio?: number, disableAnimation?: boolean, maintainAspectRatio = true) => {
        const datasets: any = [
            {
                label: 'Peso em arroba',
                type: 'bar',
                borderColor: '#5083b9',
                backgroundColor: '#5083b9',
                yAxisID: 'A',
                data: analytics.map(row => row.pva / 100),
                formatter: (value: number) => `${formatNumber(value)}@`
            },
            {
                label: 'Rendimento de carcaça',
                type: 'bar',
                borderColor: '#be504b',
                backgroundColor: '#be504b',
                yAxisID: 'A',
                data: analytics.map(row => row.rc / 100),
                formatter: formatPercentage
            },
            {
                label: 'Valor da arroba',
                type: 'line',
                borderColor: '#9bbe5a',
                backgroundColor: '#9bbe5a',
                yAxisID: 'B',
                data: analytics.map(row => row.value / 100),
                formatter: formatCurrency
            }
        ]
        
        return new ChartJS(
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
                aspectRatio,
                responsive: true,
                maintainAspectRatio,
                animation: disableAnimation ? false : undefined,
                scales: {
                    A: {
                        type: 'linear',
                        ticks: {
                            display: false
                        },
                        min: 0,
                        max: 100
                    },
                    B: {
                        display: false,
                        type: 'linear',
                        min: 100,
                    }
                },
                plugins: {
                    tooltip: {
                        enabled: false
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
}