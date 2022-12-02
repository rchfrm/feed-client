import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import DropdownPill from '@/app/DropdownPill'

const PricingPlanUpgradePaymentProfilesListItem = ({
  profile,
  profilesToUpgrade,
  setProfilesToUpgrade,
  canChooseBasic,
}) => {
  const { artistId: profileInContextId } = React.useContext(ArtistContext)

  const [idOfProfileOnBasic, setIdOfProfileOnBasic] = React.useState('')

  const { name, id } = profile
  const [planPrefix] = profilesToUpgrade[id]?.split('_') || []
  const [currentPlanPrefix] = profile.plan?.split('_') || []

  const isProfileActive = profile.status === 'active'
  const hasChanged = (isProfileActive && planPrefix === 'none')
    || (isProfileActive && planPrefix !== currentPlanPrefix)
    || (!isProfileActive && planPrefix !== 'none')
  const isDisabled = Boolean(idOfProfileOnBasic && idOfProfileOnBasic !== id)

  React.useEffect(() => {
    const profilesToUpgradeIds = Object.keys(profilesToUpgrade)
    if (!profilesToUpgradeIds.length === 0) return

    const profileWithBasic = profilesToUpgradeIds.find((id) => {
      return profilesToUpgrade[id] === 'basic'
    })

    setIdOfProfileOnBasic(profileWithBasic || '')
  }, [profilesToUpgrade])

  const planOptions = React.useCallback((canChooseBasic) => {
    const options = ['growth', 'pro']

    if (canChooseBasic && profile.id === profileInContextId) {
      options.unshift('basic')
    }

    if (profile.id !== profileInContextId && (profile.status !== 'active' || !profile.plan)) {
      options.push('none')
    }

    return options
  }, [profile.id, profile.status, profile.plan, profileInContextId])

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
  profilesToUpgrade: PropTypes.objectOf(PropTypes.oneOf(['basic', 'growth', 'pro', 'none'])).isRequired,
  setProfilesToUpgrade: PropTypes.func.isRequired,
  canChooseBasic: PropTypes.bool.isRequired,
}

PricingPlanUpgradePaymentProfilesListItem.defaultProps = {
}

export default PricingPlanUpgradePaymentProfilesListItem
