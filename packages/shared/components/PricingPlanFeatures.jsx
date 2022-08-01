import React from 'react'
import PropTypes from 'prop-types'
import PricingPlanFeature from '@/PricingPlanFeature'

import { getMaxSpendString } from '@/helpers/utils'

export default function PricingPlanFeatures({ plan, currency, className }) {
  const {
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
    <div className={['pl-3', className].join(' ')}>
      {expandedFeatureList.map((feature, index) => {
        return <PricingPlanFeature feature={feature} index={index} key={index} />
      })}
    </div>
  )
}

PricingPlanFeatures.propTypes = {
  plan: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PricingPlanFeatures.defaultProps = {
  className: null,
}
