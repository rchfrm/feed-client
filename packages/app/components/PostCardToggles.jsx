import React from 'react'
import PropTypes from 'prop-types'

import PostCardToggle from '@/app/PostCardToggle'

const PostCardToggles = ({
  post,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      Toggles
    </div>
  )
}

PostCardToggles.propTypes = {
  post: PropTypes.object.isRequired,
  className: PropTypes.string,
}

PostCardToggles.defaultProps = {
  className: null,
}

export default PostCardToggles
