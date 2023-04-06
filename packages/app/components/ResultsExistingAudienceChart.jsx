import React from 'react'
import PropTypes from 'prop-types'

import { gsap, Power2 } from 'gsap'

import { convertChartValues } from '@/app/helpers/resultsHelpers'

import brandColors from '@/constants/brandColors'

const ResultsExistingAudienceChart = ({ data }) => {
  const { adsReachProportion, organicReachProportion } = data
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
      <div className="relative w-full">
        <div
          className={[
            'absolute h-7 w-full',
            'bg-offwhite rounded-dialogue',
            highestValue >= 25 ? null : 'rounded-tr-none rounded-br-none',
          ].join(' ')}
          style={{ borderRightColor: highestValue < 25 ? 'white' : null }}
        />
        <div className="relative h-7 w-full mb-1 rounded-dialogue overflow-hidden">
          <div
            ref={adsReachRef}
            className="absolute h-12 left-0 bg-gradient-7-dark"
            style={{ top: '-9px' }}
          />
          <div
            ref={organicReachRef}
            className="absolute h-12 w-1 top-0 bg-gradient-7-light"
          />
        </div>
        <div className="text-gradient-7-dark brightness-[50%]">
          <div
            className="absolute inline text-xs"
            style={{
              left: `calc(${adsReachWidth}% - 32px)`,
            }}
          >
            {adsReachProportion}%
          </div>
          <span className="relative text-xs">
            {organicReachProportion}%
          </span>
          <span className="absolute right-1 text-xs">
            {maxValue}%
          </span>
        </div>
        {highestValue < 25 && <span className="absolute right-0 top-0 h-12 bg-offwhite" style={{ borderRight: `2px dashed ${brandColors.greyLight}`, width: '2px' }} />}
      </div>
    )
  )
}

ResultsExistingAudienceChart.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ResultsExistingAudienceChart
