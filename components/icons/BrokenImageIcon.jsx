import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '../../constants/brandColors'

const BrokenImageIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="384"
      height="384"
      viewBox="0 0 384 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="192" cy="192" r="192" fill={brandColors.green} />
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="384" height="384">
        <circle cx="192" cy="192" r="192" fill={brandColors.green} />
      </mask>
      <g mask="url(#mask0)">
        <path
          d="M0.00149622 327L107.814 213.307C109.001 212.055 110.997 212.061 112.178 213.319L191.318 297.642C192.67 299.082 195.021 298.845 196.059 297.163L290.606 143.881C291.738 142.046 294.379 141.968 295.616 143.735L410.002 307"
          stroke={brandColors.bgColor}
          strokeWidth="30"
        />
        <circle cx="110" cy="108" r="33" fill={brandColors.textColor} />
      </g>
    </svg>

  )
}

BrokenImageIcon.propTypes = {
  className: PropTypes.string,
}

BrokenImageIcon.defaultProps = {
  className: '',
}


export default BrokenImageIcon
