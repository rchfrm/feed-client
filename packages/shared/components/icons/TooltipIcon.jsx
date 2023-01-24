import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const TooltipIcon = ({ fill, className }) => {
  return (
    <svg
      className={className}
      width="384"
      height="384"
      viewBox="0 0 384 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="192"
        cy="192"
        r="178.5"
        strokeWidth="27"
        stroke={fill}
      />
      <path
        d="M172.698 236.765H201.229V234.851C201.628 211.686 208.212 201.313 225.17 190.737C243.027 179.86 254 164.551 254 141.89C254 109.158 229.46 87 192.849 87C159.231 87 132.297 106.841 131 143.099H161.326C162.523 121.747 177.586 112.38 192.849 112.38C209.808 112.38 223.574 123.761 223.574 141.588C223.574 156.595 214.297 167.17 202.426 174.623C183.871 186.105 172.898 197.485 172.698 234.851V236.765ZM187.762 298C198.635 298 207.713 289.036 207.713 277.857C207.713 266.879 198.635 257.814 187.762 257.814C176.788 257.814 167.81 266.879 167.81 277.857C167.81 289.036 176.788 298 187.762 298Z"
        fill={fill}
      />
    </svg>

  )
}

TooltipIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
}

TooltipIcon.defaultProps = {
  fill: brandColors.black,
  className: '',
}


export default TooltipIcon
