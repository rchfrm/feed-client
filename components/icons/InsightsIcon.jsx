import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '../../constants/brandColors'

const { green, bgColor } = brandColors

const InsightsIcon = ({ className }) => {
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
      <rect x="97" y="200" width="50" height="104" fill={bgColor} />
      <rect x="165" y="152" width="50" height="152" fill={bgColor} />
      <rect x="233" y="79" width="50" height="225" fill={bgColor} />
    </svg>

  )
}

InsightsIcon.propTypes = {
  className: PropTypes.string,
}

InsightsIcon.defaultProps = {
  className: '',
}


export default InsightsIcon
