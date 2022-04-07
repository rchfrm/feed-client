import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import ProfileStatusIncomplete from '@/app/ProfileStatusIncomplete'
import ProfileStatusCompleted from '@/app/ProfileStatusCompleted'
import FadeInOut from '@/elements/FadeInOut'

const getControlsStoreState = (state) => ({
  isControlsLoading: state.isControlsLoading,
})

const ProfileStatus = ({ className }) => {
  const { artist: { hasSetUpProfile } } = React.useContext(ArtistContext)

  const { isControlsLoading } = useControlsStore(getControlsStoreState)

  if (isControlsLoading) return null

  return (
    <FadeInOut show unmountOnExit>
      <div className={[className, 'opacity-0'].join(' ')}>
        {!hasSetUpProfile ? (
          <ProfileStatusIncomplete />
        ) : (
          <ProfileStatusCompleted />
        )}
      </div>
    </FadeInOut>
  )
}

ProfileStatus.propTypes = {
  className: PropTypes.string,
}

ProfileStatus.defaultProps = {
  className: '',
}

export default ProfileStatus
