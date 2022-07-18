import React from 'react'
import PropTypes from 'prop-types'

import PricingPlanFeatures from '@/PricingPlanFeatures'
import PricingPlanMonthlyCost from '@/PricingPlanMonthlyCost'
import PricingPlanServiceFee from '@/PricingPlanServiceFee'
import TryFeed from '@/landing/TryFeed'

import MarkdownText from '@/elements/MarkdownText'

import { getMaxSpendString } from '@/landing/copy/PricingPageCopy'
import { currencies } from '@/constants/pricing'

import { capitalise } from '@/helpers/utils'

export default function PricingPlan({ plan, showAnnualPricing, currency }) {
  const {
    name,
    description,
    monthlyCost,
    features,
    maxSpendMultiple,
    serviceFeePercentage,
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
      <h2>{capitalise(name)}</h2>
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
      <PricingPlanMonthlyCost amount={monthlyCost[currency]} showAnnualPricing={showAnnualPricing} currency={currency} />
      <PricingPlanServiceFee percentage={serviceFeePercentage} />
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
