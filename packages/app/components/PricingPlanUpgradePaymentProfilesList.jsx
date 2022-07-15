import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'

import useBillingStore from '@/app/stores/billingStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanUpgradePaymentProfilesListItem from './PricingPlanUpgradePaymentProfilesListItem'

const getBillingStoreState = (state) => ({
  organisationArtists: state.organisationArtists,
})

const PricingPlanUpgradePaymentProfilesList = ({
  profilesToUpgrade,
  setProfilesToUpgrade,
}) => {
  const [organisationProfiles, setOrganisationProfiles] = React.useState([])

  const { organisationArtists } = useBillingStore(getBillingStoreState, shallow)
  const { artistId } = React.useContext(ArtistContext)

  React.useEffect(() => {
    const currentProfile = organisationArtists.find((profile) => profile.id === artistId)
    const otherProfiles = organisationArtists.filter((profile) => profile.id !== artistId)

    // Make sure that the currently active profile is the first item in the array
    setOrganisationProfiles([currentProfile, ...otherProfiles])
  }, [artistId, organisationArtists])

  return (
    <div className="pl-8">
      {organisationProfiles.map((profile) => (
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
}

PricingPlanUpgradePaymentProfilesList.defaultProps = {
}

export default PricingPlanUpgradePaymentProfilesList
