import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const TickCircleIcon = ({
  className,
  fill,
  tickFill,
  style,
}) => {
  return (
    <svg
      className={className}
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12.5" cy="13" r="12.5" fill={fill} />
      <path
        d="M10.7604 18.507C10.5372 18.507 10.328 18.4222 10.1746 18.2666L6.52047 14.447C6.17179 14.1216 6.15784 13.5699 6.49257 13.2162C6.81336 12.8626 7.35729 12.8484 7.70597 13.1879L10.3838 15.126C10.5372 15.2675 10.7743 15.2392 10.8999 15.0694L17.2071 7.84157C17.486 7.45961 18.0299 7.37473 18.4065 7.67181C18.7831 7.95474 18.8668 8.50646 18.5739 8.88841L11.4438 18.1534C11.2904 18.3514 11.0672 18.4788 10.8301 18.4929C10.8022 18.507 10.7883 18.507 10.7604 18.507Z"
        fill={tickFill}
      />
    </svg>
  )
}

TickCircleIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  tickFill: PropTypes.string,
  style: PropTypes.object,
}

TickCircleIcon.defaultProps = {
  className: '',
  fill: brandColors.green,
  tickFill: brandColors.white,
  style: {},
}

export default React.memo(TickCircleIcon)
