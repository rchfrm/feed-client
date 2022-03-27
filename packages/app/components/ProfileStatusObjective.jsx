import React from 'react'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import useControlsStore from '@/app/stores/controlsStore'

import { getObjectiveString, getObjectiveColor } from '@/app/helpers/artistHelpers'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const ProfileStatusObjective = () => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const objectiveString = getObjectiveString(objective, platform)

  const goToControlsObjectivePage = () => {
    Router.push({
      pathname: ROUTES.CONTROLS_OBJECTIVE,
    })
  }

  return (
    <button
      onClick={goToControlsObjectivePage}
    >
      Feed is working on:
      <span
        className="mb-0 border-2 border-solid rounded-full ml-2 py-2 px-3"
        style={{ borderColor: getObjectiveColor(objective, platform) }}
      >
        {objectiveString}
      </span>
    </button>
  )
}

ProfileStatusObjective.propTypes = {
}

ProfileStatusObjective.defaultProps = {
}

export default ProfileStatusObjective
