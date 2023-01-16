import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const ProfileIcon = ({ fill, className }) => {
  return (
    <svg
      width="384"
      height="384"
      viewBox="0 0 384 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M192.004 0C86.1297 0 0 86.1314 0 191.992C0 297.861 86.1297 384 192.004 384C297.87 384 384 297.861 384 191.992C384 86.1314 297.87 0 192.004 0ZM192.004 74.1016C226.392 74.1016 254.265 101.983 254.265 136.364C254.265 170.753 226.384 198.643 192.004 198.643C157.608 198.643 129.735 170.753 129.735 136.364C129.735 101.975 157.608 74.1016 192.004 74.1016ZM103.753 343.779C105.652 344.883 107.567 345.956 109.513 346.981C107.567 345.956 105.652 344.883 103.753 343.779ZM192.004 364.43C139.277 364.43 92.0332 340.609 60.3782 303.2C69.2533 261.557 106.184 229.734 150.425 229.734H233.567C278.014 229.734 315.049 261.215 323.717 303.073C292.07 340.561 244.786 364.43 192.004 364.43ZM324.504 307.372C324.496 307.38 324.496 307.388 324.488 307.403C324.496 307.388 324.496 307.38 324.504 307.372Z"
        fill={fill}
      />
    </svg>
  )
}

ProfileIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
}

ProfileIcon.defaultProps = {
  fill: brandColors.black,
  className: '',
}

export default ProfileIcon
