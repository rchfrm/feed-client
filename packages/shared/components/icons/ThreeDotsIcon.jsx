import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const getRotation = (direction) => {
  switch (direction) {
    case 'vertical':
      return 90
    default:
      return 0
  }
}

const ThreeDotsIcon = ({ className, style, fill, orientation }) => {
  const rotation = getRotation(orientation)

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        ...style,
        ...(rotation && { transform: `rotate(${rotation}deg)` }),
      }}
    >
      <path
        d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
        fill={fill}
      />
      <path
        d="M6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14Z"
        fill={fill}
      />
      <path
        d="M18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z"
        fill={fill}
      />
    </svg>
  )
}

ThreeDotsIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  style: PropTypes.object,
  orientation: PropTypes.string,
}

ThreeDotsIcon.defaultProps = {
  className: '',
  fill: brandColors.black,
  style: null,
  orientation: 'horizontal',
}

export default ThreeDotsIcon
