import React from 'react'
import brandColors from '@/constants/brandColors'

export default function PricingPageFeedSpendCircle({
  amount,
  color,
  className,
  diameter,
}) {
  return (
    <div
      className={className}
      style={{
        height: `${diameter}px`,
      }}
    >
      <svg
        fill={brandColors[color]}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          height: `${diameter}px`,
          width: `${diameter}px`,
        }}
      >
        <circle cx="50" cy="50" r="50" />
      </svg>
      <div className="ml-2">
        <h2 className="mb-0">{`£${amount}`}</h2>
        <p className="mb-0">Feed’s service fee</p>
      </div>
    </div>
  )
}
