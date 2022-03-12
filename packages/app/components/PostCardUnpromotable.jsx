import React from 'react'
import PropTypes from 'prop-types'

const PostCardUnpromotable = ({ className }) => {
  return (
    <div
      className={[
        'rounded-dialogue',
        'h-12',
        'bg-grey-1 text-grey-3',
        'relative text-center',
        className,
      ].join(' ')}
    >
      <strong className="absolute--center-xy w-full">Post not promotable</strong>
    </div>
  )
}

PostCardUnpromotable.propTypes = {
  className: PropTypes.string,
}

PostCardUnpromotable.defaultProps = {
  className: null,
}

export default PostCardUnpromotable
