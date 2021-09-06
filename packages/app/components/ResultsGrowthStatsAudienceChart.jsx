import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power2 } from 'gsap'

import { formatNumber } from '@/helpers/utils'

import brandColors from '@/constants/brandColors'

const ResultsGrowthStatsAudienceChart = ({ audienceSize }) => {
  const prevPeriodProportion = (audienceSize.prev_period / audienceSize.curr_period) * 100
  const currentPeriodProportion = (audienceSize.growth.absolute / audienceSize.curr_period) * 100

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
        style={{ width: `${prevPeriodProportion}%`, transform: 'scale(0)' }}
      >
        {formatNumber(audienceSize.prev_period)}
      </div>
      <span className="z-10 -mx-3 text-blue font-light -mt-2" style={{ fontSize: '3rem', color: brandColors.facebook.bg }}>+</span>
      <div
        ref={nextPeriodChartRef}
        className="flex items-center justify-center h-full bg-blue rounded-full"
        style={{ width: `${currentPeriodProportion}%`, transform: 'scale(0)' }}
      >
        {formatNumber(audienceSize.growth.absolute)}
      </div>
    </div>
  )
}

ResultsGrowthStatsAudienceChart.propTypes = {
  audienceSize: PropTypes.object.isRequired,
}

export default ResultsGrowthStatsAudienceChart
