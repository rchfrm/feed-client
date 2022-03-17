import React from 'react'
import brandColors from '@/constants/brandColors'

export default function PricingPageSpendCircle({
  amount,
  color,
  className,
  diameter,
  setDiameter,
}) {
  const circle = React.useRef(null)
  React.useEffect(() => {
    if (!setDiameter) return
    setDiameter(circle.current.clientHeight)
  })
  return (
    <div
      className={className}
      style={{
        height: `${diameter}px`,
        width: setDiameter ? 'initial' : `${diameter}px`,
      }}
    >
      <svg
        fill={brandColors[color]}
        ref={circle}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="50" />
      </svg>
      <div
        className={[
          'h-full',
          'relative',
          'flex',
          'justify-center',
          'items-center',
        ].join(' ')}
        style={{
          top: '-100%',
        }}
      >
        {amount}
      </div>
    </div>
  )
}
