import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanUpgradePaymentProfilesListItem from './PricingPlanUpgradePaymentProfilesListItem'

const PricingPlanUpgradePaymentProfilesList = ({
  profilesToUpgrade,
  setProfilesToUpgrade,
  organisationArtists,
}) => {
  const [organisationProfiles, setOrganisationProfiles] = React.useState([])

  const { artistId } = React.useContext(ArtistContext)

  React.useEffect(() => {
    const currentProfile = organisationArtists.find((profile) => profile.id === artistId)

    // Filter out current profile and profiles with a pro plan
    const otherProfiles = organisationArtists.filter((profile) => {
      const [planPrefix] = profile?.plan.split('_') || []

      return (profile.id !== artistId) && (planPrefix !== 'pro')
    })

    // Make sure that the currently active profile is the first item in the array
    setOrganisationProfiles([currentProfile, ...otherProfiles])
  }, [artistId, organisationArtists])

  if (organisationProfiles.length === 1) return null

  return (
    <div className="mb-10 pl-8">
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
  organisationArtists: PropTypes.array.isRequired,
}

PricingPlanUpgradePaymentProfilesList.defaultProps = {
}

export default PricingPlanUpgradePaymentProfilesList
