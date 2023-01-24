import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const { black } = brandColors

const getRotation = (direction) => {
  switch (direction) {
    case 'up':
      return 90
    case 'down':
      return -90
    case 'right':
      return 180
    default:
      return 0
  }
}

const CaretIcon = ({
  fill,
  className,
  style,
  direction,
}) => {
  const rotation = getRotation(direction)

  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        ...style,
        ...(rotation && { transform: `rotate(${rotation}deg)` }),
      }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M14 17L8 12L14 7L14 17Z"
        fill={fill}
      />
    </svg>
  )
}

CaretIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  direction: PropTypes.string,
}

CaretIcon.defaultProps = {
  fill: black,
  className: '',
  style: null,
  direction: 'left',
}

export default CaretIcon
