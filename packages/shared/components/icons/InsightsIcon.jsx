import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const InsightsIcon = ({ className, fill }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 15C0 14.4477 0.447715 14 1 14H5C5.55228 14 6 14.4477 6 15V24H0V15Z"
        fill={fill}
      />
      <path
        d="M9 8C9 7.44772 9.44772 7 10 7H14C14.5523 7 15 7.44772 15 8V24H9V8Z"
        fill={fill}
      />
      <path
        d="M18 1C18 0.447716 18.4477 0 19 0H23C23.5523 0 24 0.447715 24 1V24H18V1Z"
        fill={fill}
      />
    </svg>
  )
}

InsightsIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

InsightsIcon.defaultProps = {
  className: '',
  fill: black,
}


export default InsightsIcon
