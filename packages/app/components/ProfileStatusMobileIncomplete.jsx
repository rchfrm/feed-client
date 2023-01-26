import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import useControlsStore from '@/app/stores/controlsStore'

import ArrowIcon from '@/icons/ArrowIcon'

import ProfileStatusMobileBar from '@/app/ProfileStatusMobileBar'

import { getLocalStorage } from '@/helpers/utils'
import { profileStatus } from '@/app/helpers/artistHelpers'

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
      {profileSetupStatus === profileStatus.confirmSetup ? 'Confirm profile setup' : copy.profileStatus(profileSetupStatus, objective, platform)}
      <ArrowIcon
        className="ml-2 w-3"
        fill={brandColors.offwhite}
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
