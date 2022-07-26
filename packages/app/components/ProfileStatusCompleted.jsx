import React from 'react'
import PropTypes from 'prop-types'

import useBillingStore from '@/app/stores/billingStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ProfileStatusSpendingPaused from '@/app/ProfileStatusSpendingPaused'
import ProfileStatusObjective from '@/app/ProfileStatusObjective'
import ProfileStatusUpgradePlan from '@/app/ProfileStatusUpgradePlan'

import useControlsStore from '@/app/stores/controlsStore'

import { hasAProfileOnGrowthOrPro } from '@/app/helpers/artistHelpers'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const getBillingStoreState = (state) => ({
  organisationArtists: state.organisationArtists,
})

const ProfileStatusCompleted = ({ className }) => {
  const { isSpendingPaused } = useControlsStore(getControlsStoreState)
  const { organisationArtists } = useBillingStore(getBillingStoreState)

  const { artist: { hasLegacyPlan } } = React.useContext(ArtistContext)
  const shouldUpgradeToGrowth = hasLegacyPlan && hasAProfileOnGrowthOrPro(organisationArtists)

  return (
    <div className={[className].join(' ')}>
      {shouldUpgradeToGrowth ? (
        <ProfileStatusUpgradePlan />
      ) : (
        isSpendingPaused ? (
          <ProfileStatusSpendingPaused />
        ) : (
          <ProfileStatusObjective />
        )
      )}
    </div>
  )
}

ProfileStatusCompleted.propTypes = {
  className: PropTypes.string,
}

ProfileStatusCompleted.defaultProps = {
  className: '',
}

export default ProfileStatusCompleted
