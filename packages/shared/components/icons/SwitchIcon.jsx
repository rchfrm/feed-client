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
      width="306"
      height="388"
      viewBox="0 0 306 388"
      fill="none"
      className={className}
      style={style}
    >
      <path
        d="M148.33 45.6154L77.4007 45.6041L186.967 155.17C195.717 163.921 195.722 178.103 186.972 186.854C178.221 195.604 164.034 195.604 155.283 186.854L45.7195 77.2897L45.7308 148.215C45.721 160.579 35.6909 170.609 23.3273 170.618C10.9491 170.623 0.904294 160.579 0.904297 148.195L0.909204 24.9569C0.906577 18.3207 3.7897 12.3579 8.3718 8.25545C12.4753 3.67225 18.4409 0.786307 25.0772 0.788939L148.311 0.788933C160.694 0.788937 170.734 10.8288 170.734 23.212C170.734 35.5657 160.699 45.6007 148.33 45.6154Z"
        fill={fill}
      />
      <path
        d="M259.948 241.832L259.959 311.805L148.897 203.717C140.027 195.085 125.651 195.08 116.781 203.713C107.911 212.345 107.911 226.341 116.781 234.973L227.841 343.058L155.948 343.047C143.415 343.057 133.248 352.951 133.238 365.148C133.233 377.359 143.415 387.268 155.968 387.268L280.888 387.264C287.615 387.266 293.66 384.422 297.818 379.902C302.464 375.853 305.389 369.968 305.386 363.422L305.386 241.852C305.386 229.636 295.209 219.731 282.657 219.731C270.135 219.731 259.963 229.631 259.948 241.832Z"
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
