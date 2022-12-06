import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const ExpandIcon = ({ fill, className, style }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <rect x="1" y="1" width="30" height="30" rx="3" fill="#F4F4F4" />
      <path d="M24 13.4438L22.3277 15L16 9.11038L9.6723 15L8 13.4438L16 6L24 13.4438Z" fill={fill} />
      <path d="M24 18.5562L22.3277 17L16 22.8896L9.6723 17L8 18.5562L16 26L24 18.5562Z" fill={fill} />
      <rect x="1" y="1" width="30" height="30" rx="3" stroke={fill} strokeWidth="2" />
    </svg>
  )
}

ExpandIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

ExpandIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
  style: null,
}

export default ExpandIcon
