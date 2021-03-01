import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const CrosshairIcon = ({ fill, className, style }) => {
  return (
    <svg
      width="548"
      height="548"
      viewBox="0 0 548 548"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M275 450C176.693 450 97 370.307 97 272C97 173.693 176.693 94 275 94C373.307 94 453 173.693 453 272C453 370.307 373.307 450 275 450Z"
        strokeWidth="48"
        stroke={fill}
      />
      <line
        x1="532"
        y1="272"
        x2="376"
        y2="272"
        strokeWidth="48"
        strokeLinecap="round"
        stroke={fill}
      />
      <line
        x1="172"
        y1="272"
        x2="16"
        y2="272"
        strokeWidth="48"
        strokeLinecap="round"
        stroke={fill}
      />
      <line
        x1="274"
        y1="16"
        x2="274"
        y2="172"
        strokeWidth="48"
        strokeLinecap="round"
        stroke={fill}
      />
      <line
        x1="274"
        y1="376"
        x2="274"
        y2="532"
        strokeWidth="48"
        strokeLinecap="round"
        stroke={fill}
      />
    </svg>
  )
}

CrosshairIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

CrosshairIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
  style: null,
}


export default CrosshairIcon
