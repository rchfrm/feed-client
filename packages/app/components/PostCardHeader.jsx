import React from 'react'
import PropTypes from 'prop-types'

const PostCardHeader = ({
  platform,
  date,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <p>Platform: {platform}</p>
      <p>date: {date}</p>
    </div>
  )
}

PostCardHeader.propTypes = {
  platform: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostCardHeader.defaultProps = {
  className: null,
}

export default PostCardHeader
