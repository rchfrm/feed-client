import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const { black } = brandColors

const DocumentIcon = ({
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
        d="M4 4C4 2.89543 4.89543 2 6 2H14C14.2652 2 14.5196 2.10536 14.7071 2.29289L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM17.5858 8L14 4.41421V8H17.5858ZM12 4L6 4V20H18V10H13C12.4477 10 12 9.55228 12 9V4ZM8 13C8 12.4477 8.44772 12 9 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H9C8.44772 14 8 13.5523 8 13ZM8 17C8 16.4477 8.44772 16 9 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H9C8.44772 18 8 17.5523 8 17Z"
        fill={fill}
      />
    </svg>
  )
}

DocumentIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

DocumentIcon.defaultProps = {
  fill: black,
  className: '',
  style: null,
}

export default DocumentIcon
