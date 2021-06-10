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
      width="17"
      height="22"
      viewBox="0 0 17 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...style,
        ...(rotation && { transform: `rotate(${rotation}deg)` }),
      }}
    >
      <path
        d="M3.09393 12.6175L6.71467 16.2369L6.71467 1.95015C6.71467 1.05725 7.4385 0.333419 8.33202 0.333419C9.22554 0.333419 9.94986 1.05725 9.94986 1.95015L9.94986 16.2367L13.5704 12.6175C14.2021 11.9872 15.2263 11.9872 15.858 12.6175C16.4902 13.2488 16.4902 14.2738 15.858 14.9055L9.5658 21.1929C9.22712 21.5316 8.77549 21.6887 8.3321 21.6643C7.8886 21.6887 7.43669 21.5316 7.09801 21.1929L0.80632 14.9055C0.174098 14.2738 0.174098 13.2493 0.80632 12.6175C1.43704 11.9872 2.46171 11.9872 3.09393 12.6175Z"
        fill={fill}
      />
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
  direction: 'down',
}

export default React.memo(ArrowIcon)
