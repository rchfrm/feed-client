import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const InformationIcon = ({ fill, className }) => {
  return (
    <svg className={className} width="384" height="384" viewBox="0 0 384 384" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="192" cy="192" r="178.5" stroke={fill} strokeWidth="27" />
      <path d="M174.686 297H209.411V147.478H174.686V297ZM192.144 126.257C203.175 126.257 212.192 117.69 212.192 107.177C212.192 96.5664 203.175 88 192.144 88C181.017 88 172 96.5664 172 107.177C172 117.69 181.017 126.257 192.144 126.257Z" fill={fill} />
    </svg>
  )
}

InformationIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
}

InformationIcon.defaultProps = {
  fill: brandColors.black,
  className: null,
}


export default InformationIcon
