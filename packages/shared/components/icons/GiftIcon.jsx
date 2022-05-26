import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const GiftIcon = ({ color, secondaryColor, className, style }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path d="M3.5 6C1.84315 6 0.5 7.34315 0.5 9V10C0.5 10.5523 0.947716 11 1.5 11H11.5V6H3.5Z" fill={color} />
      <path d="M13.5 6V11H23.5C24.0523 11 24.5 10.5523 24.5 10V9C24.5 7.34315 23.1569 6 21.5 6H13.5Z" fill={color} />
      <path d="M11.5 13H2.5C1.94772 13 1.5 13.4477 1.5 14V21C1.5 22.6569 2.84315 24 4.5 24H11.5V13Z" fill={color} />
      <path d="M13.5 24H20.5C22.1569 24 23.5 22.6569 23.5 21V14C23.5 13.4477 23.0523 13 22.5 13H13.5V24Z" fill={color} />
      <path d="M6.03513 6C5.69479 5.41165 5.5 4.72858 5.5 4C5.5 1.79085 7.29086 0 9.5 0C10.6947 0 11.7671 0.523754 12.5 1.35418C13.2329 0.523755 14.3053 0 15.5 0C17.7091 0 19.5 1.79086 19.5 4C19.5 4.72857 19.3052 5.41165 18.9649 6H15.5C16.6046 6 17.5 5.10457 17.5 4C17.5 2.89543 16.6046 2 15.5 2C14.3954 2 13.5 2.89543 13.5 4V6L11.5 6V4C11.5 2.89543 10.6046 2 9.5 2C8.39543 2 7.5 2.89543 7.5 4C7.5 5.10457 8.39543 6 9.5 6H6.03513Z" fill={secondaryColor} />
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
