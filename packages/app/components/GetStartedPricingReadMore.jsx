import React from 'react'
import PropTypes from 'prop-types'

import PricingPlanMonthlyCost from '@/PricingPlanMonthlyCost'
import PricingPlanServiceFee from '@/PricingPlanServiceFee'
import PricingPlanFeatures from '@/PricingPlanFeatures'

import MarkdownText from '@/elements/MarkdownText'

import { capitalise } from '@/helpers/utils'

import copy from '@/app/copy/global'

const GetStartedPricingReadMore = ({ plan, currency }) => {
  const {
    name,
    description,
    monthlyCost,
    serviceFeePercentage,
    features,
  } = plan

  const amount = monthlyCost[currency]
  const isBasicPlan = name === 'basic'

  return (
    <div>
      <h2 className="mb-8 pr-12">{capitalise(name)}</h2>
      <PricingPlanMonthlyCost amount={amount} currenct={currency} />
      {isBasicPlan && <PricingPlanServiceFee percentage={serviceFeePercentage} />}
      <p className="text-2xl mb-8">{description}</p>
      <PricingPlanFeatures features={features} className="mb-4" />
      <MarkdownText markdown={copy.pricingProfileFootnote} className="text-xs mb-0" />
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
