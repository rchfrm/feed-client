import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import PauseIcon from '@/icons/PauseIcon'

import ProfileStatusMobileBar from '@/app/ProfileStatusMobileBar'

import brandColors from '@/constants/brandColors'

const ProfileStatusMobileSpendingPaused = ({ backgroundStyle }) => {
  const goToControlsPage = () => {
    Router.push({
      pathname: ROUTES.CONTROLS_BUDGET,
    })
  }

  return (
    <ProfileStatusMobileBar
      onClick={goToControlsPage}
      backgroundStyle={backgroundStyle}
      className="bg-red"
    >
      <PauseIcon color={brandColors.white} className="w-3 h-auto mr-2" />
      Spending paused,<span className="ml-1 underline">resume?</span>
    </ProfileStatusMobileBar>
  )
}

ProfileStatusMobileSpendingPaused.propTypes = {
  backgroundStyle: PropTypes.object,
}

ProfileStatusMobileSpendingPaused.defaultProps = {
  backgroundStyle: null,
}

export default ProfileStatusMobileSpendingPaused
