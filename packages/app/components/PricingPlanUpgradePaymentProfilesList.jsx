import React from 'react'
import PropTypes from 'prop-types'

import PricingPlanUpgradePaymentProfilesListItem from './PricingPlanUpgradePaymentProfilesListItem'

const PricingPlanUpgradePaymentProfilesList = ({
  profilesToUpgrade,
  setProfilesToUpgrade,
  profiles,
}) => {
  return (
    <div className="mb-10 pl-8">
      {profiles.map((profile) => (
        <PricingPlanUpgradePaymentProfilesListItem
          key={profile.name}
          profile={profile}
          profilesToUpgrade={profilesToUpgrade}
          setProfilesToUpgrade={setProfilesToUpgrade}
        />
      ))}
    </div>
  )
}

PricingPlanUpgradePaymentProfilesList.propTypes = {
  profilesToUpgrade: PropTypes.objectOf(PropTypes.string).isRequired,
  setProfilesToUpgrade: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
}

PricingPlanUpgradePaymentProfilesList.defaultProps = {
}

export default PricingPlanUpgradePaymentProfilesList
