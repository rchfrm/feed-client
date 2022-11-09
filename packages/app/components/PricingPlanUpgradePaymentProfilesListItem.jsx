import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import DropdownPill from '@/app/DropdownPill'

import { getPricingPlanString } from '@/app/helpers/billingHelpers'

const PricingPlanUpgradePaymentProfilesListItem = ({
  profile,
  profilesToUpgrade,
  setProfilesToUpgrade,
  canChooseBasic,
}) => {
  const { artistId } = React.useContext(ArtistContext)
  const { name, id } = profile
  const [, planPeriod] = profilesToUpgrade[artistId]?.split('_') || []
  const [planPrefix] = profilesToUpgrade[id]?.split('_') || []
  const [currentPlanPrefix] = profile.plan?.split('_') || []
  const isProfileActive = profile.status === 'active'
  const [selectedPlan, setSelectedPlan] = React.useState(planPrefix || 'growth')
  const isAnnualPricing = planPeriod === 'annual'
  const hasChanged = (isProfileActive && selectedPlan === 'none')
    || (isProfileActive && selectedPlan !== currentPlanPrefix)
    || (!isProfileActive && selectedPlan !== 'none')

  const planOptions = React.useCallback((canChooseBasic) => {
    const options = ['growth', 'pro']
    if (canChooseBasic && profile.id === artistId) {
      options.push('basic')
    }
    if (profile.id !== artistId && profile.status !== 'active') {
      options.push('none')
    }
    return options
  }, [artistId, profile.id, profile.status])

  // TODO FD-1426 : Prevent growth or pro being selected if another profile in the org is set to Basic

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
        items={planOptions(canChooseBasic)}
        selectedItem={selectedPlan}
        handleItemClick={handleOnChange}
        className={hasChanged ? 'border-insta' : 'border-black'}
      />
    </div>
  )
}

PricingPlanUpgradePaymentProfilesListItem.propTypes = {
  profile: PropTypes.object.isRequired,
  profilesToUpgrade: PropTypes.object.isRequired,
  setProfilesToUpgrade: PropTypes.func.isRequired,
  canChooseBasic: PropTypes.bool.isRequired,
}

PricingPlanUpgradePaymentProfilesListItem.defaultProps = {
}

export default PricingPlanUpgradePaymentProfilesListItem
