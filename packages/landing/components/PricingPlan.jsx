import React from 'react'
import PropTypes from 'prop-types'

import PricingPlanFeatures from '@/PricingPlanFeatures'
import PricingPlanTopSection from '@/PricingPlanTopSection'
import TryFeed from '@/landing/TryFeed'

import { getMaxSpendString } from '@/landing/copy/PricingPageCopy'
import { currencies } from '@/constants/pricing'

export default function PricingPlan({ plan, showAnnualPricing, currency }) {
  const {
    name,
    monthlyCost,
    features,
    maxSpendMultiple,
  } = plan
  // Add max spend to feature list if applicable
  const [expandedFeatureList, setExpandedFeatureList] = React.useState(features)
  React.useEffect(() => {
    if (maxSpendMultiple) {
      const maxSpendString = getMaxSpendString(currency, monthlyCost[currency] * maxSpendMultiple)
      setExpandedFeatureList([
        ...features,
        `${maxSpendString} max monthly spend per profile^`,
      ])
    } else {
      setExpandedFeatureList(features)
    }
  }, [currency, features, maxSpendMultiple, monthlyCost])
  return (
    <div
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
      <PricingPlanTopSection
        plan={plan}
        currency={currency}
        showAnnualPricing={showAnnualPricing}
      />
      <TryFeed
        buttonText="Get Started"
        className={['w-full', 'mb-5'].join(' ')}
        trackLocation={`PricingPlan${name}`}
      />
      <PricingPlanFeatures features={expandedFeatureList} />
    </div>
  )
}

PricingPlan.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    monthlyCost: PropTypes.objectOf(PropTypes.number),
    serviceFeePercentage: PropTypes.number,
    features: PropTypes.arrayOf(PropTypes.string),
    maxSpendMultiple: PropTypes.number,
  }).isRequired,
  showAnnualPricing: PropTypes.bool.isRequired,
  currency: PropTypes.oneOf(currencies).isRequired,
}
