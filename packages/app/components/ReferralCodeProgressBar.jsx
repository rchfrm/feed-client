import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '@/constants/brandColors'

const BAR = ({ useMask, percentComplete, style }) => {
  const height = 393
  const maskHeight = (percentComplete / 100) * height
  return (
    <svg
      width="32"
      height={height}
      viewBox={`0 0 32 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute top-0 left-0 mt-2 w-10 rounded-t-full rounded-b-button"
      style={{
        ...style,
        height: 'calc(100% - 0.9rem)',
      }}
    >
      {useMask && (
        <defs>
          <clipPath id="ProgressBar_clip">
            <rect x="0" y={height - maskHeight} width="32" height={maskHeight} />
          </clipPath>
        </defs>
      )}
      <path
        clipPath={useMask ? 'url(#ProgressBar_clip)' : null}
        fillRule="evenodd"
        clipRule="evenodd"
        d={`M16.5 0H0L10.681 ${height}H16.5H22.319L32 0H16.5Z`}
        fill={brandColors.yellow}
      />
      <defs>
        <linearGradient id="paint0_linear" x1="29.7931" y1="0" x2="29.7931" y2={height} gradientUnits="userSpaceOnUse">
          <stop stopColor={brandColors.red} />
          <stop offset="0.5" stopColor={brandColors.yellow} />
          <stop offset="1" stopColor={brandColors.blue} />
        </linearGradient>
      </defs>
    </svg>
  )
}

const ReferralCodeProgressBar = ({
  percentComplete,
  className,
  style,
}) => {
  return (
    <div
      className={className}
      style={style}
    >
      {/* PROGRESS (OPAQUE) BAR */}
      <BAR style={{ zIndex: 2 }} useMask percentComplete={percentComplete} />
      {/* FULL BAR (semi-transparent) */}
      <BAR style={{ opacity: 0.3 }} />
    </div>
  )
}

ReferralCodeProgressBar.propTypes = {
  percentComplete: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

ReferralCodeProgressBar.defaultProps = {
  className: null,
  style: null,
}

export default React.memo(ReferralCodeProgressBar)
