import MarkdownText from '@/elements/MarkdownText'
import PropTypes from 'prop-types'
import PricingTierMonthlyCost from '@/landing/PricingTierMonthlyCost'
import PricingTierServiceFee from '@/landing/PricingTierServiceFee'
import PricingTierFeatures from '@/landing/PricingTierFeatures'
import React from 'react'
import TryFeed from '@/landing/TryFeed'

export default function PricingTier({ tier }) {
  const {
    name,
    description,
    monthlyCost,
    serviceFeePercentage,
    features,
  } = tier
  return (
    <div
      key={name}
      className={[
        'border-black',
        'border-3',
        'border-solid',
        'rounded-dialogue',
        'p-5',
        'shrink-0',
        'w-full',
      ].join(' ')}
    >
      <h2>{name}</h2>
      <MarkdownText markdown={description} className="small--p" />
      <PricingTierMonthlyCost amount={monthlyCost.GBP} />
      <PricingTierServiceFee percentage={serviceFeePercentage} />
      <TryFeed
        buttonText="Get Started"
        className={['w-full', 'mb-5'].join(' ')}
        trackLocation={`PricingTier${name}`}
      />
      <PricingTierFeatures features={features} />
    </div>
  )
}

PricingTier.propTypes = {
  tier: PropTypes.exact({
    name: PropTypes.string,
    description: PropTypes.string,
    monthlyCost: PropTypes.objectOf(PropTypes.number),
    serviceFeePercentage: PropTypes.number,
    features: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}
