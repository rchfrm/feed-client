import React from 'react'

import PricingPlanUpgradeMonthlyCostAndServiceFee from '@/app/PricingPlanUpgradeMonthlyCostAndServiceFee'
import PricingPlanFeatures from '@/PricingPlanFeatures'

import { pricingNumbers, pricingPlans } from '@/constants/pricing'

const PricingPlanUpgradeIntroPlan = () => {
  const plan = pricingNumbers.pro
  const { features } = pricingPlans.find(({ name }) => name === 'pro')

  return (
    <>
      <div className="flex items-center mb-8">
        <p className="mb-0 mr-12 pl-4 text-2xl font-bold">Pro</p>
        <PricingPlanUpgradeMonthlyCostAndServiceFee plan={plan} />
      </div>
      <div className="pl-8">
        <p>Features:</p>
        <PricingPlanFeatures features={features} />
      </div>
    </>
  )
}

PricingPlanUpgradeIntroPlan.propTypes = {
}

PricingPlanUpgradeIntroPlan.defaultProps = {
}

export default PricingPlanUpgradeIntroPlan

