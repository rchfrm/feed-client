import React from 'react'
import PropTypes from 'prop-types'

import CheckboxButton from '@/elements/CheckboxButton'
import DropdownPill from '@/app/DropdownPill'

const PricingPlanUpgradePaymentProfilesListItem = ({
  profile,
  profilesToUpgrade,
  setProfilesToUpgrade,
}) => {
  const { name, id, isConnected } = profile
  const existingProfile = profilesToUpgrade.find((profile) => profile.name === name)
  const [selectedPlan, setSelectedPlan] = React.useState(existingProfile?.plan || 'growth')
  const [isEnabled, setIsEnabled] = React.useState(isConnected)

  const getActionType = (plan) => {
    // If there are no plan changes remove the profile from the 'profiles to upgrade' array
    if (plan === profile.plan) return 'remove-profile'

    // If the profile is already in the 'profiles to upgrade' array just update its value
    if (existingProfile) return 'update-plan'

    // Otherwise we add the profile to the array
    return 'add-profile'
  }

  const updateProfilesToUpgrade = (type, selectedPlan) => {
    setProfilesToUpgrade({
      type,
      payload: {
        profile: {
          id,
          name,
          plan: selectedPlan,
        },
      },
    })
  }

  const handleCheckboxChange = () => {
    const type = isEnabled ? 'remove-profile' : 'add-profile'

    // Update parent state
    updateProfilesToUpgrade(type, selectedPlan)

    // Update local state
    setIsEnabled((isEnabled) => !isEnabled)
  }

  const handleDropdownChange = (plan) => {
    const type = getActionType(plan)

    // Update parent state
    updateProfilesToUpgrade(type, plan)

    // Update local state
    setSelectedPlan(plan)

    // If checkbox isn't enabled yet we enable it
    if (!isEnabled) {
      setIsEnabled(true)
    }
  }

  return (
    <div className="flex items-center mb-4">
      <CheckboxButton
        label={name}
        value={id}
        onChange={handleCheckboxChange}
        checked={isEnabled}
        disabled={isConnected}
        className="mb-0 mr-2"
      />
      <DropdownPill
        items={['growth', 'pro']}
        selectedItem={selectedPlan}
        handleItemClick={handleDropdownChange}
      />
    </div>
  )
}

PricingPlanUpgradePaymentProfilesListItem.propTypes = {
  profile: PropTypes.object,
  profilesToUpgrade: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      plan: PropTypes.string,
    }),
  ),
  setProfilesToUpgrade: PropTypes.func,
}

PricingPlanUpgradePaymentProfilesListItem.defaultProps = {
  profile: null,
  profilesToUpgrade: [],
  setProfilesToUpgrade: () => {},
}

export default PricingPlanUpgradePaymentProfilesListItem
