import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import shallow from 'zustand/shallow'

import useBillingStore from '@/app/stores/billingStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import Error from '@/elements/Error'

import { getArtistOnSignUp } from '@/app/helpers/artistHelpers'

import PricingPlanUpgradePaymentProfilesListItem from './PricingPlanUpgradePaymentProfilesListItem'

const getBillingStoreState = (state) => ({
  organisationArtists: state.organisationArtists,
})

const PricingPlanUpgradePaymentProfilesList = ({ profilesToUpgrade, setProfilesToUpgrade }) => {
  const [allProfiles, setAllProfiles] = React.useState([])
  const [error, setError] = React.useState(null)

  const { organisationArtists } = useBillingStore(getBillingStoreState, shallow)
  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    // Get all available profiles
    const { res, error } = await getArtistOnSignUp()
    if (!isMounted()) return

    if (error) {
      setError(error)
      return
    }

    const { accounts } = res

    const formattedProfiles = Object.values(accounts).map(({ name, exists, plan = 'basic' }) => ({
      name,
      id: organisationArtists.find((artist) => artist.name === name)?.id || '',
      plan,
      isConnected: exists,
    }))

    const currentProfile = formattedProfiles.find((profile) => profile.id === artistId)
    const otherProfiles = formattedProfiles.filter((profile) => profile.id !== artistId)

    // Make sure that the currently active profile is the first item in the array
    setAllProfiles([currentProfile, ...otherProfiles])
  }, [])

  return (
    <div className="pl-8">
      <Error error={error} />
      {allProfiles.map((profile) => (
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
  profilesToUpgrade: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      plan: PropTypes.string,
    }),
  ),
  setProfilesToUpgrade: PropTypes.func,
}

PricingPlanUpgradePaymentProfilesList.defaultProps = {
  profilesToUpgrade: [],
  setProfilesToUpgrade: () => {},
}

export default PricingPlanUpgradePaymentProfilesList
