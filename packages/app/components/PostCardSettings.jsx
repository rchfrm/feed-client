import React from 'react'
import PropTypes from 'prop-types'

const PostCardSettings = ({
  post,
  postIndex,
  linkId,
  linkHref,
  linkType,
  updateLink,
  setError,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      Post Settings
    </div>
  )
}

PostCardSettings.propTypes = {
  className: PropTypes.string,
}

PostCardSettings.defaultProps = {
  className: null,
}

export default PostCardSettings
