import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import ProfileStatusMobileSetupState from '@/app/ProfileStatusMobileSetupState'
import ProfileStatusMobileSpendingPaused from '@/app/ProfileStatusMobileSpendingPaused'
import ProfileStatusMobileObjective from '@/app/ProfileStatusMobileObjective'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ProfileStatusMobile = ({ backgroundStyle }) => {
  const { isSpendingPaused } = useControlsStore(getControlsStoreState)

  const { artist: { hasSetUpProfile } } = React.useContext(ArtistContext)

  if (!hasSetUpProfile) {
    return (
      <ProfileStatusMobileSetupState backgroundStyle={backgroundStyle} />
    )
  }

  return (
    isSpendingPaused ? (
      <ProfileStatusMobileSpendingPaused backgroundStyle={backgroundStyle} />
    ) : (
      <ProfileStatusMobileObjective backgroundStyle={backgroundStyle} />
    )
  )
}

ProfileStatusMobile.propTypes = {
  backgroundStyle: PropTypes.object,
}

ProfileStatusMobile.defaultProps = {
  backgroundStyle: null,
}

export default ProfileStatusMobile
