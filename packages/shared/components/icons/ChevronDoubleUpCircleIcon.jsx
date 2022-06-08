import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const ChevronDoubleUpCircleIcon = ({
  fill,
  stroke,
  className,
  style,
}) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25Z"
        fill={stroke}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 23.25C18.4371 23.25 23.25 18.4371 23.25 12.5C23.25 6.56294 18.4371 1.75 12.5 1.75C6.56294 1.75 1.75 6.56294 1.75 12.5C1.75 18.4371 6.56294 23.25 12.5 23.25Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9917 10.0047C18.1533 10.1228 18.2209 10.3321 18.1592 10.5232L17.4893 12.5975C17.3925 12.8971 17.0333 13.0146 16.7799 12.8294L12.771 9.89908C12.6094 9.78097 12.3906 9.78097 12.229 9.89908L8.2201 12.8294C7.96672 13.0146 7.60745 12.8971 7.51067 12.5975L6.84077 10.5232C6.77905 10.3321 6.84667 10.1228 7.00825 10.0047L12.229 6.18859C12.3906 6.07048 12.6094 6.07048 12.771 6.18859L17.9917 10.0047Z"
        fill={stroke}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9917 15.4592C18.1533 15.5773 18.2209 15.7867 18.1592 15.9778L17.4893 18.052C17.3925 18.3517 17.0333 18.4691 16.7799 18.2839L12.771 15.3536C12.6094 15.2355 12.3906 15.2355 12.229 15.3536L8.2201 18.2839C7.96672 18.4691 7.60745 18.3517 7.51067 18.052L6.84077 15.9778C6.77905 15.7867 6.84667 15.5773 7.00825 15.4592L12.229 11.6431C12.3906 11.525 12.6094 11.525 12.771 11.6431L17.9917 15.4592Z"
        fill={stroke}
      />
    </svg>
  )
}

ChevronDoubleUpCircleIcon.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

ChevronDoubleUpCircleIcon.defaultProps = {
  fill: 'none',
  stroke: black,
  className: '',
  style: null,
}


export default ChevronDoubleUpCircleIcon
