import React from 'react'
import PropTypes from 'prop-types'

const PostCardUnpromotable = ({ hasSalesObjective, className }) => {
  return (
    <div
      className={[
        'rounded-dialogue',
        hasSalesObjective ? 'h-26' : 'h-12',
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
  hasSalesObjective: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostCardUnpromotable.defaultProps = {
  className: null,
}

export default PostCardUnpromotable
