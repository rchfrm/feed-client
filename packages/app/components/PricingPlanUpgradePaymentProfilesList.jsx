import React from 'react'
import PropTypes from 'prop-types'

import PricingPlanUpgradePaymentProfilesListItem from './PricingPlanUpgradePaymentProfilesListItem'

const PricingPlanUpgradePaymentProfilesList = ({
  profilesToUpgrade,
  setProfilesToUpgrade,
  profiles,
  canChooseFree,
}) => {
  return (
    <div className="mb-10 pl-8">
      {profiles.map((profile) => (
        <PricingPlanUpgradePaymentProfilesListItem
          key={profile.name}
          profile={profile}
          profilesToUpgrade={profilesToUpgrade}
          setProfilesToUpgrade={setProfilesToUpgrade}
          canChooseFree={canChooseFree}
        />
      ))}
    </div>
  )
}

PricingPlanUpgradePaymentProfilesList.propTypes = {
  profilesToUpgrade: PropTypes.objectOf(PropTypes.oneOf(['free', 'growth', 'pro', 'none'])).isRequired,
  setProfilesToUpgrade: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
  canChooseFree: PropTypes.bool.isRequired,
}

PricingPlanUpgradePaymentProfilesList.defaultProps = {
}

export default PricingPlanUpgradePaymentProfilesList
