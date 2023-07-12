import React from 'react'
import brandColors from '@/constants/brandColors'

interface BackIconProps {
  fill?: string,
  className?: string,
  style?: object,
}

const BackIcon: React.FC<BackIconProps> = ({ fill = brandColors.black, className, style }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 2C7.55229 2 8 2.44771 8 3L8 12C8 13.6569 9.34314 15 11 15L18 15C18.5523 15 19 15.4477 19 16C19 16.5523 18.5523 17 18 17L11 17C8.23858 17 6 14.7614 6 12L6 3C6 2.44771 6.44772 2 7 2Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.29289 2.29289C6.68342 1.90237 7.31658 1.90237 7.70711 2.29289L11.7071 6.29289C12.0976 6.68342 12.0976 7.31658 11.7071 7.70711C11.3166 8.09763 10.6834 8.09763 10.2929 7.70711L7 4.41421L3.70711 7.70711C3.31658 8.09763 2.68342 8.09763 2.29289 7.70711C1.90237 7.31658 1.90237 6.68342 2.29289 6.29289L6.29289 2.29289Z"
        fill={fill}
      />
    </svg>
  )
}

export default BackIcon
