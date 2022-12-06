import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const { black } = brandColors

const getRotation = (direction) => {
  switch (direction) {
    case 'left':
      return 180
    case 'up':
      return -90
    case 'down':
      return 90
    default:
      return 0
  }
}

const ChevronIcon = ({
  fill,
  className,
  style,
  direction,
}) => {
  const rotation = getRotation(direction)

  return (
    <svg
      width="15"
      height="26"
      viewBox="0 0 15 26"
      className={className}
      style={{
        ...style,
        ...(rotation && { transform: `rotate(${rotation}deg)` }),
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.108226 23.4903L1.49104 25.0409C1.68237 25.2555 2.01479 25.2649 2.21795 25.0615L14.0911 13.1753C14.2861 12.9801 14.2861 12.6638 14.0911 12.4686L2.19657 0.561068C2.00157 0.365851 1.68528 0.365505 1.48985 0.560297L0 2.04528L10.412 12.4686C10.607 12.6638 10.607 12.9801 10.412 13.1753L0.108226 23.4903Z"
        fill={fill}
      />
    </svg>
  )
}

ChevronIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  direction: PropTypes.string,
}

ChevronIcon.defaultProps = {
  fill: black,
  className: '',
  style: null,
  direction: '',
}

export default ChevronIcon
