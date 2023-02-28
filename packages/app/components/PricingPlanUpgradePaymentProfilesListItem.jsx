import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import DropdownPill from '@/app/DropdownPill'

const PricingPlanUpgradePaymentProfilesListItem = ({
  profile,
  profilesToUpgrade,
  setProfilesToUpgrade,
  canChooseFree,
}) => {
  const { artistId: profileInContextId } = React.useContext(ArtistContext)

  const [idOfProfileOnFree, setIdOfProfileOnFree] = React.useState('')

  const { name, id } = profile
  const [planPrefix] = profilesToUpgrade[id]?.split('_') || []
  const [currentPlanPrefix] = profile.plan?.split('_') || []

  const isProfileActive = profile.status === 'active'
  const hasChanged = (isProfileActive && planPrefix === 'none')
    || (isProfileActive && planPrefix !== currentPlanPrefix)
    || (! isProfileActive && planPrefix !== 'none')
  const isDisabled = Boolean(idOfProfileOnFree && idOfProfileOnFree !== id)

  React.useEffect(() => {
    const profilesToUpgradeIds = Object.keys(profilesToUpgrade)
    if (! profilesToUpgradeIds.length === 0) return

    const profileWithFreePlan = profilesToUpgradeIds.find((id) => {
      return profilesToUpgrade[id] === 'free'
    })

    setIdOfProfileOnFree(profileWithFreePlan || '')
  }, [profilesToUpgrade])

  const planOptions = React.useCallback((canChooseFree) => {
    const options = ['growth', 'pro']

    if (canChooseFree && profile.id === profileInContextId) {
      options.unshift('free')
    }

    if (profile.id !== profileInContextId
      && (profile.status !== 'active'
        || ! profile.plan
        || (profile.plan === 'free' && ! profile.preferences.targeting.status)
      )
    ) {
      options.push('none')
    }

    return options
  }, [profile.id, profile.status, profile.plan, profile.preferences.targeting.status, profileInContextId])

  const handleOnChange = (plan) => {
    setProfilesToUpgrade({
      type: 'update-profile-plan',
      payload: {
        profileId: id,
        plan,
      },
    })
  }

  return (
    <div className="flex items-center mb-4">
      <div className="mr-2">{name}</div>
      <DropdownPill
        items={planOptions(canChooseFree)}
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
  profilesToUpgrade: PropTypes.objectOf(PropTypes.oneOf(['free', 'growth', 'pro', 'none'])).isRequired,
  setProfilesToUpgrade: PropTypes.func.isRequired,
  canChooseFree: PropTypes.bool.isRequired,
}

PricingPlanUpgradePaymentProfilesListItem.defaultProps = {
}

export default PricingPlanUpgradePaymentProfilesListItem
