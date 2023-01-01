import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const { black } = brandColors

const getRotation = (direction) => {
  switch (direction) {
    case 'down':
      return 90
    case 'up':
      return -90
    case 'left':
      return 180
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
        d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z"
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
  direction: 'right',
}

export default ChevronIcon
