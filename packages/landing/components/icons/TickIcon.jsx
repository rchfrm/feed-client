import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/landing/constants/brandColors'

const TickIcon = ({
  fill,
  className,
  style,
}) => {
  return (
    <svg
      viewBox="0 0 416 367"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path d="M150.055 367C142.631 367 135.671 364.176 130.567 358.999L8.99806 231.926C-2.60203 221.102 -3.06604 202.747 8.07006 190.981C18.7421 179.215 36.8383 178.744 48.4384 190.039L137.527 254.517C142.631 259.223 150.519 258.282 154.695 252.634L364.528 12.1726C373.808 -0.534628 391.904 -3.35847 404.432 6.52497C416.96 15.9378 419.744 34.2927 410 47L172.791 355.234C167.687 361.823 160.263 366.059 152.375 366.529C151.447 367 150.983 367 150.055 367Z" fill={fill} />
    </svg>
  )
}


TickIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

TickIcon.defaultProps = {
  fill: brandColors.textColor,
  className: null,
  style: null,
}

export default TickIcon
