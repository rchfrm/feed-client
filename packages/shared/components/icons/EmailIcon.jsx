import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const EmailIcon = ({ color, className, style }) => {
  return (
    <svg
      width="25"
      height="17"
      viewBox="0 0 25 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.38095 4.16667C2.38095 4.16667 2.38095 4.44729 2.38095 4.7619C2.38095 6.57409 2.38095 12.0809 2.38095 13.0952C2.38095 14.2857 3.57143 14.2857 3.57143 14.2857C3.57143 14.2857 20.2381 14.2857 21.4286 14.2857C22.619 14.2857 22.619 13.0952 22.619 13.0952V4.16667L13.9703 10.6905C13.1302 11.3755 11.8698 11.3755 11.0297 10.6905C10.3956 10.1734 4.60072 5.82941 2.38095 4.16667ZM21.4286 2.38095L12.8676 8.94163C12.6576 9.11288 12.3424 9.11288 12.1324 8.94163L3.57143 2.38095H21.4286ZM2.38095 0C1.19048 0 0 1.19048 0 2.38095V14.2857C0 15.4762 1.19048 16.6667 2.38095 16.6667H22.619C23.8095 16.6667 25 15.4762 25 14.2857V2.38095C25 1.19048 23.8095 0 22.619 0H2.38095Z"
      />
    </svg>
  )
}

EmailIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

EmailIcon.defaultProps = {
  color: brandColors.black,
  className: null,
  style: null,
}

export default EmailIcon
