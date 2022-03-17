import React from 'react'
import brandColors from '@/constants/brandColors'

export default function PricingPageAdSpendCircle({
  amount,
  color,
  className,
  diameter,
  setDiameter,
}) {
  const circle = React.useRef(null)
  React.useEffect(() => {
    setDiameter(circle.current.clientHeight)
  })
  return (
    <div
      className={className}
      style={{
        height: `${diameter}px`,
      }}
    >
      <svg ref={circle} fill={brandColors[color]} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
