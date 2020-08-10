import React from 'react'
import PropTypes from 'prop-types'

const getBgClass = (status) => {
  if (status === 'inactive') return 'bg-grey-3'
  if (status === 'active') return 'bg-green'
  if (status === 'active') return 'bg-black'
}

const PostItemStatusBadge = ({ status, className }) => {
  const bgClass = getBgClass(status)
  return (
    <div
      className={[className, 'text-xs', 'text-white', bgClass].join(' ')}
      style={{ padding: '0.1em 0.5rem' }}
    >
      <em>{status}</em>
    </div>
  )
}

PostItemStatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostItemStatusBadge.defaultProps = {
  className: '',
}


export default PostItemStatusBadge
