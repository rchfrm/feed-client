import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const FolderIcon = ({ fill, className }) => {
  return (
    <svg
      className={className}
      width="395"
      height="297"
      viewBox="0 0 395 297"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.998 0C12.9524 0 3.99805 8.95431 3.99805 20V49V64V274C3.99805 285.046 12.9523 294 23.998 294H328.484C339.53 294 348.484 285.046 348.484 274V49C348.484 37.9543 339.53 29 328.484 29H127.569C122.791 12.2574 107.377 0 89.1008 0H23.998Z"
        fill={brandColors.bgColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M119.27 47C116.144 47 113.396 44.9272 112.538 41.9212L110.261 33.9401C107.629 24.7216 99.1268 18 89.1008 18H23.998C22.8935 18 21.998 18.8954 21.998 20V274C21.998 275.105 22.8935 276 23.998 276H328.484C329.589 276 330.484 275.105 330.484 274V49C330.484 47.8954 329.589 47 328.484 47H119.27ZM3.99805 20C3.99805 8.95431 12.9524 0 23.998 0H89.1008C107.377 0 122.791 12.2574 127.569 29H328.484C339.53 29 348.484 37.9543 348.484 49V274C348.484 285.046 339.53 294 328.484 294H23.998C12.9523 294 3.99805 285.046 3.99805 274V20Z"
        fill={fill}
      />
      <path
        d="M40.6006 92.5154C42.2433 81.3361 53.132 72 64.5277 72H364.873C375.572 72 382.785 80.2684 381.243 90.7642L354.066 275.711C352.423 286.891 341.535 296.227 330.139 296.227H29.7939C19.0949 296.227 11.8815 287.958 13.4238 277.462L40.6006 92.5154Z"
        fill={fill}
      />
    </svg>
  )
}

FolderIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
}

FolderIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
}


export default FolderIcon
