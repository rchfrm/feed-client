import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const ResultsGrowthStatsChart = ({ audienceSize }) => {
  const prevPeriodProportion = (audienceSize.prev_period / audienceSize.curr_period) * 100
  const currentPeriodProportion = (audienceSize.growth.absolute / audienceSize.curr_period) * 100
  return (
    <div className="flex w-full h-12 items-center text-white">
      <div
        className="flex items-center justify-center h-full bg-blue opacity-50 rounded-full"
        style={{ width: `${prevPeriodProportion}%` }}
      >
        {audienceSize.prev_period}
      </div>
      <span className="z-10 -mx-3 text-blue font-light" style={{ fontSize: '3rem', color: brandColors.facebook.bg }}>+</span>
      <div
        className="flex items-center justify-center h-full bg-blue rounded-full"
        style={{ width: `${currentPeriodProportion}%` }}
      >
        {audienceSize.growth.absolute}
      </div>
    </div>
  )
}

ResultsGrowthStatsChart.propTypes = {
  audienceSize: PropTypes.object.isRequired,
}

export default ResultsGrowthStatsChart
