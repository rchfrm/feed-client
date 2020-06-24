import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const PostsIcon = ({ className, fill }) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M99.8737 16.1052C94.618 16.1052 90.7474 20.1898 90.7474 24.7543V34.2183H229.252V24.7543C229.252 20.1898 225.381 16.1052 220.126 16.1052H99.8737ZM245.357 34.9821V24.7543C245.357 10.8705 233.845 0 220.126 0H99.8737C86.1541 0 74.6422 10.8705 74.6422 24.7543V34.5583C58.8776 36.7906 46.0713 49.7735 46.0713 66.4286V78.8882C28.1991 82.4205 11.832 95.6806 11.832 115.76V282.777C11.832 306.408 34.5014 320.594 55.6143 320.594H264.385C285.498 320.594 308.167 306.408 308.167 282.777V115.76C308.167 94.7905 290.317 81.2583 271.544 78.476V66.4286C271.544 50.6217 260.009 38.1225 245.357 34.9821ZM67.5448 66.4286C67.5448 61.0384 72.3316 55.6918 79.4746 55.6918H238.14C245.283 55.6918 250.07 61.0384 250.07 66.4286V77.9429H67.5448V66.4286ZM55.6143 105.859C43.7839 105.859 39.7477 113.037 39.7477 115.76V282.777C39.7477 285.5 43.784 292.679 55.6143 292.679H264.385C276.215 292.679 280.252 285.5 280.252 282.777V115.76C280.252 113.037 276.215 105.859 264.385 105.859H55.6143Z"
        fill={fill}
      />
    </svg>
  )
}

PostsIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
}

PostsIcon.defaultProps = {
  className: '',
  fill: black,
}


export default PostsIcon
