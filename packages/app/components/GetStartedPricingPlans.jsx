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
  artistId,
  currency,
  setSelectedPricingPlan,
  recommendedPlan,
  objective,
}) => {
  const { organizationArtists } = useBillingStore(getBillingStoreState)
  const hasAnotherOrgProfileSpending = organizationArtists.some((artist) => artist.id !== artistId && artist.preferences.targeting.status === 1)

  const openPricingPlanReadMoreSidePanel = useOpenPricingPlanReadMoreSidePanel()

  const openReadMoreSidePanel = (plan) => {
    openPricingPlanReadMoreSidePanel(plan, currency, objective)
  }

  return (
    <div className="col-span-12 sm:mt-12 mb-10">
      <div className="grid grid-cols-12 gap-4">
        {pricingPlans.map((plan, index) => {
          // Don't show free plan if the user already has an active spending profile
          if (hasAnotherOrgProfileSpending && plan.name === 'free') return

          return (
            <div
              key={plan.name}
              className={[
                'col-span-12 sm:col-span-4',
                hasAnotherOrgProfileSpending && index === 1 ? 'sm:col-start-3' : null,
                hasAnotherOrgProfileSpending && index === 2 ? 'sm:col-start-7' : null,
              ].join(' ')}
            >
              <GetStartedPricingPlan
                plan={plan}
                currency={currency}
                setSelectedPricingPlan={setSelectedPricingPlan}
                handleSidePanel={openReadMoreSidePanel}
                isRecommended={plan.name === recommendedPlan}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

GetStartedPricingPlans.propTypes = {
  artistId: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  setSelectedPricingPlan: PropTypes.func.isRequired,
  recommendedPlan: PropTypes.string.isRequired,
  objective: PropTypes.string.isRequired,
}

export default GetStartedPricingPlans
