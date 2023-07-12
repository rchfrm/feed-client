import React from 'react'
import brandColors from '@/constants/brandColors'

interface ChartIconProps {
  fill?: string,
  className?: string,
  style?: object,
}

const ChartIcon: React.FC<ChartIconProps> = ({ fill = brandColors.black, className, style }) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M10.5 3.3335C10.9602 3.3335 11.3333 3.70659 11.3333 4.16683V15.8335C11.3333 16.2937 10.9602 16.6668 10.5 16.6668C10.0398 16.6668 9.66667 16.2937 9.66667 15.8335V4.16683C9.66667 3.70659 10.0398 3.3335 10.5 3.3335ZM14.6667 6.66683C15.1269 6.66683 15.5 7.03993 15.5 7.50016V15.8335C15.5 16.2937 15.1269 16.6668 14.6667 16.6668C14.2064 16.6668 13.8333 16.2937 13.8333 15.8335V7.50016C13.8333 7.03993 14.2064 6.66683 14.6667 6.66683ZM6.33333 10.0002C6.79357 10.0002 7.16667 10.3733 7.16667 10.8335V15.8335C7.16667 16.2937 6.79357 16.6668 6.33333 16.6668C5.8731 16.6668 5.5 16.2937 5.5 15.8335V10.8335C5.5 10.3733 5.8731 10.0002 6.33333 10.0002Z"
        fill={fill}
      />
    </svg>
  )
}

export default ChartIcon
