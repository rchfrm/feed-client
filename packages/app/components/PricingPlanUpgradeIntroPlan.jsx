import React from 'react'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanUpgradeMonthlyCostAndServiceFee from '@/app/PricingPlanUpgradeMonthlyCostAndServiceFee'
import PricingPlanFeatures from '@/PricingPlanFeatures'

import MarkdownText from '@/elements/MarkdownText'

import { pricingNumbers, pricingPlans } from '@/constants/pricing'

import copy from '@/app/copy/global'

const PricingPlanUpgradeIntroPlan = () => {
  const { artist } = React.useContext(ArtistContext)
  const [, planPeriod] = artist.plan.split('_') || []
  const isAnnualPricing = planPeriod === 'annual'

  const plan = pricingNumbers.pro
  const { features } = pricingPlans.find(({ name }) => name === 'pro')

  return (
    <>
      <div className="flex items-center mb-8">
        <p className="mb-0 mr-12 pl-4 text-2xl font-bold">Pro</p>
        <PricingPlanUpgradeMonthlyCostAndServiceFee plan={plan} isAnnualPricing={isAnnualPricing} />
      </div>
      <div className="pl-8">
        <p>Features:</p>
        <PricingPlanFeatures features={features} className="mb-4" />
        <MarkdownText markdown={copy.pricingProfileFootnote} className="text-xs mb-0" />
      </div>
    </>
  )
}

PricingPlanUpgradeIntroPlan.propTypes = {
}

PricingPlanUpgradeIntroPlan.defaultProps = {
}

export default PricingPlanUpgradeIntroPlan
