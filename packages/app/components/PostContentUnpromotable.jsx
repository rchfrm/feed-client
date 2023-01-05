import React from 'react'
import PropTypes from 'prop-types'

const PostContentUnpromotable = ({ hasSalesObjective, className }) => {
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

PostContentUnpromotable.propTypes = {
  hasSalesObjective: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostContentUnpromotable.defaultProps = {
  className: null,
}

export default PostContentUnpromotable
