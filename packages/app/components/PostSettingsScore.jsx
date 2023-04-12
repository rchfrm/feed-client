import React from 'react'
import PropTypes from 'prop-types'

const PostSettingsScore = ({
  score,
}) => {
  return (
    <div className="flex flex-column w-1/2 sm:w-1/3 mb-8 sm:mb-10">
      <h3 className="font-bold text-lg">
        Score
      </h3>
      <span className="flex items-baseline mb-0 text-lg">
        <span className="font-bold">{score}</span>
        <span className="ml-1">/ 10</span>
      </span>
    </div>
  )
}

PostSettingsScore.propTypes = {
  score: PropTypes.number.isRequired,
}

export default PostSettingsScore
