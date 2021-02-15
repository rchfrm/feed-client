import React from 'react'
import PropTypes from 'prop-types'

const PostCardMetrics = ({ metrics, className }) => {
  console.log('metrics', metrics)
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      Metrics
    </div>
  )
}

PostCardMetrics.propTypes = {
  metrics: PropTypes.object.isRequired,
}

PostCardMetrics.defaultProps = {
}

export default PostCardMetrics
