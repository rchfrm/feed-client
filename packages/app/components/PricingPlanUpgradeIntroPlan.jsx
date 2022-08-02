import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanUpgradeMonthlyCostAndServiceFee from '@/app/PricingPlanUpgradeMonthlyCostAndServiceFee'
import PricingPlanFeatures from '@/PricingPlanFeatures'

import MarkdownText from '@/elements/MarkdownText'

import { pricingNumbers, pricingPlans } from '@/constants/pricing'

import copy from '@/app/copy/global'

const PricingPlanUpgradeIntroPlan = ({ currency }) => {
  const { artist } = React.useContext(ArtistContext)
  const [, planPeriod] = artist.plan.split('_') || []
  const isAnnualPricing = planPeriod === 'annual'

  const proPlan = pricingNumbers.pro
  const plan = pricingPlans.find(({ name }) => name === 'pro')

  return (
    <>
      <div className="flex items-center mb-8">
        <p className="mb-0 mr-12 pl-4 text-2xl font-bold">Pro</p>
        <PricingPlanUpgradeMonthlyCostAndServiceFee plan={proPlan} isAnnualPricing={isAnnualPricing} />
      </div>
      <div className="pl-8">
        <p>Features:</p>
        <PricingPlanFeatures plan={plan} currency={currency} className="mb-4" />
        <MarkdownText markdown={copy.pricingProfileFootnote} className="text-xs mb-0" />
      </div>
    </>
  )
}

PricingPlanUpgradeIntroPlan.propTypes = {
  currency: PropTypes.string.isRequired,
}

PricingPlanUpgradeIntroPlan.defaultProps = {
}

export default PricingPlanUpgradeIntroPlan
