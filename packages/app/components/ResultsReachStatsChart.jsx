import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power2 } from 'gsap'

import { convertChartValues } from '@/app/helpers/resultsHelpers'

import brandColors from '@/constants/brandColors'

const ResultsReachStatsChart = ({ adsReachProportion, organicReachProportion }) => {
  const [chartValues, setChartValues] = React.useState(null)
  const {
    adsReachWidth,
    organicReachWidth,
    maxValue,
    highestValue,
  } = chartValues || {}
  const adsReachRef = React.useRef(null)
  const organicReachRef = React.useRef(null)

  const animateChart = React.useCallback((ref, widthInPercentage) => {
    if (ref) {
      const ease = Power2.easeOut
      const duration = 0.5
      const width = `${widthInPercentage}%`

      gsap.to(ref, { width, ease, duration })
    }
  }, [])

  React.useEffect(() => {
    animateChart(adsReachRef.current, adsReachWidth)
  }, [animateChart, adsReachRef, adsReachWidth])

  React.useEffect(() => {
    animateChart(organicReachRef.current, organicReachWidth)
  }, [animateChart, organicReachRef, organicReachWidth])

  React.useEffect(() => {
    const convertedChartValues = convertChartValues(adsReachProportion, organicReachProportion)
    setChartValues(convertedChartValues)
  }, [adsReachProportion, organicReachProportion])

  return (
    chartValues && (
      <div className="relative h-12 w-full">
        <div
          className={[
            'absolute h-full w-full',
            'border-solid border-green border-2 rounded-full',
            highestValue >= 25 ? null : 'rounded-tr-none rounded-br-none',
          ].join(' ')}
          style={{ borderRightColor: highestValue < 25 ? 'white' : null }}
        />
        <div className="relative h-full w-full rounded-full overflow-hidden">
          <div
            ref={adsReachRef}
            className="absolute h-12 left-0 bg-green"
            style={{ top: '-2px' }}
          >
            <div
              className="absolute right-0 z-10 ml-2 text-green text-xs"
              style={{ top: '50%', left: '100%', transform: 'translateY(-50%)' }}
            >
              {adsReachProportion}%
            </div>
          </div>
          <div
            ref={organicReachRef}
            className="absolute h-12 w-1 top-0 bg-grey-3"
          />
        </div>
        <span className="absolute text-grey-3 text-xs" style={{ left: `${organicReachWidth}%`, bottom: '100%' }}>
          {organicReachProportion}%
        </span>
        <span className="absolute text-green text-xs" style={{ bottom: '100%', right: '5px' }}>
          {maxValue}%
        </span>
        {highestValue < 25 && <span className="absolute right-0 bottom-0 h-16" style={{ borderRight: `2px dashed ${brandColors.green}`, width: '2px' }} />}
      </div>
    )
  )
}

ResultsReachStatsChart.propTypes = {
  adsReachProportion: PropTypes.number.isRequired,
  organicReachProportion: PropTypes.number.isRequired,
}

export default ResultsReachStatsChart
