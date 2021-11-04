import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const HamburgerIcon = ({ className, fill }) => {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.666748 1.69561C0.666748 0.959785 1.2637 0.363281 2.00008 0.363281H18.0001C18.7365 0.363281 19.3334 0.959785 19.3334 1.69561C19.3334 2.43143 18.7365 3.02794 18.0001 3.02794H2.00008C1.2637 3.02794 0.666748 2.43143 0.666748 1.69561Z"
        fill={fill}
      />
      <path
        d="M0.666748 12.3542C0.666748 11.6184 1.2637 11.0219 2.00008 11.0219H18.0001C18.7365 11.0219 19.3334 11.6184 19.3334 12.3542C19.3334 13.0901 18.7365 13.6866 18.0001 13.6866H2.00008C1.2637 13.6866 0.666748 13.0901 0.666748 12.3542Z"
        fill={fill}
      />
      <path
        d="M0.666748 7.02492C0.666748 6.2891 1.2637 5.69259 2.00008 5.69259H18.0001C18.7365 5.69259 19.3334 6.2891 19.3334 7.02492C19.3334 7.76074 18.7365 8.35725 18.0001 8.35725H2.00008C1.2637 8.35725 0.666748 7.76074 0.666748 7.02492Z"
        fill={fill}
      />
    </svg>
  )
}

HamburgerIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

HamburgerIcon.defaultProps = {
  className: '',
  fill: black,
}

export default HamburgerIcon
