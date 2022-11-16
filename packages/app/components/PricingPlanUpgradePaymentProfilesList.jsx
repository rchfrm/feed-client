import React from 'react'
import PropTypes from 'prop-types'

import PricingPlanUpgradePaymentProfilesListItem from './PricingPlanUpgradePaymentProfilesListItem'

const PricingPlanUpgradePaymentProfilesList = ({
  profilesToUpgrade,
  setProfilesToUpgrade,
  profiles,
  canChooseBasic,
}) => {
  return (
    <div className="mb-10 pl-8">
      {profiles.map((profile) => (
        <PricingPlanUpgradePaymentProfilesListItem
          key={profile.name}
          profile={profile}
          profilesToUpgrade={profilesToUpgrade}
          setProfilesToUpgrade={setProfilesToUpgrade}
          canChooseBasic={canChooseBasic}
        />
      ))}
    </div>
  )
}

PricingPlanUpgradePaymentProfilesList.propTypes = {
  profilesToUpgrade: PropTypes.objectOf(PropTypes.oneOf(['basic', 'growth', 'pro', 'none'])).isRequired,
  setProfilesToUpgrade: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
  canChooseBasic: PropTypes.bool.isRequired,
}

PricingPlanUpgradePaymentProfilesList.defaultProps = {
}

export default PricingPlanUpgradePaymentProfilesList
