import React from 'react'
import PropTypes from 'prop-types'
import PricingPlanFeature from '@/PricingPlanFeature'

import { getMaxSpendString } from '@/helpers/utils'

export default function PricingPlanFeatures({ plan, currencyCode, className }) {
  const {
    monthlyCost,
    features,
    maxSpend,
  } = plan

  // Add max spend to feature list if applicable
  const [expandedFeatureList, setExpandedFeatureList] = React.useState(features)

  React.useEffect(() => {
    if (maxSpend[currencyCode]) {
      const maxSpendString = getMaxSpendString(currencyCode, maxSpend[currencyCode])

      setExpandedFeatureList([
        ...features,
        `${maxSpendString} max monthly spend per profile^`,
      ])
    } else {
      setExpandedFeatureList(features)
    }
  }, [currencyCode, features, monthlyCost, maxSpend])

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
  currencyCode: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PricingPlanFeatures.defaultProps = {
  className: null,
}
