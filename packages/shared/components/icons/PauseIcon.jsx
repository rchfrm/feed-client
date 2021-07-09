
import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const PauseIcon = ({ color, className, style }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      style={style}
    >
      <path
        fill={color}
        d="M9.2395 1.7C9.2395 1.03726 9.77676 0.5 10.4395 0.5H14.0395C14.7022 0.5 15.2395 1.03726 15.2395 1.7V14.3C15.2395 14.9627 14.7022 15.5 14.0395 15.5H10.4395C9.77676 15.5 9.2395 14.9627 9.2395 14.3V1.7Z"
      />
      <path
        fill={color}
        d="M0.239502 1.7C0.239502 1.03726 0.77676 0.5 1.4395 0.5H5.0395C5.70224 0.5 6.2395 1.03726 6.2395 1.7V14.3C6.2395 14.9627 5.70224 15.5 5.0395 15.5H1.4395C0.77676 15.5 0.239502 14.9627 0.239502 14.3V1.7Z"
      />
    </svg>
  )
}

PauseIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

PauseIcon.defaultProps = {
  color: brandColors.textColor,
  className: null,
  style: null,
}


export default PauseIcon
