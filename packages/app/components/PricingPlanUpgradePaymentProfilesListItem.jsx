import React from 'react'
import PropTypes from 'prop-types'

import DropdownPill from '@/app/DropdownPill'

const PricingPlanUpgradePaymentProfilesListItem = ({
  profile,
  profilesToUpgrade,
  setProfilesToUpgrade,
}) => {
  const { name, id } = profile
  const [selectedPlan, setSelectedPlan] = React.useState(profilesToUpgrade[id] || 'growth')

  const handleOnChange = (plan) => {
    setSelectedPlan(plan)

    setProfilesToUpgrade((profilesToUpgrade) => ({
      ...profilesToUpgrade,
      [id]: plan,
    }))
  }

  return (
    <div className="flex items-center mb-4">
      <div className="mr-2">{name}</div>
      <DropdownPill
        items={['growth', 'pro']}
        selectedItem={selectedPlan}
        handleItemClick={handleOnChange}
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
