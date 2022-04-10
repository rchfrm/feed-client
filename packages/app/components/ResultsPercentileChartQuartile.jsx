import React from 'react'
import PropTypes from 'prop-types'
import { gsap, Power2 } from 'gsap'

const ResultsPercentileChartQuartile = ({
  isActive,
  isFirstQuartile,
  isLastQuartile,
  color,
}) => {
  const quartileRef = React.useRef(null)

  const animateChart = React.useCallback((ref) => {
    if (ref) {
      const ease = Power2.easeOut
      const duration = 0.5

      gsap.to(ref, { backgroundColor: color, ease, duration, delay: 0.2 })
    }
  }, [color])

  React.useEffect(() => {
    if (isActive) {
      animateChart(quartileRef.current)
    }
  }, [animateChart, quartileRef, isActive])

  return (
    <div
      className="w-1/4 h-full"
      style={{
        marginLeft: '2px',
        marginRight: '2px',
      }}
    >
      <div
        className={[
          'w-full h-full mb-1',
          'border-solid border-t-2 border-b-2',
          isFirstQuartile ? 'border-l-2 rounded-l-full' : null,
          isLastQuartile ? 'border-r-2 rounded-r-full' : null,
        ].join(' ')}
        style={{
          borderColor: color,
        }}
        ref={quartileRef}
      />
    </div>
  )
}

ResultsPercentileChartQuartile.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isFirstQuartile: PropTypes.bool.isRequired,
  isLastQuartile: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
}

ResultsPercentileChartQuartile.defaultProps = {
}

export default ResultsPercentileChartQuartile
