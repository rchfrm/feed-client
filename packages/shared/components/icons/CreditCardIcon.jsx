import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const { black } = brandColors

const CreditCardIcon = ({
  fill,
  className,
  style,
}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M22 6C22 4.89543 21.1046 4 20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6ZM20 8H4L4 6L20 6V8ZM4 11H20V18L4 18L4 11Z"
        fill={fill}
      />
    </svg>
  )
}

CreditCardIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

CreditCardIcon.defaultProps = {
  fill: black,
  className: '',
  style: null,
}

export default CreditCardIcon
