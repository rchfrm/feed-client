import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const getRotation = (direction) => {
  switch (direction) {
    case 'left':
      return 90
    case 'right':
      return -90
    case 'up':
      return 180
    default:
      return 0
  }
}

const ArrowIcon = ({
  className,
  fill,
  style,
  direction,
}) => {
  const rotation = getRotation(direction)
  return (
    <svg
      className={className}
      width="500"
      height="388"
      viewBox="0 0 500 388"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...style,
        ...(rotation && { transform: `rotate(${rotation}deg)` }),
      }}
    >
      <path d="M250.251 0H500L250.251 388L0 0H250.251Z" fill={fill} />
    </svg>
  )
}

ArrowIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  style: PropTypes.object,
  direction: PropTypes.string,
}

ArrowIcon.defaultProps = {
  className: '',
  fill: brandColors.textColor,
  style: {},
  direction: '',
}


export default React.memo(ArrowIcon)
