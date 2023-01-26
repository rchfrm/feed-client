import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const StarIcon = ({
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
        d="M12 2.5C12.3788 2.5 12.725 2.714 12.8944 3.05279L15.4733 8.2106L21.1439 9.03541C21.5206 9.0902 21.8335 9.35402 21.9511 9.71599C22.0687 10.078 21.9706 10.4753 21.6981 10.741L17.571 14.7649L18.4994 20.4385C18.5607 20.8135 18.4043 21.1908 18.0956 21.4124C17.787 21.6339 17.3794 21.6614 17.0438 21.4834L12 18.8071L6.95621 21.4834C6.62059 21.6614 6.21303 21.6339 5.90437 21.4124C5.5957 21.1908 5.43927 20.8135 5.50062 20.4385L6.42903 14.7649L2.3019 10.741C2.02939 10.4753 1.93133 10.078 2.04894 9.71599C2.16655 9.35402 2.47943 9.0902 2.85606 9.03541L8.52667 8.2106L11.1056 3.05279C11.275 2.714 11.6212 2.5 12 2.5ZM12 5.73607L10.0819 9.57221C9.93558 9.86491 9.65528 10.0675 9.33144 10.1146L5.14839 10.723L8.1981 13.6965C8.43179 13.9243 8.53958 14.2519 8.48687 14.574L7.80001 18.7715L11.5313 16.7917C11.8244 16.6361 12.1756 16.6361 12.4687 16.7917L16.2 18.7715L15.5131 14.574C15.4604 14.2519 15.5682 13.9243 15.8019 13.6965L18.8516 10.723L14.6686 10.1146C14.3447 10.0675 14.0644 9.86491 13.9181 9.57221L12 5.73607Z"
        fill={fill}
      />
    </svg>
  )
}

StarIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

StarIcon.defaultProps = {
  fill: black,
  className: '',
  style: null,
}

export default StarIcon

