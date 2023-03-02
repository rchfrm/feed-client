import React from 'react'
import PropTypes from 'prop-types'
import PricingPlanUpgradeMonthlyCostAndServiceFee from '@/app/PricingPlanUpgradeMonthlyCostAndServiceFee'
import PricingPlanFeatures from '@/PricingPlanFeatures'
import MarkdownText from '@/elements/MarkdownText'
import { pricingNumbers, pricingPlans } from '@/constants/pricing'
import copy from '@/app/copy/global'

const PricingPlanUpgradeIntroPlan = ({ currencyCode }) => {
  const proPlan = pricingNumbers.pro
  const plan = pricingPlans.find(({ name }) => name === 'pro')

  return (
    <>
      <div className="flex items-center mb-8">
        <p className="mb-0 mr-12 pl-4 text-2xl font-bold">Pro</p>
        <PricingPlanUpgradeMonthlyCostAndServiceFee currencyCode={currencyCode} plan={proPlan} />
      </div>
      <div className="pl-8">
        <p>Features:</p>
        <PricingPlanFeatures plan={plan} currencyCode={currencyCode} className="mb-4" />
        <MarkdownText markdown={copy.pricingProfileFootnote} className="text-xs mb-0" />
      </div>
    </>
  )
}

PricingPlanUpgradeIntroPlan.propTypes = {
  currencyCode: PropTypes.string.isRequired,
}

export default PricingPlanUpgradeIntroPlan
