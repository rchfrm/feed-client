import React from 'react'
import PropTypes from 'prop-types'
import brandColors from '@/constants/brandColors'

const { black } = brandColors

const NotificationIcon = ({
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
        d="M10.1461 3.24812C10.4433 2.51616 11.1614 2 12 2C12.8386 2 13.5567 2.51616 13.8539 3.24812C16.8202 4.06072 19 6.77579 19 10V14.6972L20.8321 17.4453C21.0366 17.7522 21.0557 18.1467 20.8817 18.4719C20.7077 18.797 20.3688 19 20 19H15.4646C15.2219 20.6961 13.7632 22 12 22C10.2368 22 8.77806 20.6961 8.53545 19H4C3.63121 19 3.29235 18.797 3.11833 18.4719C2.94431 18.1467 2.96338 17.7522 3.16795 17.4453L5 14.6972V10C5 6.77579 7.17983 4.06072 10.1461 3.24812ZM10.5854 19C10.7913 19.5826 11.3469 20 12 20C12.6531 20 13.2087 19.5826 13.4146 19H10.5854ZM12 5C9.23858 5 7 7.23858 7 10V15C7 15.1974 6.94156 15.3904 6.83205 15.5547L5.86852 17H18.1315L17.168 15.5547C17.0584 15.3904 17 15.1974 17 15V10C17 7.23858 14.7614 5 12 5Z"
        fill={fill}
      />
    </svg>
  )
}

NotificationIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

NotificationIcon.defaultProps = {
  fill: black,
  className: '',
  style: null,
}

export default NotificationIcon
