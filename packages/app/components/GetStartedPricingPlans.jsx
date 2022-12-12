import React from 'react'
import PropTypes from 'prop-types'

import useBillingStore from '@/app/stores/billingStore'
import useOpenPricingPlanReadMoreSidePanel from '@/app/hooks/useOpenPricingPlanReadMoreSidePanel'

import GetStartedPricingPlan from '@/app/GetStartedPricingPlan'

import { pricingPlans } from '@/constants/pricing'

const getBillingStoreState = (state) => ({
  organizationArtists: state.organizationArtists,
})

const GetStartedPricingPlans = ({
  showAnnualPricing,
  currency,
  setSelectedPricingPlan,
  recommendedPlan,
  objective,
}) => {
  const { organizationArtists } = useBillingStore(getBillingStoreState)
  const hasMultipleProfiles = organizationArtists.some((artist) => !! artist.plan && artist.status === 'active')

  const hasGrowthObjective = objective === 'growth'
  const hasSalesObjective = objective === 'sales'

  const openPricingPlanReadMoreSidePanel = useOpenPricingPlanReadMoreSidePanel()

  const openReadMoreSidePanel = (plan, isDisabled) => {
    openPricingPlanReadMoreSidePanel(plan, currency, objective, isDisabled)
  }

  return (
    <div className="col-span-12 sm:mt-12 mb-10">
      <div className="grid grid-cols-12 gap-4">
        {pricingPlans.map((plan, index) => {
          const isDisabled = (plan.name === 'basic' && ! hasGrowthObjective) || (plan.name === 'growth' && hasSalesObjective)

          // Don't show basic plan if user already has more than 1 profile
          if (hasMultipleProfiles && plan.name === 'basic') return

          return (
            <div
              key={plan.name}
              className={[
                'col-span-12 sm:col-span-4',
                hasMultipleProfiles && index === 1 ? 'sm:col-start-3' : null,
                hasMultipleProfiles && index === 2 ? 'sm:col-start-7' : null,
              ].join(' ')}
            >
              <GetStartedPricingPlan
                plan={plan}
                showAnnualPricing={showAnnualPricing}
                currency={currency}
                setSelectedPricingPlan={setSelectedPricingPlan}
                handleSidePanel={openReadMoreSidePanel}
                objective={objective}
                isRecommended={plan.name === recommendedPlan}
                isDisabled={isDisabled}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

GetStartedPricingPlans.propTypes = {
  showAnnualPricing: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  setSelectedPricingPlan: PropTypes.func.isRequired,
  recommendedPlan: PropTypes.string.isRequired,
  objective: PropTypes.string.isRequired,
}

export default GetStartedPricingPlans
