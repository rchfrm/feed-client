import React from 'react'
import PropTypes from 'prop-types'

const PostCardToggle = ({
  post,
  audienceName,
  disabled,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      Toggle {audienceName}
    </div>
  )
}

PostCardToggle.propTypes = {
  post: PropTypes.object.isRequired,
  audienceName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

PostCardToggle.defaultProps = {
  disabled: false,
  className: null,
}

export default PostCardToggle
