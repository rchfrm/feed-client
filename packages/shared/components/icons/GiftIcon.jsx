import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const GiftIcon = ({ color, secondaryColor, className, style }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path d="M3 6C1.34315 6 0 7.34315 0 9V10C0 10.5523 0.447716 11 1 11H11V6H3Z" fill={color} />
      <path d="M13 6V11H23C23.5523 11 24 10.5523 24 10V9C24 7.34315 22.6569 6 21 6H13Z" fill={color} />
      <path d="M11 13H2C1.44772 13 1 13.4477 1 14V21C1 22.6569 2.34315 24 4 24H11V13Z" fill={color} />
      <path d="M13 24H20C21.6569 24 23 22.6569 23 21V14C23 13.4477 22.5523 13 22 13H13V24Z" fill={color} />
      <path d="M5.53513 6C5.19479 5.41165 5 4.72858 5 4C5 1.79085 6.79086 0 9 0C10.1947 0 11.2671 0.523754 12 1.35418C12.7329 0.523755 13.8053 0 15 0C17.2091 0 19 1.79086 19 4C19 4.72857 18.8052 5.41165 18.4649 6H15C16.1046 6 17 5.10457 17 4C17 2.89543 16.1046 2 15 2C13.8954 2 13 2.89543 13 4V6L11 6V4C11 2.89543 10.1046 2 9 2C7.89543 2 7 2.89543 7 4C7 5.10457 7.89543 6 9 6H5.53513Z" fill={secondaryColor} />
    </svg>
  )
}

GiftIcon.propTypes = {
  color: PropTypes.string,
  secondaryColor: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

GiftIcon.defaultProps = {
  color: brandColors.black,
  secondaryColor: brandColors.black,
  className: null,
  style: null,
}

export default GiftIcon
