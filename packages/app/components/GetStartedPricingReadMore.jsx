import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import PricingPlanMonthlyCost from '@/PricingPlanMonthlyCost'
import PricingPlanServiceFee from '@/PricingPlanServiceFee'
import PricingPlanFeatures from '@/PricingPlanFeatures'

import MarkdownText from '@/elements/MarkdownText'

import { capitalise } from '@/helpers/utils'

import copy from '@/app/copy/global'
import getStartedCopy from '@/app/copy/getStartedCopy'

const GetStartedPricingReadMore = ({
  plan,
  currencyCode,
  objective,
  isDisabled,
}) => {
  const {
    name,
    description,
    monthlyCost,
    serviceFeePercentage,
  } = plan

  const isDesktop = useBreakpointTest('sm')
  const amount = monthlyCost[currencyCode]
  const isBasicPlan = name === 'basic'

  return (
    <div>
      <h2 className="mb-8 pr-12">{capitalise(name)}</h2>
      {isDisabled && !isDesktop && <MarkdownText markdown={getStartedCopy.disabledPricingPlan(name, objective)} className="mb-4" />}
      <PricingPlanMonthlyCost amount={amount} currencyCode={currencyCode} />
      {isBasicPlan && <PricingPlanServiceFee percentage={serviceFeePercentage} />}
      <p className="text-2xl mb-8">{description}</p>
      <PricingPlanFeatures plan={plan} currencyCode={currencyCode} className="mb-4" />
      <MarkdownText markdown={copy.pricingProfileFootnote} className="text-xs mb-0" />
    </div>
  )
}

GetStartedPricingReadMore.propTypes = {
  plan: PropTypes.object.isRequired,
  currencyCode: PropTypes.string.isRequired,
  objective: PropTypes.string,
  isDisabled: PropTypes.bool,
}

GetStartedPricingReadMore.defaultProps = {
  objective: '',
  isDisabled: false,
}

export default GetStartedPricingReadMore
