import React from 'react'
import PropTypes from 'prop-types'

const ResultsPostsChartAverageLine = ({ bottom, color }) => {
  return (
    <span
      className="w-full border-t border-dashed absolute"
      style={{
        bottom: `${bottom}%`,
        height: '2px',
        borderColor: color,
      }}
    />
  )
}

ResultsPostsChartAverageLine.propTypes = {
  bottom: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

ResultsPostsChartAverageLine.defaultProps = {
}

export default ResultsPostsChartAverageLine
