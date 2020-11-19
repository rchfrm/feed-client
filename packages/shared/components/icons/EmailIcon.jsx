import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const EmailIcon = ({ color, className, style }) => {
  return (
    <svg
      width="21"
      height="15"
      viewBox="0 0 21 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.4 2.55957V13.2144H19.6V2.55957L11.735 8.97293C11.0294 9.54833 9.97062 9.54833 9.26497 8.97293L1.4 2.55957ZM18.4331 1.78562L10.8088 8.00277C10.6323 8.14662 10.3677 8.14662 10.1912 8.00277L2.5669 1.78562H18.4331ZM1.16667 0.491802C0.522334 0.491802 0 0.974522 0 1.56999V13.43C0 14.0255 0.522335 14.5082 1.16667 14.5082H19.8333C20.4777 14.5082 21 14.0255 21 13.43V1.56999C21 0.974522 20.4777 0.491802 19.8333 0.491802H1.16667Z"
      />
    </svg>
  )
}

EmailIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

EmailIcon.defaultProps = {
  color: brandColors.textColor,
  className: null,
  style: null,
}

export default EmailIcon
