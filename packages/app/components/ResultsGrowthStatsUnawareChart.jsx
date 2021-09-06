import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power2 } from 'gsap'

import { getChartValues } from '@/app/helpers/resultsHelpers'

const ResultsGrowthStatsUnawareChart = ({ unawareData }) => {
  const [chartValues, setChartValues] = React.useState([])
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
    setChartValues(getChartValues(unawareData))
  }, [unawareData])

  React.useEffect(() => {
    if (chartValues.length) {
      setLowestValueProportion(+((chartValues[0].value / chartValues[1].value) * 100).toFixed(2))
    }
  }, [chartValues])

  const animateChart = React.useCallback((ref, chartValue, index) => {
    if (ref) {
      const ease = Power2.easeOut
      const delay = index === 0 && 0.1
      const duration = 0.5
      const width = index === 0 ? `${lowestValueProportion}%` : '100%'

      gsap.to(ref, { width, ease, duration, delay })
    }
  }, [lowestValueProportion])

  React.useEffect(() => {
    chartValues.map((chartValue, index) => animateChart(chartRefs[index].current, chartValue, index))
  }, [animateChart, chartValues, chartRefs])

  return (
    <div className="relative flex w-full h-12 items-center text-white">
      {chartValues.map(({ type, value }, index) => (
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
          {value}
        </div>
      ))}
    </div>
  )
}

ResultsGrowthStatsUnawareChart.propTypes = {
  unawareData: PropTypes.object.isRequired,
}

export default ResultsGrowthStatsUnawareChart
