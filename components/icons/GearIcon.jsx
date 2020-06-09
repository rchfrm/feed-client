import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const GearIcon = ({ fill, className }) => {
  return (
    <svg
      className={className}
      width="384"
      height="385"
      viewBox="0 0 384 385"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill}
        d="M360.5 152.5H345.3C332.9 152.5 322.5 141.8 322.5 129.1C322.5 122.7 325.2 116.9 330 112.6L339.8 103C349.5 93.4 349.5 77.7 339.8 68.1L317.5 46C313.1 41.6 306.6 39 300 39C293.4 39 287 41.6 282.5 46L273.1 55.4C268.6 60.4 262.6 63.1 256.1 63.1C243.3 63.1 232.6 52.7 232.6 40.4V25.1C232.6 11.6 221.7 0 208.1 0H177.7C164.1 0 153.3 11.5 153.3 25.1V40.3C153.3 52.6 142.6 63 129.8 63C123.4 63 117.5 60.3 113.2 55.6L103.5 46C99.1 41.5 92.6 39 86 39C79.4 39 73 41.6 68.5 46L46 68C36.4 77.6 36.4 93.3 46 102.8L55.4 112.2C60.4 116.7 63.2 122.7 63.2 129.1C63.2 141.9 52.8 152.5 40.4 152.5H25.2C11.5 152.5 0 163.2 0 176.8V192V207.2C0 220.7 11.5 231.5 25.2 231.5H40.4C52.8 231.5 63.2 242.2 63.2 254.9C63.2 261.3 60.4 267.3 55.4 271.8L46 281.1C36.4 290.7 36.4 306.4 46 315.9L68.3 338.1C72.7 342.6 79.2 345.1 85.8 345.1C92.4 345.1 98.8 342.5 103.3 338.1L113 328.5C117.2 323.8 123.2 321.1 129.6 321.1C142.4 321.1 153.1 331.5 153.1 343.8V359C153.1 372.5 163.9 384.1 177.6 384.1H208C221.6 384.1 232.4 372.6 232.4 359V343.8C232.4 331.5 243.1 321.1 255.9 321.1C262.3 321.1 268.3 323.9 272.9 328.8L282.3 338.2C286.8 342.6 293.2 345.2 299.8 345.2C306.4 345.2 312.8 342.6 317.3 338.2L339.6 316C349.2 306.4 349.2 290.7 339.6 281.1L329.8 271.5C325 267.2 322.3 261.3 322.3 255C322.3 242.2 332.7 231.6 345.1 231.6H360.3C373.9 231.6 383.6 220.9 383.6 207.3V192V176.8C383.8 163.2 374.1 152.5 360.5 152.5ZM272.8 192C272.8 236.1 237.1 272 192.8 272C148.5 272 112.8 236.1 112.8 192C112.8 147.9 148.5 112 192.8 112C237.1 112 272.8 147.9 272.8 192Z"
      />
    </svg>
  )
}

GearIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
}

GearIcon.defaultProps = {
  fill: brandColors.textColor,
  className: '',
}


export default GearIcon
