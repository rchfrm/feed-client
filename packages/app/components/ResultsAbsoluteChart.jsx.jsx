import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power2 } from 'gsap'

import PlusIcon from '@/icons/PlusIcon'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { formatNumber } from '@/helpers/utils'

const ResultsAbsoluteChart = ({ data, color, icon }) => {
  const icons = {
    plus: PlusIcon,
    arrow: ArrowAltIcon,
  }
  const ChartIcon = icons[icon]
  const prevPeriod = data.find((o) => o.type === 'prev').value
  const currPeriod = data.find((o) => o.type === 'curr').value
  const absoluteGrowth = currPeriod - prevPeriod
  const currentPeriodProportion = (absoluteGrowth / currPeriod) * 100 > 25 ? (absoluteGrowth / currPeriod) * 100 : 25
  const prevPeriodProportion = currentPeriodProportion > 25 ? 100 - currentPeriodProportion : 75

  const prevPeriodChartRef = React.useRef(null)
  const nextPeriodChartRef = React.useRef(null)

  const animateChart = React.useCallback((ref, delay) => {
    if (ref) {
      const ease = Power2.easeOut
      const duration = 0.5

      gsap.to(ref, { scale: 1, ease, duration, transformOrigin: 'center', delay })
    }
  }, [])

  React.useEffect(() => {
    animateChart(prevPeriodChartRef.current)
  }, [animateChart, prevPeriodChartRef])

  React.useEffect(() => {
    animateChart(nextPeriodChartRef.current, 0.2)
  }, [animateChart, nextPeriodChartRef])

  return (
    <div className="flex w-full h-12 items-center text-white">
      <div
        ref={prevPeriodChartRef}
        className="flex items-center justify-center h-full bg-blue opacity-50 rounded-full"
        style={{ backgroundColor: color, width: `${prevPeriodProportion}%`, transform: 'scale(0)' }}
      >
        {formatNumber(prevPeriod)}
      </div>
      <ChartIcon className="h-6 w-6 -mx-2 z-10" fill={color} direction="right" style={{ filter: 'brightness(75%)' }} />
      <div
        ref={nextPeriodChartRef}
        className="flex items-center justify-center h-full rounded-full"
        style={{ backgroundColor: color, width: `${currentPeriodProportion}%`, transform: 'scale(0)' }}
      >
        {formatNumber(absoluteGrowth)}
      </div>
    </div>
  )
}

ResultsAbsoluteChart.propTypes = {
  data: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default ResultsAbsoluteChart
