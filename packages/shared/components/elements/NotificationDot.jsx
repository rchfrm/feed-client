import React from 'react'
import PropTypes from 'prop-types'

const getSizeClass = (size) => {
  if (size === 'small') return 'w-2 h-2'
  if (size === 'medium') return 'w-3 h-3'
  if (size === 'large') return 'w-4 h-4'
}

const NotificationDot = ({
  size,
  className,
  style,
}) => {
  return (
    <div
      className={[
        'absolute',
        getSizeClass(size),
        'bg-red rounded-full',
        className,
      ].join(' ')}
      style={{
        zIndex: 2,
        ...style,
      }}
    />
  )
}

NotificationDot.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

NotificationDot.defaultProps = {
  size: 'small',
  className: null,
  style: {},
}


export default React.memo(NotificationDot)
