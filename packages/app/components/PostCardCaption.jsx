import React from 'react'
import PropTypes from 'prop-types'

const PostCardCaption = ({
  caption,
  className,
  style,
}) => {
  return (
    <div
      className={[
        'absolute top-0 left-0 w-full h-full bg-grey-1',
        'p-4',
        'font-display text-lg',
        'force--text--wrap',
        'overflow-auto',
        className,
      ].join(' ')}
      style={style}
    >
      {caption}
    </div>
  )
}

PostCardCaption.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

PostCardCaption.defaultProps = {
  className: null,
  style: null,
}

export default React.memo(PostCardCaption)
