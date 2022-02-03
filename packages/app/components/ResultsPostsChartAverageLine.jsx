import React from 'react'
import PropTypes from 'prop-types'
import { gsap, Power2 } from 'gsap'

import useBreakpointTest from '@/hooks/useBreakpointTest'

const ResultsPostsChartAverageLine = ({ value, maxValue, color }) => {
  const lineRef = React.useRef(null)
  const isDesktopLayout = useBreakpointTest('sm')
  const [linePosition, setLinePosition] = React.useState(0)

  React.useEffect(() => {
    setLinePosition((value / maxValue) * 100)
  }, [value, maxValue])

  const animateLine = React.useCallback(() => {
    if (lineRef.current) {
      const ease = Power2.easeOut
      const duration = 1

      gsap.to(lineRef.current, { bottom: `${linePosition}%`, ease, duration })
    }
  }, [linePosition])

  React.useEffect(() => {
    animateLine()
  }, [animateLine])

  return (
    <span
      className="border-t border-dashed absolute"
      style={{
        height: '2px',
        width: isDesktopLayout ? '100%' : '800px',
        borderColor: color,
      }}
      ref={lineRef}
    />
  )
}

ResultsPostsChartAverageLine.propTypes = {
  value: PropTypes.string.isRequired,
  maxValue: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}

ResultsPostsChartAverageLine.defaultProps = {
}

export default ResultsPostsChartAverageLine
