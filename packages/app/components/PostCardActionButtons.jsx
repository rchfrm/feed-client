import React from 'react'
import PropTypes from 'prop-types'

const PostCardActionButtons = ({
  post,
  postEligible,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      Action buttons
    </div>
  )
}

PostCardActionButtons.propTypes = {
  post: PropTypes.object.isRequired,
  postEligible: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostCardActionButtons.defaultProps = {
  className: null,
}

export default PostCardActionButtons
