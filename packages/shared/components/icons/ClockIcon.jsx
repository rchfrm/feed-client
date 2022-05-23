import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const ClockIcon = ({ color, className, style }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.21154 13.7748C10.6343 13.7748 13.409 11.0001 13.409 7.57738C13.409 4.15465 10.6343 1.37997 7.21154 1.37997C3.7888 1.37997 1.01412 4.15465 1.01412 7.57738C1.01412 11.0001 3.7888 13.7748 7.21154 13.7748ZM7.21154 14.7889C11.1944 14.7889 14.4231 11.5602 14.4231 7.57738C14.4231 3.59456 11.1944 0.365845 7.21154 0.365845C3.22872 0.365845 0 3.59456 0 7.57738C0 11.5602 3.22872 14.7889 7.21154 14.7889Z"
        fill={color}
      />
      <rect x="6.92285" y="2.09668" width="0.576923" height="1.73077" fill={color} />
      <rect x="6.92285" y="11.3274" width="0.576923" height="1.73077" fill={color} />
      <rect x="12.6924" y="7.28894" width="0.576923" height="1.73077" transform="rotate(90 12.6924 7.28894)" fill={color} />
      <rect x="5.44727" y="4.85876" width="0.865385" height="3.17308" transform="rotate(-25 5.44727 4.85876)" fill={color} />
      <rect x="9.40283" y="6.5155" width="0.865385" height="2.88462" transform="rotate(65 9.40283 6.5155)" fill={color} />
      <rect x="3.46143" y="7.28894" width="0.576923" height="1.73077" transform="rotate(90 3.46143 7.28894)" fill={color} />
      <rect x="11.291" y="11.2489" width="0.576923" height="1.73077" transform="rotate(135 11.291 11.2489)" fill={color} />
      <rect x="4.76367" y="4.7218" width="0.576923" height="1.73077" transform="rotate(135 4.76367 4.7218)" fill={color} />
      <rect x="3.54004" y="11.6569" width="0.576923" height="1.73077" transform="rotate(-135 3.54004 11.6569)" fill={color} />
      <rect x="10.0674" y="5.12976" width="0.576923" height="1.73077" transform="rotate(-135 10.0674 5.12976)" fill={color} />
    </svg>
  )
}

ClockIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

ClockIcon.defaultProps = {
  color: brandColors.textColor,
  className: null,
  style: null,
}

export default ClockIcon
