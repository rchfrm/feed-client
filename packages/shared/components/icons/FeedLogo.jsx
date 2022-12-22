import React from 'react'
import PropTypes from 'prop-types'

const FeedLogo = ({ style }) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <circle cx="25" cy="25" r="25" fill="url(#paint0_linear_290_2863)" />
      <path d="M35.7909 21.5461C35.7636 18.5524 34.5544 15.6906 32.4262 13.5833C30.2981 11.476 27.4232 10.2937 24.4272 10.2937C21.4311 10.2937 18.5563 11.476 16.4282 13.5833C14.3 15.6906 13.0908 18.5524 13.0635 21.5461V37.1424H35.7909V21.5461Z" fill="#F4F4F4" />
      <path d="M24.9553 36.0158C26.2783 34.5205 26.9567 32.5637 26.8431 30.571C26.7295 28.5783 25.833 26.7111 24.3487 25.3756C22.8643 24.0401 20.9123 23.3444 18.9172 23.4398C16.9221 23.5351 15.0454 24.4139 13.6955 25.8849L6.73303 33.6118L17.9929 43.7427L24.9553 36.0158Z" fill="#0D1311" />
      <defs>
        <linearGradient id="paint0_linear_290_2863" x1="1.14451e-06" y1="-0.0243176" x2="50" y2="49.9757" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4F4F4" />
          <stop offset="0.322917" stopColor="#19C89C" />
          <stop offset="0.869792" stopColor="#26547C" />
        </linearGradient>
      </defs>
    </svg>
  )
}

FeedLogo.propTypes = {
  style: PropTypes.object,
}

FeedLogo.defaultProps = {
  style: {},
}

export default FeedLogo
