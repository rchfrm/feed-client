import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const InsightsCircleIcon = ({ className, fill }) => {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="6.66699" cy="6.5" r="6" fill={fill} />
      <path
        d="M4.2666 6.96499C4.2666 6.8595 4.35212 6.77399 4.4576 6.77399H5.2216C5.32709 6.77399 5.4126 6.8595 5.4126 6.96499V8.68399H4.2666V6.96499Z"
        fill="#F4F4F4"
      />
      <path
        d="M5.98535 5.62795C5.98535 5.52246 6.07087 5.43695 6.17635 5.43695H6.94035C7.04584 5.43695 7.13135 5.52246 7.13135 5.62795V8.68395H5.98535V5.62795Z"
        fill="#F4F4F4"
      />
      <path
        d="M7.70508 4.29098C7.70508 4.18549 7.79059 4.09998 7.89608 4.09998H8.66008C8.76556 4.09998 8.85108 4.18549 8.85108 4.29098V8.68398H7.70508V4.29098Z"
        fill="#F4F4F4"
      />
    </svg>
  )
}

InsightsCircleIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

InsightsCircleIcon.defaultProps = {
  className: '',
  fill: black,
}

export default InsightsCircleIcon
