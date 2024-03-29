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
      <div className="relative h-7 w-full mb-[18px]">
        <div
          className={[
            'absolute h-7 w-full',
            'bg-offwhite rounded-dialogue',
            highestValue >= 25 ? null : 'rounded-tr-none rounded-br-none',
          ].join(' ')}
          style={{ borderRightColor: highestValue < 25 ? 'white' : null }}
        />
        <div className="relative h-full w-full rounded-dialogue overflow-hidden">
          <div
            ref={adsReachRef}
            className="absolute h-12 left-0 bg-gradient-5-dark"
            style={{ top: '-9px' }}
          />
          <div
            ref={organicReachRef}
            className="absolute h-12 w-1 top-0 bg-gradient-5-light"
          />
        </div>
        <div
          className="absolute text-xs text-gradient-5-dark brightness-[50%]"
          style={{
            left: `calc(${adsReachWidth}% - 32px)`,
            top: '30px',
          }}
        >
          {adsReachProportion}%
        </div>
        <span className="absolute left-0 text-xs text-gradient-5-dark brightness-[50%]" style={{ bottom: '100%' }}>
          {organicReachProportion}%
        </span>
        <span className="absolute text-xs text-gradient-5-dark brightness-[50%]" style={{ bottom: '100%', right: '5px' }}>
          {maxValue}%
        </span>
        {highestValue < 25 && <span className="absolute right-0 bottom-0 h-16 bg-offwhite" style={{ borderRight: `2px dashed ${brandColors.greyLight}`, width: '2px' }} />}
      </div>
    )
  )
}

ResultsExistingAudienceChart.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ResultsExistingAudienceChart
