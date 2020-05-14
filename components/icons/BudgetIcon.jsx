import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '../../constants/brandColors'

const { green, bgColor } = brandColors

const BudgetIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="384"
      height="384"
      viewBox="0 0 384 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="192" cy="192" r="192" fill={green} />
      <path
        d="M273.509 304V265.48H176.214C182.557 258.035 185.137 248.971 184.707 237.318L183.955 216.062H230.936V179.268H182.557L181.267 145.495C181.16 126.505 191.588 117.441 205.134 117.441C219.002 117.441 230.936 124.239 230.398 142.582L273.939 143.769C275.444 106.543 249.212 80 204.381 80C164.281 80 133.856 103.414 135.469 145.495L136.652 179.268H113V216.062H137.834L138.694 239.908C139.017 251.345 136.974 263.43 127.621 265.48H113.538V304H273.509Z"
        fill={bgColor}
      />
    </svg>
  )
}

BudgetIcon.propTypes = {
  className: PropTypes.string,
}

BudgetIcon.defaultProps = {
  className: '',
}


export default BudgetIcon
