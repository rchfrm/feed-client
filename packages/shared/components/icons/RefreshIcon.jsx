import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const RefreshIcon = ({ fill, className, style }) => {
  return (
    <svg
      className={className}
      style={style}
      width="405"
      height="384"
      viewBox="0 0 405 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M376.59 44.7503C374.458 36.6526 364.649 34.0954 358.679 39.636L335.65 62.6504L324.989 51.9956C289.593 18.3263 242.683 0 192.788 0C140.761 0 92.5714 20.0311 56.3228 55.8313C17.089 95.0411 -3.38081 149.594 0.457276 204.999C4.29536 260.404 32.0149 311.547 76.3661 345.643C110.056 371.214 150.996 384 191.935 384C242.683 384 293.431 364.395 330.533 326.464C343.753 312.826 354.841 297.483 363.37 281.287C364.223 280.009 364.223 278.304 363.796 276.599C363.37 274.895 361.664 273.19 359.958 272.764L322.43 256.994C319.445 255.716 316.46 256.994 314.754 260.404C306.651 274.895 295.564 288.107 282.344 299.188C236.286 337.971 166.774 342.233 116.879 309.416C80.6307 285.976 57.6021 248.471 53.3376 206.277C49.0731 164.084 63.5725 123.17 93.4243 93.3363C146.731 40.4883 231.595 38.7836 287.035 89.5006L298.122 100.582L271.256 127.432C265.285 133.398 268.271 143.201 276.373 145.332L391.942 173.461C399.618 175.165 406.442 168.346 404.736 160.675L376.59 44.7503Z"
        fill={fill}
      />
    </svg>

  )
}

RefreshIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

RefreshIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
  style: null,
}


export default RefreshIcon
