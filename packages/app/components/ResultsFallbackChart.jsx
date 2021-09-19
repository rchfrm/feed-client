import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power2 } from 'gsap'

import { formatNumber } from '@/helpers/utils'

const ResultsFallbackChart = ({ data }) => {
  const prevPeriod = data.find((o) => o.type === 'prev').value
  const currPeriod = data.find((o) => o.type === 'curr').value
  const total = prevPeriod + currPeriod

  const prevPeriodChartRef = React.useRef(null)
  const currPeriodChartRef = React.useRef(null)

  const chartRefs = React.useMemo(() => {
    return [
      prevPeriodChartRef,
      currPeriodChartRef,
    ]
  }, [])

  const animateChart = React.useCallback((ref, index) => {
    if (ref) {
      const ease = Power2.easeOut
      const delay = index === 0 && 0.1
      const duration = 0.5
      const width = `${(data[index].value / total) * 100}%`

      gsap.to(ref, { width, ease, duration, delay })
    }
  }, [data, total])

  React.useEffect(() => {
    chartRefs.map((ref, index) => animateChart(ref.current, index))
  }, [animateChart, chartRefs])

  return (
    <div className="relative flex w-full h-12 items-center text-white rounded-full overflow-hidden">
      {data.map(({ color, value }, index) => value && (
        <div
          key={value}
          ref={chartRefs[index]}
          className={[
            'flex items-center justify-center',
            'h-full',
            'text-xs',
          ].join(' ')}
          style={{ backgroundColor: color }}
        >
          {formatNumber(value)}
        </div>
      ))}
    </div>
  )
}

ResultsFallbackChart.propTypes = {
  data: PropTypes.array.isRequired,
}

export default ResultsFallbackChart
