import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const ShareIcon = ({ fill, className, style }) => {
  return (
    <svg
      className={className}
      style={style}
      width="383"
      height="383"
      viewBox="0 0 383 383"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M262.945 123.725L213.475 74.239V269.572C213.475 281.78 203.586 291.677 191.378 291.677C179.17 291.677 169.273 281.78 169.273 269.572V74.242L119.806 123.725C111.175 132.342 97.182 132.342 88.5508 123.725C79.9128 115.093 79.9128 101.08 88.5508 92.4417L174.521 6.47874C179.148 1.84769 185.319 -0.300547 191.377 0.03404C197.436 -0.300547 203.611 1.84769 208.238 6.47874L294.201 92.4417C302.839 101.08 302.839 115.087 294.201 123.725C285.583 132.342 271.583 132.342 262.945 123.725Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.3571 253.054C42.4661 253.054 54.7143 265.302 54.7143 280.411V328.286H328.286V280.411C328.286 265.302 340.534 253.054 355.643 253.054C370.752 253.054 383 265.302 383 280.411V355.643C383 370.752 370.752 383 355.643 383H27.3571C12.2482 383 0 370.752 0 355.643V280.411C0 265.302 12.2482 253.054 27.3571 253.054Z"
        fill={fill}
      />
    </svg>
  )
}

ShareIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

ShareIcon.defaultProps = {
  fill: brandColors.black,
  className: null,
  style: null,
}


export default ShareIcon
