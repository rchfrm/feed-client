import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import ProfileStatusMobileIncomplete from '@/app/ProfileStatusMobileIncomplete'
import ProfileStatusMobileCompleted from '@/app/ProfileStatusMobileCompleted'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
  isControlsLoading: state.isControlsLoading,
})

const ProfileStatusMobile = ({ backgroundStyle }) => {
  const { isControlsLoading } = useControlsStore(getControlsStoreState)

  const { artist: { hasSetUpProfile } } = React.useContext(ArtistContext)

  if (isControlsLoading) return null

  return (
    !hasSetUpProfile ? (
      <ProfileStatusMobileIncomplete backgroundStyle={backgroundStyle} />
    ) : (
      <ProfileStatusMobileCompleted backgroundStyle={backgroundStyle} />
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
