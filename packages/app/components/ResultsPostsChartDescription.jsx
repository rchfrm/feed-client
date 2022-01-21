import React from 'react'
import PropTypes from 'prop-types'

const ResultsPostsChartDescription = ({ average, globalAverage }) => {
  return (
    <div className="text-xs">
      <p>See the estimated percentage of your audience your posts from the last 30 days have reached. Your audience is not just your followers, it's also people who have engaged with you before but haven't necessarily followed you.</p>
      <p className="flex items-center mb-2">
        <span className="inline-block w-5 mr-3 border-t border-dashed border-black" style={{ height: '2px' }} />
        your average,
        <span className="font-bold">{average}</span>
      </p>
      <p className="flex items-center mb-2">
        <span className="inline-block w-5 mr-3 border-t border-dashed border-grey-2" style={{ height: '2px' }} />
        global average,
        <span className="font-bold">{globalAverage}</span>
      </p>
    </div>
  )
}

ResultsPostsChartDescription.propTypes = {
  average: PropTypes.string.isRequired,
  globalAverage: PropTypes.string.isRequired,
}

ResultsPostsChartDescription.defaultProps = {
}

export default ResultsPostsChartDescription
