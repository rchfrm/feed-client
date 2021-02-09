import PropTypes from 'prop-types'
import React from 'react'

const PostCardScore = ({
  score,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <p>Score: {score}</p>
    </div>
  )
}

PostCardScore.propTypes = {
  score: PropTypes.number.isRequired,
  className: PropTypes.string,
}

PostCardScore.defaultProps = {
  className: null,
}

export default PostCardScore
