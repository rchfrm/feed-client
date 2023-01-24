import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const PlusCircleIcon = ({ fill, className }) => {
  return (
    <svg
      className={className}
      width="384"
      height="384"
      viewBox="0 0 384 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="192" cy="192" r="178.5" stroke={fill} strokeWidth="27" />
      <path
        fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M175 296H209.725V209.725L296 209.725V175H209.725V87H175V175H87V209.725L175 209.725V296Z"
      />
    </svg>
  )
}

PlusCircleIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
}

PlusCircleIcon.defaultProps = {
  fill: brandColors.black,
  className: null,
}


export default PlusCircleIcon
