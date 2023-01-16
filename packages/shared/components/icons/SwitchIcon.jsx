import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const { black } = brandColors

const SwitchIcon = ({
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
        d="M14.2929 2.29289C14.6834 1.90237 15.3166 1.90237 15.7071 2.29289L19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L15.7071 11.7071C15.3166 12.0976 14.6834 12.0976 14.2929 11.7071C13.9024 11.3166 13.9024 10.6834 14.2929 10.2929L16.5858 8L5 8C4.44772 8 4 7.55228 4 7C4 6.44771 4.44772 6 5 6L16.5858 6L14.2929 3.70711C13.9024 3.31658 13.9024 2.68342 14.2929 2.29289ZM9.70711 12.2929C10.0976 12.6834 10.0976 13.3166 9.70711 13.7071L7.41421 16H19C19.5523 16 20 16.4477 20 17C20 17.5523 19.5523 18 19 18H7.41421L9.70711 20.2929C10.0976 20.6834 10.0976 21.3166 9.70711 21.7071C9.31658 22.0976 8.68342 22.0976 8.29289 21.7071L4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17C4 16.7348 4.10536 16.4804 4.29289 16.2929L8.29289 12.2929C8.68342 11.9024 9.31658 11.9024 9.70711 12.2929Z"
        fill={fill}
      />
    </svg>
  )
}

SwitchIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

SwitchIcon.defaultProps = {
  fill: black,
  className: '',
  style: null,
}


export default SwitchIcon
