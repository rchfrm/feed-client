import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const CollapseIcon = ({ fill, className, style }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <rect x="0.5" y="0.5" width="29" height="29" rx="3.5" fill="#F4F4F4" />
      <path d="M9.66671 9.0375L10.7816 8L15 11.9264L19.2185 8L20.3334 9.0375L15 14L9.66671 9.0375Z" fill={fill} />
      <path d="M9.66671 20.9625L10.7816 22L15 18.0736L19.2185 22L20.3334 20.9625L15 16L9.66671 20.9625Z" fill={fill} />
      <rect x="0.5" y="0.5" width="29" height="29" rx="3.5" stroke={fill} />
    </svg>
  )
}

CollapseIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

CollapseIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
  style: null,
}

export default CollapseIcon
