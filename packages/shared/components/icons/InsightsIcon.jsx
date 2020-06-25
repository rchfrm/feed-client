import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const InsightsIcon = ({ className, fill }) => {
  return (
    <svg
      className={className}
      width="320"
      height="320"
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="171.539" width="71.6859" height="148.223" rx="5" fill={fill} />
      <rect x="124.418" y="104.089" width="71.6859" height="215.673" rx="5" fill={fill} />
      <rect x="233.832" width="71.6859" height="319.762" rx="5" fill={fill} />
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
