import React from 'react'
import brandColors from '@/constants/brandColors'
import PropTypes from 'prop-types'

export default function PricingPageFeedSpendCircle({
  amount,
  color,
  className,
  diameter,
}) {
  return (
    <div
      className={className}
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
      <div
        className={[
          'ml-2',
          'flex',
          'flex-col',
          'justify-center',
        ].join(' ')}
        style={{
          height: `${diameter}px`,
        }}
      >
        <h2 className="mb-0">£{amount}</h2>
        <p className="mb-0">Feed’s service fee</p>
      </div>
    </div>
  )
}

PricingPageFeedSpendCircle.propTypes = {
  amount: PropTypes.number.isRequired,
  color: PropTypes.string,
  diameter: PropTypes.number.isRequired,
}

PricingPageFeedSpendCircle.defaultProps = {
  color: 'green',
}
