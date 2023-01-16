import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const FlagIcon = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.00004 4.79723C6.51711 4.48549 7.67038 4.46656 8.62603 4.58602C9.74502 4.72589 10.6438 5.05939 11.6489 5.43632L11.6789 5.44757C12.6659 5.81773 13.7589 6.22763 15.126 6.39852C16.23 6.53651 17.4813 6.51633 19.0001 6.23986V15.2028C17.483 15.5145 16.3297 15.5334 15.3741 15.414C14.2551 15.2741 13.3563 14.9406 12.3512 14.5637L12.3212 14.5524C11.3342 14.1823 10.2412 13.7724 8.8741 13.6015C7.77014 13.4635 6.51884 13.4837 5.00006 13.7601L5.00004 4.79723ZM19.7575 4.02985C17.8574 4.50488 16.4828 4.55255 15.3741 4.41396C14.2551 4.27409 13.3563 3.94059 12.3512 3.56366L12.3212 3.55241C11.3342 3.18225 10.2412 2.77236 8.8741 2.60146C7.48735 2.42812 5.86811 2.50437 3.77823 3.02468C3.33267 3.12557 3 3.52394 3 4.00001V21C3 21.5523 3.44772 22 4 22C4.55228 22 5 21.5523 5 21V15.7972C6.5171 15.4855 7.67037 15.4666 8.62603 15.586C9.74502 15.7259 10.6438 16.0594 11.6489 16.4363L11.6789 16.4476C12.6659 16.8177 13.7589 17.2276 15.126 17.3985C16.5174 17.5724 18.1427 17.4951 20.2426 16.9701C20.6878 16.8588 21.0001 16.4589 21.0001 16V4.99999C21.0001 4.69206 20.8582 4.40129 20.6155 4.21179C20.3728 4.02228 20.0563 3.95516 19.7575 4.02985Z"
        fill={fill}
      />
    </svg>
  )
}

FlagIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

FlagIcon.defaultProps = {
  fill: brandColors.black,
  className: '',
  style: null,
}

export default FlagIcon
