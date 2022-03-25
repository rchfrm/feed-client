import React from 'react'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import useControlsStore from '@/app/stores/controlsStore'

import { getLocalStorage } from '@/helpers/utils'

import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  profileSetupStatus: state.profileSetupStatus,
  optimizationPreferences: state.optimizationPreferences,
})

const ProfileStatusSetupState = () => {
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
    <button
      onClick={goToGetStartedPage}
    >
      {profileSetupStatus === 'objective' ? 'Start' : 'Continue'} profile set-up:
      <span
        className="mb-0 border-2 border-solid border-black rounded-full ml-1 py-2 px-3"
      >
        {copy.profileStatus(profileSetupStatus, objective, platform)}
      </span>
    </button>
  )
}

ProfileStatusSetupState.propTypes = {
}

ProfileStatusSetupState.defaultProps = {
}

export default ProfileStatusSetupState
