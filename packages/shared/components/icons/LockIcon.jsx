import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const LockIcon = ({ fill, className, unlocked }) => {
  return (
    <svg
      className={className}
      width="292"
      height="415"
      viewBox="0 0 292 415"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M249 135.182V187H210.868L210.826 135.182C210.826 99.2745 181.504 70.0302 145.457 70.0302C109.411 70.0727 80.1316 99.3169 80.1316 135.267V187H42L42 135.267C41.9575 78.3494 88.3878 32.0425 145.457 32C202.527 31.9576 248.957 78.2645 249 135.182Z"
        fill={fill}
        style={{
          transition: 'transform 300ms ease',
          transformOrigin: 'left center',
          transform: unlocked ? 'rotateZ(-30deg) translate(0%, 10%)' : 'none',
        }}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.3734 187C15.7735 187.042 -0.0424305 203.433 8.55171e-05 223V378.559C8.55171e-05 398.126 15.9436 414 35.5435 414L256.542 413.873C276.141 413.873 292.042 397.998 292 378.432V222.83C292 203.263 276.014 187 256.414 187H245.913H207.818H77.2091H39.1148H35.3734Z"
        fill={fill}
      />
    </svg>
  )
}

LockIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  unlocked: PropTypes.bool,
}

LockIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
  unlocked: false,
}


export default LockIcon
