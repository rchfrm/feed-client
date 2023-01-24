import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const RefreshIcon = ({ fill, className, style }) => {
  return (
    <svg
      className={className}
      style={style}
      width="405"
      height="386"
      viewBox="0 0 405 386"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M375.614 45.8668C373.488 37.7481 363.704 35.1842 357.75 40.7392L334.781 63.8135L324.147 53.131C288.843 19.374 242.055 1 192.289 1C140.396 1 92.3316 21.0832 56.1769 56.9767C17.0447 96.2886 -3.37205 150.983 0.456091 206.533C4.28424 262.082 31.9319 313.358 76.1683 347.543C109.771 373.181 150.604 386 191.438 386C242.055 386 292.671 366.344 329.677 328.314C342.862 314.64 353.921 299.257 362.428 283.02C363.279 281.738 363.279 280.029 362.854 278.32C362.428 276.61 360.727 274.901 359.026 274.474L321.595 258.664C318.617 257.382 315.64 258.664 313.939 262.082C305.857 276.61 294.798 289.857 281.612 300.967C235.674 339.851 166.342 344.124 116.576 311.222C80.4218 287.72 57.4529 250.118 53.1994 207.815C48.9459 165.512 63.4078 124.491 93.1823 94.5794C146.351 41.5938 230.995 39.8846 286.291 90.7336L297.35 101.844L270.553 128.764C264.598 134.746 267.576 144.574 275.657 146.71L390.927 174.912C398.583 176.622 405.389 169.785 403.687 162.093L375.614 45.8668Z"
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
  fill: brandColors.black,
  className: null,
  style: null,
}


export default RefreshIcon
