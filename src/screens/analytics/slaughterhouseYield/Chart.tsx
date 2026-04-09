import './Chart.css'

import React, { useEffect, useRef } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'

import { getSexLabel } from '../../../services/reportHelpers'
import { AnalyticsSlaughterhouseYieldResult } from '../../../services/analytics'

interface ChartProps {
  analytics: AnalyticsSlaughterhouseYieldResult[]
}

const Chart: React.FC<ChartProps> = ({ analytics }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<ChartJS | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const rawDates = [...new Set(analytics.map((a) => a.date))]
    const labels = rawDates.map((d) => {
      const date = new Date(d)
      const month = date.toLocaleDateString('pt-BR', { month: 'short' })
      const year = date.getFullYear()
      return `${month}/${year}`
    })

    const groups: Record<string, { data: (number | null)[]; sexCode: string }> = {}

    analytics.forEach((data) => {
      const key = `${data.slaughterhouseName} - ${getSexLabel(data.sex)}`
      if (!(key in groups)) {
        groups[key] = { data: Array(rawDates.length).fill(null), sexCode: data.sex }
      }
      const dateIndex = rawDates.indexOf(data.date)
      groups[key].data[dateIndex] = data.rc / 10000
    })

    const datasets = Object.entries(groups).map(([label, { data, sexCode }]) => ({
      label,
      data,
      spanGaps: true,
      pointRadius: 5,
      pointHoverRadius: 7,
      borderWidth: 2,
      tension: 0.1,
    }))

    chartRef.current = new ChartJS(canvasRef.current, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              callback: (value: any) => `${(value * 100).toFixed(1)}%`,
            },
            title: {
              display: true,
              text: 'Rendimento de carcaça (%)',
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Rendimento de carcaça',
            font: { size: 16 },
          },
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              label: (context: any) => {
                const value = context.parsed.y
                return `${context.dataset.label}: ${(value * 100).toFixed(1)}%`
              },
            },
          },
        },
      },
    })

    return () => {
      chartRef.current?.destroy()
      chartRef.current = null
    }
  }, [analytics])

  return (
    <div id="chart-wrapper" className="chart-wrapper">
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Chart
