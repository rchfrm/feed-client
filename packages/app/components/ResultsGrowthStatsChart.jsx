import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power2 } from 'gsap'

import { formatNumber } from '@/helpers/utils'

import brandColors from '@/constants/brandColors'

const ResultsGrowthStatsChart = ({ audienceSize }) => {
  const prevPeriodProportion = (audienceSize.prev_period / audienceSize.curr_period) * 100
  const currentPeriodProportion = (audienceSize.growth.absolute / audienceSize.curr_period) * 100

  const lolRef = React.useRef(null)

  const animateChart = React.useCallback(() => {
    if (lolRef) {
      const ease = Power2.easeOut
      const duration = 2.5
      // const width = `${prevPeriodProportion}%`

      gsap.to(lolRef.current, { scaleY: 1, scaleX: 1, ease, duration, transformOrigin: 'center' })
    }
  }, [])

  React.useEffect(() => {
    animateChart()
  }, [animateChart, lolRef])

  return (
    <div className="flex w-full h-12 items-center text-white">
      <div
        ref={lolRef}
        className="flex items-center justify-center h-full scale-0 bg-blue opacity-50 rounded-full"
        style={{ width: `${prevPeriodProportion}%` }}
      >
        {formatNumber(audienceSize.prev_period)}
      </div>
      <span className="z-10 -mx-3 text-blue font-light -mt-2" style={{ fontSize: '3rem', color: brandColors.facebook.bg }}>+</span>
      <div
        className="flex items-center justify-center h-full bg-blue rounded-full"
        style={{ width: `${currentPeriodProportion}%` }}
      >
        {formatNumber(audienceSize.growth.absolute)}
      </div>
    </div>
  )
}

ResultsGrowthStatsChart.propTypes = {
  audienceSize: PropTypes.object.isRequired,
}

export default ResultsGrowthStatsChart
