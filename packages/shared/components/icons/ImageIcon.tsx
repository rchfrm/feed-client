import React from 'react'
import brandColors from '@/constants/brandColors'

interface ImageIconProps {
  fill?: string,
  className?: string,
  style?: object,
}

const ImageIcon: React.FC<ImageIconProps> = ({ fill = brandColors.black, className, style }) => {
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
        d="M12.9167 8.33333C13.607 8.33333 14.1667 7.77369 14.1667 7.08333C14.1667 6.39298 13.607 5.83333 12.9167 5.83333C12.2263 5.83333 11.6667 6.39298 11.6667 7.08333C11.6667 7.77369 12.2263 8.33333 12.9167 8.33333Z"
        fill={fill}
      />
      <path
        d="M2.5 4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5H15.8333C16.7538 2.5 17.5 3.24619 17.5 4.16667V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V4.16667ZM15.8333 4.16667H4.16667V10.7662L6.97945 8.51594C7.2838 8.27246 7.71626 8.27246 8.02061 8.51594L11.6049 11.3833L12.7441 10.2441C13.0695 9.91864 13.5972 9.91864 13.9226 10.2441L15.8333 12.1548V4.16667ZM4.16667 15.8333H15.8333V14.5118L13.3334 12.0118L12.256 13.0893C11.9557 13.3895 11.4777 13.416 11.1461 13.1507L7.50003 10.2339L4.16667 12.9005V15.8333Z"
        fill={fill}
      />
    </svg>
  )
}

export default ImageIcon
