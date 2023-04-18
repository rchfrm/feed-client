import React from 'react'
import PropTypes from 'prop-types'
import PricingPlanMonthlyCost from '@/PricingPlanMonthlyCost'
import PricingPlanServiceFee from '@/PricingPlanServiceFee'
import PricingPlanFeatures from '@/PricingPlanFeatures'
import MarkdownText from '@/elements/MarkdownText'
import { capitalise } from '@/helpers/utils'
import copy from '@/app/copy/global'

const GetStartedPricingReadMore = ({
  plan,
  currencyCode,
}) => {
  const {
    name,
    description,
    monthlyCost,
    serviceFeePercentage,
  } = plan

  const amount = monthlyCost[currencyCode]
  const isFreePlan = name === 'free'

  return (
    <div>
      <h2 className="mb-8 pr-12">{capitalise(name)}</h2>
      <PricingPlanMonthlyCost amount={amount} currencyCode={currencyCode} />
      {isFreePlan && <PricingPlanServiceFee percentage={serviceFeePercentage} />}
      <p className="text-2xl mb-8">{description}</p>
      <PricingPlanFeatures plan={plan} currencyCode={currencyCode} className="mb-4" />
      <MarkdownText markdown={copy.pricingProfileFootnote} className="text-xs mb-0" />
    </div>
  )
}

GetStartedPricingReadMore.propTypes = {
  plan: PropTypes.object.isRequired,
  currencyCode: PropTypes.string.isRequired,
}

export default GetStartedPricingReadMore
