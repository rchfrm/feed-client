import React from 'react'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import useControlsStore from '@/app/stores/controlsStore'
import useBillingStore from '@/app/stores/billingStore'

import { getLocalStorage } from '@/helpers/utils'
import { profileStatus } from '@/app/helpers/artistHelpers'


import copy from '@/app/copy/getStartedCopy'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

const getControlsStoreState = (state) => ({
  profileSetupStatus: state.profileSetupStatus,
  optimizationPreferences: state.optimizationPreferences,
})

const getBillingStoreState = (state) => ({
  defaultPaymentMethod: state.defaultPaymentMethod,
})

const ProfileStatusIncomplete = () => {
  const { profileSetupStatus, optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { defaultPaymentMethod } = useBillingStore(getBillingStoreState)

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
    profileSetupStatus === profileStatus.confirmSetup ? (
      <button onClick={goToGetStartedPage}>
        <span
          className="mb-0 border-3 border-solid border-redLight rounded-full py-2 px-3"
        >
          Confirm profile set-up
        </span>
      </button>
    ) : (
      <button onClick={goToGetStartedPage}>
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
          {copy.profileStatus(profileSetupStatus, objective, platform, defaultPaymentMethod)}
          <span className="pl-2">
            <ArrowAltIcon direction="right" />
          </span>
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
