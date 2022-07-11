import React from 'react'
import PropTypes from 'prop-types'

import PricingPlanMonthlyCost from '@/PricingPlanMonthlyCost'
import PricingPlanFeatures from '@/PricingPlanFeatures'

import { capitalise } from '@/helpers/utils'

const GetStartedPricingReadMore = ({ plan, currency }) => {
  const { name, description, monthlyCost, features } = plan
  const amount = monthlyCost[currency]

  return (
    <div>
      <h2 className="mb-8 pr-12">{capitalise(name)}</h2>
      <PricingPlanMonthlyCost amount={amount} currenct={currency} />
      <p className="text-2xl mb-8">{description}</p>
      <PricingPlanFeatures features={features} />
    </div>
  )
}

GetStartedPricingReadMore.propTypes = {
  plan: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
}

GetStartedPricingReadMore.defaultProps = {
}

export default GetStartedPricingReadMore
