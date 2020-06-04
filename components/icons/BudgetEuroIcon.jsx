import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const BudgetEuroIcon = ({ className, fill }) => {
  return (
    <svg
      className={className}
      width="320"
      height="320"
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M246.212 118.542C247.708 115.233 245.288 111.483 241.656 111.483H148.621C145.31 111.483 142.91 108.315 143.986 105.183C154.97 73.2299 176.874 58.7072 205.905 58.7072C229.465 58.7072 247.433 68.7253 259.707 76.9356C262.289 78.6623 265.818 77.7277 267.134 74.9145L287.29 31.8296C288.264 29.7493 287.7 27.2647 285.873 25.8736C263.908 9.15436 236.987 0 205.905 0C141.431 0 92.3346 39.1028 76.0048 107.536C75.4586 109.825 73.4274 111.483 71.0741 111.483H46.8011C44.7086 111.483 42.8375 112.786 42.1116 114.748L33.4908 138.056C32.2831 141.322 34.6989 144.791 38.1804 144.791H65.2315C68.1119 144.791 70.3923 147.218 70.281 150.096C70.152 153.434 70.0875 156.837 70.0875 160.304C70.0875 163.514 70.1497 166.724 70.2741 169.894C70.3872 172.776 68.1056 175.209 65.2215 175.209H46.8282C44.7224 175.209 42.8423 176.529 42.1262 178.509L33.4229 202.577C32.2442 205.837 34.6589 209.278 38.1249 209.278H71.0759C73.4284 209.278 75.4591 210.935 76.0065 213.223C92.338 281.486 141.433 320 205.905 320C235.816 320 263.371 311.544 284.996 294.897C286.808 293.502 287.349 291.025 286.37 288.958L265.999 245.952C264.65 243.106 261.048 242.206 258.444 243.977C246.873 251.844 229.064 261.293 205.905 261.293C176.885 261.293 154.986 247.318 143.999 215.581C142.914 212.449 145.315 209.278 148.629 209.278H200.648C202.561 209.278 204.307 208.186 205.144 206.465L216.856 182.397C218.472 179.076 216.053 175.209 212.36 175.209H141.391C138.755 175.209 136.566 173.162 136.455 170.528C136.317 167.221 136.247 163.797 136.247 160.304C136.247 156.554 136.318 152.947 136.461 149.482C136.57 146.844 138.76 144.791 141.401 144.791H231.119C233.084 144.791 234.866 143.641 235.675 141.85L246.212 118.542Z"
        fill={fill}
      />
    </svg>
  )
}

BudgetEuroIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

BudgetEuroIcon.defaultProps = {
  className: '',
  fill: black,
}


export default BudgetEuroIcon
