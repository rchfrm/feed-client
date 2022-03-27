import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import useControlsStore from '@/app/stores/controlsStore'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import ProfileStatusMobileBar from '@/app/ProfileStatusMobileBar'

import { getLocalStorage } from '@/helpers/utils'

import copy from '@/app/copy/getStartedCopy'
import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  profileSetupStatus: state.profileSetupStatus,
  optimizationPreferences: state.optimizationPreferences,
})

const ProfileStatusMobileIncomplete = ({ backgroundStyle }) => {
  const { profileSetupStatus, optimizationPreferences } = useControlsStore(getControlsStoreState)

  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { objective: storedObjective, platform: storedPlatform } = wizardState || {}

  const objective = optimizationPreferences.objective || storedObjective
  const platform = optimizationPreferences.platform || storedPlatform

  const goToGetStartedPage = () => {
    Router.push({
      pathname: ROUTES.GET_STARTED,
    })
  }

  return (
    <ProfileStatusMobileBar
      onClick={goToGetStartedPage}
      backgroundStyle={backgroundStyle}
      className="bg-insta"
    >
      {profileSetupStatus ? copy.profileStatus(profileSetupStatus, objective, platform) : 'Confirm profile setup'}
      <ArrowAltIcon
        className="ml-2 w-3"
        fill={brandColors.white}
        direction="right"
      />
    </ProfileStatusMobileBar>
  )
}

ProfileStatusMobileIncomplete.propTypes = {
  backgroundStyle: PropTypes.object,
}

ProfileStatusMobileIncomplete.defaultProps = {
  backgroundStyle: null,
}

export default ProfileStatusMobileIncomplete
