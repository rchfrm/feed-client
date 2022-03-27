import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import ProfileStatusMobileSpendingPaused from '@/app/ProfileStatusMobileSpendingPaused'
import ProfileStatusMobileObjective from '@/app/ProfileStatusMobileObjective'

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const ProfileStatusMobileCompleted = ({ backgroundStyle }) => {
  const { isSpendingPaused } = useControlsStore(getControlsStoreState)

  return (
    isSpendingPaused ? (
      <ProfileStatusMobileSpendingPaused backgroundStyle={backgroundStyle} />
    ) : (
      <ProfileStatusMobileObjective backgroundStyle={backgroundStyle} />
    )
  )
}

ProfileStatusMobileCompleted.propTypes = {
  backgroundStyle: PropTypes.object,
}

ProfileStatusMobileCompleted.defaultProps = {
  backgroundStyle: null,
}

export default ProfileStatusMobileCompleted
