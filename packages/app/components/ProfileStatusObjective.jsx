import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import { getObjectiveString, getObjectiveColor } from '@/app/helpers/artistHelpers'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const ProfileStatusObjective = () => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const objectiveString = getObjectiveString(objective, platform)

  return (
    <div>
      Feed is working on:
      <span
        className="mb-0 border-2 border-solid rounded-full ml-1 py-2 px-3"
        style={{ borderColor: getObjectiveColor(objective, platform) }}
      >
        {objectiveString}
      </span>
    </div>
  )
}

ProfileStatusObjective.propTypes = {
}

ProfileStatusObjective.defaultProps = {
}

export default ProfileStatusObjective
