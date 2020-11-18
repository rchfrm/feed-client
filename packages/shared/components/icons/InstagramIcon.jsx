import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const InstagramIcon = ({
  fill,
  className,
  title,
  style,
  width,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width}
      name={title}
      className={className}
      style={style}
    >
      <title>{title}</title>
      <path
        fill={fill}
        d="M256 50c67 0 75 0 102 2 25 1 38 5 47 9 12 5 20 10 29 19 9 9 14 17 19 29 3 9 8 22 9 47 1 27 2 35 2 102s0 75-1 102c-1 25-5 38-9 47 -5 12-10 20-19 29 -9 9-17 14-29 19 -9 3-22 8-47 9 -27 1-34 2-102 2s-75 0-102-1c-25-1-38-5-47-9 -12-5-20-10-29-19 -9-9-14-17-19-29 -3-9-8-22-9-47 -1-27-1-34-1-102s0-75 2-102c1-25 5-38 9-47 5-12 10-20 19-29 9-9 17-14 29-19 9-3 22-8 47-9C181 50 189 50 256 50M256 4c-68 0-77 0-104 2C125 7 107 11 91 17c-17 6-31 15-45 29 -14 14-23 28-29 45 -6 16-10 34-12 61C4 179 4 188 4 256c0 68 0 77 2 104 1 27 6 45 12 61 6 17 15 31 29 45 14 14 28 23 45 29 16 6 34 11 61 12 27 1 35 2 104 2s77 0 104-1c27-1 45-5 61-12 17-6 31-15 45-29 14-14 23-28 29-45 6-16 11-34 12-61 1-27 2-35 2-104s0-77-1-104c-1-27-5-45-12-61 -6-17-15-31-29-45 -14-14-28-23-45-29 -16-6-34-10-61-12C333 4 324 4 256 4L256 4z"
      />
      <path
        fill={fill}
        d="M256 127c-71 0-129 58-129 129S185 385 256 385 385 327 385 256 327 127 256 127zM256 340c-46 0-84-38-84-84s38-84 84-84c46 0 84 38 84 84S302 340 256 340z"
      />
      <circle
        fill={fill}
        cx="391"
        cy="122"
        r="30"
      />
    </svg>
  )
}

InstagramIcon.propTypes = {
  fill: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number,
}

InstagramIcon.defaultProps = {
  fill: brandColors.instagram.bg,
  title: 'Instagram',
  className: '',
  style: null,
  width: null,
}

export default InstagramIcon
