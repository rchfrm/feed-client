import MarkdownText from '@/elements/MarkdownText'
import PropTypes from 'prop-types'
import PricingTierMonthlyCost from '@/landing/PricingTierMonthlyCost'
import PricingTierServiceFee from '@/landing/PricingTierServiceFee'
import PricingTierFeatures from '@/landing/PricingTierFeatures'
import React from 'react'
import TryFeed from '@/landing/TryFeed'
import copy from '@/landing/copy/PricingPageCopy'

const {
  currencyOptions,
} = copy

export default function PricingTier({ tier, showAnnualPricing, currency }) {
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
        'h-full',
      ].join(' ')}
    >
      <h2>{name}</h2>
      <MarkdownText
        markdown={description}
        className={[
          'small--p',
          'sm:text-base',
          'xxs:min-h-2-lines',
          'xxs:mb-0',
          'xs:min-h-fit',
          'xs:mb-5',
          'sm:min-h-4-lines',
          'sm:mb-0',
          'md:min-h-3-lines',
          'lg:min-h-fit',
          'lg:mb-5',
        ].join(' ')}
      />
      <PricingTierMonthlyCost amount={monthlyCost[currency]} showAnnualPricing={showAnnualPricing} currency={currency} />
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
  showAnnualPricing: PropTypes.bool.isRequired,
  currency: PropTypes.oneOf(currencyOptions).isRequired,
}
