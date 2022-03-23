import React from 'react'
import PropTypes from 'prop-types'

import ProfileStatusSetupState from '@/app/ProfileStatusSetupState'
import ProfileStatusSpendingPaused from '@/app/ProfileStatusSpendingPaused'
import ProfileStatusObjective from '@/app/ProfileStatusObjective'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ProfileStatus = ({ className }) => {
  const { artist: { hasSetUpProfile } } = React.useContext(ArtistContext)

  const { isSpendingPaused } = useControlsStore(getControlsStoreState)

  if (!hasSetUpProfile) {
    return <ProfileStatusSetupState />
  }

  return (
    <div className={[className].join(' ')}>
      {!isSpendingPaused ? (
        <ProfileStatusSpendingPaused />
      ) : (
        <ProfileStatusObjective />
      )}
    </div>
  )
}

ProfileStatus.propTypes = {
  className: PropTypes.string,
}

ProfileStatus.defaultProps = {
  className: '',
}

export default ProfileStatus
