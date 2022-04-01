import React from 'react'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import useControlsStore from '@/app/stores/controlsStore'

import { getLocalStorage } from '@/helpers/utils'

import copy from '@/app/copy/getStartedCopy'
import ArrowIcon from '@/icons/ArrowIcon'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

const getControlsStoreState = (state) => ({
  profileSetupStatus: state.profileSetupStatus,
  optimizationPreferences: state.optimizationPreferences,
})

const ProfileStatusIncomplete = () => {
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
    profileSetupStatus ? (
      <button onClick={goToGetStartedPage}>
        {profileSetupStatus === 'objective' ? 'Start' : 'Continue'} profile set-up:
        <span
          className={[
            'mb-0',
            'border-3',
            'border-solid',
            'border-redLight',
            'rounded-full',
            'inline-flex',
            'ml-2',
            'py-2',
            'px-3',
          ].join(' ')}
        >
          {copy.profileStatus(profileSetupStatus, objective, platform)}
          <span className="pl-2">
            <ArrowAltIcon direction="right" />
          </span>
        </span>
      </button>
    ) : (
      <button onClick={goToGetStartedPage}>
        <span
          className="mb-0 border-3 border-solid border-redLight rounded-full py-2 px-3"
        >
          Confirm profile set-up
        </span>
      </button>
    )
  )
}

ProfileStatusIncomplete.propTypes = {
}

ProfileStatusIncomplete.defaultProps = {
}

export default ProfileStatusIncomplete
