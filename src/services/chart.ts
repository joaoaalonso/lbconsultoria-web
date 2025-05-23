import ChartJS from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import { getSexLabel } from './reportHelpers'
import { AnalyticsClientResult } from './analytics'
import { formatCurrency, formatDate, formatNumber, formatPercentage } from '../utils/formatter'

export const generateChart = (
    element: any, 
    analytics: AnalyticsClientResult[], 
    aspectRatio?: number, 
    showRanchName = false,
    disableAnimation?: boolean,
    maintainAspectRatio = true, 
) => {
        const valueOffset = 25
        let maxValue = 0

        analytics.forEach(analytic => {
            const value = analytic.value / 100
            if (value > maxValue) {
                maxValue = value
            }
        })
        
        const datasets: any = [
            {
                label: 'Peso vivo',
                type: 'bar',
                borderColor: '#ffa556',
                backgroundColor: '#ffa556',
                yAxisID: 'C',
                data: analytics.map(row => row.pv / 100),
                formatter: (value: number) => `${formatNumber(value)}kg`
            },
            {
                label: 'Peso em arroba',
                type: 'bar',
                borderColor: '#5083b9',
                backgroundColor: '#5083b9',
                yAxisID: 'A',
                data: analytics.map(row => row.pca / 100),
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
                data: analytics.map(row => row.value > 0 ? row.value / 100 : null),
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
                    formatDate(row.date),
                    showRanchName ? row.ranchName : null,
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
                        max: maxValue + valueOffset,
                    },
                    C: {
                        display: false,
                        type: 'linear',
                        min: 300,
                        max: 750
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