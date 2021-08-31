import React from 'react'
import PropTypes from 'prop-types'

const ResultsReachStatsChart = ({ adsReachProportion, organicReachProportion }) => {
  return (
    <div className="relative h-12 w-full">
      <div className="absolute h-full w-full border-solid border-green border-2 rounded-full" />
      <div className="relative h-full w-full rounded-full overflow-hidden">
        <div
          className="absolute h-12 left-0 bg-green"
          style={{ top: '-2px', width: `${adsReachProportion}%` }}
        >
          <div
            className="absolute right-0 z-10 ml-2 text-green"
            style={{ top: '50%', left: '100%', transform: 'translateY(-50%)' }}
          >
            {adsReachProportion}%
          </div>
        </div>
        <div
          className="absolute h-12 w-1 top-0 bg-grey-3"
          style={{ width: `${organicReachProportion}%` }}
        />
      </div>
      <span className="text-grey-3 text-xs absolute" style={{ left: `${organicReachProportion}%`, bottom: '100%' }}>{organicReachProportion}%</span>
    </div>
  )
}

ResultsReachStatsChart.propTypes = {
  adsReachProportion: PropTypes.number.isRequired,
  organicReachProportion: PropTypes.number.isRequired,
}

export default ResultsReachStatsChart
