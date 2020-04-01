import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '../../constants/brandColors'

function ArrowIcon({ className }) {
  return (
    <svg className={className} width="500" height="388" viewBox="0 0 500 388" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M250.251 0H500L250.251 388L0 0H250.251Z" fill={brandColors.textColor} />
    </svg>
  )
}

ArrowIcon.propTypes = {
  className: PropTypes.string,
}

ArrowIcon.defaultProps = {
  className: '',
}


export default ArrowIcon
