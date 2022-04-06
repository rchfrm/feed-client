import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power2 } from 'gsap'

import PlusIcon from '@/icons/PlusIcon'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { formatNumber, formatCurrency } from '@/helpers/utils'

const ResultsAbsoluteChart = ({
  data,
  color,
  isPurchase,
  icon,
  currency,
}) => {
  const icons = {
    plus: PlusIcon,
    arrow: ArrowAltIcon,
  }
  const ChartIcon = icons[icon]
  const prevPeriod = data.find((o) => o.type === 'prev').value
  const currPeriod = data.find((o) => o.type === 'curr').value
  const absoluteGrowth = currPeriod - prevPeriod
  const total = prevPeriod + currPeriod

  const percentage = isPurchase ? currPeriod / total : absoluteGrowth / currPeriod
  const currentPeriodProportion = (percentage * 100) > 25 ? percentage * 100 : 25
  const prevPeriodProportion = (100 - currentPeriodProportion) > 25 ? 100 - currentPeriodProportion : 25

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
    <div className="flex w-full">
      <div style={{ width: `${prevPeriodProportion}%` }}>
        <div
          ref={prevPeriodChartRef}
          className="flex h-7 bg-blue opacity-50 rounded-full mb-1"
          style={{ backgroundColor: color, transform: 'scale(0)' }}
        />
        <p className="text-center text-xs">{isPurchase ? formatCurrency(prevPeriod, currency) : formatNumber(prevPeriod)}</p>
      </div>
      <ChartIcon className="h-6 w-6 -mx-2 z-10" fill={color} direction="right" style={{ filter: 'brightness(75%)' }} />
      <div style={{ width: `${currentPeriodProportion}%` }}>
        <div
          ref={nextPeriodChartRef}
          className="flex h-7 bg-blue rounded-full mb-1"
          style={{ backgroundColor: color, transform: 'scale(0)' }}
        />
        <p className="text-center text-xs font-bold">{isPurchase ? formatCurrency(currPeriod, currency) : formatNumber(absoluteGrowth)}</p>
      </div>
    </div>
  )
}

ResultsAbsoluteChart.propTypes = {
  data: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  isPurchase: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  currency: PropTypes.string,
}

ResultsAbsoluteChart.defaultProps = {
  currency: '',
  isPurchase: false,
}

export default ResultsAbsoluteChart
