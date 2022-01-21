import React from 'react'
import PropTypes from 'prop-types'

const ResultsPostsChartPost = ({ top, left, organicReach }) => {
  return (
    <div
      className="absolute top-0 rounded-dialogue z-10"
      style={{
        paddingTop: '6%',
        width: '6%',
        top,
        left,
        background: 'rgb(63,94,251) linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
      }}
    >
      <div
        className="absolute bg-white text-xs px-1 rounded-dialogue border border-solid border-1"
        style={{ left: '50%', bottom: '-8px', transform: 'translateX(-50%)' }}
      >
        {organicReach}
      </div>
    </div>
  )
}

ResultsPostsChartPost.propTypes = {
  top: PropTypes.node.isRequired,
  left: PropTypes.node.isRequired,
  organicReach: PropTypes.node.isRequired,
}

ResultsPostsChartPost.defaultProps = {
}

export default ResultsPostsChartPost
