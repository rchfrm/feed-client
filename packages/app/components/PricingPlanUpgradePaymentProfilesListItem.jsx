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
  const { artistId: profileInContextID } = React.useContext(ArtistContext)
  const [, planPeriod] = profilesToUpgrade[profileInContextID]?.split('_') || []
  const isAnnualPricing = planPeriod === 'annual'

  const [idOfProfileOnBasic, setIdOfProfileOnBasic] = React.useState('')

  const { name, id } = profile
  const [planPrefix] = profilesToUpgrade[id]?.split('_') || []
  const [currentPlanPrefix] = profile.plan?.split('_') || []

  const isProfileActive = profile.status === 'active'
  const hasChanged = (isProfileActive && planPrefix === 'none')
    || (isProfileActive && planPrefix !== currentPlanPrefix)
    || (!isProfileActive && planPrefix !== 'none')
  const isDisabled = idOfProfileOnBasic && idOfProfileOnBasic !== id

  React.useEffect(() => {
    if (!profilesToUpgrade) return
    const profileWithBasic = Object.keys(profilesToUpgrade).find((id) => {
      const [planPrefix] = profilesToUpgrade[id].split('_')
      return planPrefix === 'basic'
    })
    setIdOfProfileOnBasic(profileWithBasic)
  }, [profilesToUpgrade])

  const planOptions = React.useCallback((canChooseBasic) => {
    const options = ['growth', 'pro']
    if (canChooseBasic && profile.id === profileInContextID) {
      options.unshift('basic')
    }
    if (profile.id !== profileInContextID && profile.status !== 'active') {
      options.push('none')
    }
    return options
  }, [profileInContextID, profile.id, profile.status])

  const handleOnChange = (plan) => {
    const updatedProfilesToUpgrade = Object.keys(profilesToUpgrade).reduce((acc, cur) => {
      if (cur !== id && plan !== 'basic') {
        acc[cur] = profilesToUpgrade[cur]
        return acc
      }
      if (cur !== id && plan === 'basic') {
        acc[cur] = getPricingPlanString('none', isAnnualPricing)
      } else {
        acc[cur] = getPricingPlanString(plan, isAnnualPricing)
      }
      return acc
    }, {})

    setProfilesToUpgrade(updatedProfilesToUpgrade)
  }

  return (
    <div className="flex items-center mb-4">
      <div className="mr-2">{name}</div>
      <DropdownPill
        items={planOptions(canChooseBasic)}
        selectedItem={planPrefix}
        handleItemClick={handleOnChange}
        className={hasChanged ? 'border-insta' : 'border-black'}
        disabled={isDisabled}
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
