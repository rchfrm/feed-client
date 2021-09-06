import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power2 } from 'gsap'

import { formatNumber } from '@/helpers/utils'

const ResultsNewAudienceUnawareChart = ({ unawareData }) => {
  const [lowestValueProportion, setLowestValueProportion] = React.useState(0)
  const prevPeriodChartRef = React.useRef(null)
  const currPeriodChartRef = React.useRef(null)

  const chartRefs = React.useMemo(() => {
    return [
      prevPeriodChartRef,
      currPeriodChartRef,
    ]
  }, [])

  React.useEffect(() => {
    if (unawareData.length) {
      setLowestValueProportion((unawareData[0].value / unawareData[1].value) * 100)
    }
  }, [unawareData])

  const animateChart = React.useCallback((ref, index) => {
    if (ref) {
      const ease = Power2.easeOut
      const delay = index === 0 && 0.1
      const duration = 0.5
      const width = index === 0 ? `${lowestValueProportion}%` : '100%'

      gsap.to(ref, { width, ease, duration, delay })
    }
  }, [lowestValueProportion])

  React.useEffect(() => {
    chartRefs.map((ref, index) => animateChart(ref.current, index))
  }, [animateChart, chartRefs])

  return (
    <div className="relative flex w-full h-12 items-center text-white">
      {unawareData.map(({ type, value }, index) => value && (
        <div
          key={type}
          ref={chartRefs[index]}
          className={[
            'absolute flex items-center justify-center',
            'h-full',
            'rounded-full',
            type === 'prev' ? 'bg-blueLight' : 'bg-blue',
            index === 0 ? 'z-10' : null,
          ].join(' ')}
        >
          {formatNumber(value)}
        </div>
      ))}
    </div>
  )
}

ResultsNewAudienceUnawareChart.propTypes = {
  unawareData: PropTypes.array.isRequired,
}

export default ResultsNewAudienceUnawareChart
