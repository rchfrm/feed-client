import React from 'react'
import PropTypes from 'prop-types'
import ExclamationCircleIcon from '@/icons/ExclamationCircleIcon'

const PostUnpromotable = ({ className }) => {
  return (
    <div
      className={[
        'relative flex items-center justify-center',
        'h-12',
        'bg-grey rounded-dialogue',
        'text-center',
        className,
      ].join(' ')}
    >
      <ExclamationCircleIcon className="mr-2" />
      Post not promotable
    </div>
  )
}

PostUnpromotable.propTypes = {
  className: PropTypes.string,
}

PostUnpromotable.defaultProps = {
  className: null,
}

export default PostUnpromotable
