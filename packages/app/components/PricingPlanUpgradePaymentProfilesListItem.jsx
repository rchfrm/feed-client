import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import DropdownPill from '@/app/DropdownPill'

import { getPricingPlanString } from '@/app/helpers/billingHelpers'

const PricingPlanUpgradePaymentProfilesListItem = ({
  profile,
  profilesToUpgrade,
  setProfilesToUpgrade,
}) => {
  const { artistId } = React.useContext(ArtistContext)
  const { name, id } = profile
  const [, planPeriod] = profilesToUpgrade[artistId]?.split('_') || []
  const [planPrefix] = profilesToUpgrade[id]?.split('_') || []
  const [selectedPlan, setSelectedPlan] = React.useState(planPrefix || 'growth')
  const isAnnualPricing = planPeriod === 'annual'

  const handleOnChange = (plan) => {
    setSelectedPlan(plan)

    // Update the 'profiles to upgrade' state
    setProfilesToUpgrade((profilesToUpgrade) => ({
      ...profilesToUpgrade,
      [id]: getPricingPlanString(plan, isAnnualPricing),
    }))
  }

  return (
    <div className="flex items-center mb-4">
      <div className="mr-2">{name}</div>
      <DropdownPill
        items={['growth', 'pro']}
        selectedItem={selectedPlan}
        handleItemClick={handleOnChange}
        className={selectedPlan === 'growth' ? 'border-black' : 'border-insta'}
      />
    </div>
  )
}

PricingPlanUpgradePaymentProfilesListItem.propTypes = {
  profile: PropTypes.object.isRequired,
  profilesToUpgrade: PropTypes.object.isRequired,
  setProfilesToUpgrade: PropTypes.func.isRequired,
}

PricingPlanUpgradePaymentProfilesListItem.defaultProps = {
}

export default PricingPlanUpgradePaymentProfilesListItem
