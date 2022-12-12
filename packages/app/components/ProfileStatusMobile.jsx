import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import ProfileStatusMobileIncomplete from '@/app/ProfileStatusMobileIncomplete'
import ProfileStatusMobileCompleted from '@/app/ProfileStatusMobileCompleted'
import FadeInOut from '@/elements/FadeInOut'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
  profileSetupStatus: state.profileSetupStatus,
})

const ProfileStatusMobile = ({ backgroundStyle }) => {
  const { profileSetupStatus } = useControlsStore(getControlsStoreState)

  const { artist: { hasSetUpProfile } } = React.useContext(ArtistContext)

  if (! profileSetupStatus) return <div className="h-7 w-full" />

  return (
    <FadeInOut show unmountOnExit>
      <div className="opacity-0">
        {! hasSetUpProfile ? (
          <ProfileStatusMobileIncomplete backgroundStyle={backgroundStyle} />
        ) : (
          <ProfileStatusMobileCompleted backgroundStyle={backgroundStyle} />
        )}
      </div>
    </FadeInOut>
  )
}

ProfileStatusMobile.propTypes = {
  backgroundStyle: PropTypes.object,
}

ProfileStatusMobile.defaultProps = {
  backgroundStyle: null,
}

export default ProfileStatusMobile
