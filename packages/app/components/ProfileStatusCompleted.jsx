import React from 'react'
import PropTypes from 'prop-types'

import ProfileStatusSpendingPaused from '@/app/ProfileStatusSpendingPaused'
import ProfileStatusObjective from '@/app/ProfileStatusObjective'

import useControlsStore from '@/app/stores/controlsStore'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ProfileStatusCompleted = ({ className }) => {
  const { isSpendingPaused } = useControlsStore(getControlsStoreState)

  return (
    <div className={[className].join(' ')}>
      {isSpendingPaused ? (
        <ProfileStatusSpendingPaused />
      ) : (
        <ProfileStatusObjective />
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
