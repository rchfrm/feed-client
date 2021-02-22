import React from 'react'
import PropTypes from 'prop-types'

const PostCardUnpromotable = ({ className, conversionVisible }) => {
  return (
    <div
      className={[
        'rounded-dialogue',
        conversionVisible ? 'h-30' : 'h-12',
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
  conversionVisible: PropTypes.bool,
}

PostCardUnpromotable.defaultProps = {
  className: null,
  conversionVisible: false,
}

export default PostCardUnpromotable
