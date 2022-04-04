import React from 'react'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import useControlsStore from '@/app/stores/controlsStore'

import { getObjectiveString } from '@/app/helpers/artistHelpers'
import PlayIcon from '@/icons/PlayIcon'

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
      <span
        className={[
          'mb-0',
          'border-3',
          'border-green',
          'border-solid',
          'rounded-full',
          'inline-flex',
          'items-center',
          'ml-2',
          'py-2',
          'px-3',
        ].join(' ')}
      >
        <span className="pr-2"><PlayIcon className={['h-4', 'w-auto'].join(' ')} /></span>
        Driving {objectiveString}
      </span>
    </button>
  )
}

ProfileStatusObjective.propTypes = {
}

ProfileStatusObjective.defaultProps = {
}

export default ProfileStatusObjective
