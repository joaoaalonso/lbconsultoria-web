import './Chart.css'

import React, { useEffect, useRef } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'

import { getSexLabel } from '../../../services/reportHelpers'
import { AnalyticsPerformanceResult } from '../../../services/analytics'

interface ChartProps {
  analytics: AnalyticsPerformanceResult[]
}

const COLOR_PALETTE: Record<string, string> = {
  N: '#ff19d5',
  V: '#ff2b9f',
  MI: '#ff6a70',
  MC: '#ffa151',
  'MI/MC': '#ffd04e',
}

const Chart: React.FC<ChartProps> = ({ analytics }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<ChartJS | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const labels = analytics.map((a) => a.date)

    const sexKeys = Object.keys(analytics[0] || {}).filter((k) => k !== 'date')

    const datasets = sexKeys.map((key) => ({
      label: getSexLabel(key) || key,
      data: analytics.map((a) => parseInt(a[key]) || 0),
      backgroundColor: COLOR_PALETTE[key] || '#cccccc',
      stack: 'combined',
    }))

    chartRef.current = new ChartJS(canvasRef.current, {
      type: 'bar',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true },
          y: { stacked: true, min: 0 },
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
