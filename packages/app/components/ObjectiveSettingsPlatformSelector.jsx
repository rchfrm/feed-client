import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'
import useCheckObjectiveChangeStatus from '@/app/hooks/useCheckObjectiveChangeStatus'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { platforms } from '@/app/helpers/artistHelpers'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const ObjectiveSettingsPlatformSelector = ({
  objective,
  platform,
  setPlatform,
  setType,
  shouldShowAlert,
  setObjectiveChangeSteps,
  shouldRestoreObjective,
  setShouldRestoreObjective,
  save,
  isLoading,
  error,
}) => {
  const [selectOptions, setSelectOptions] = React.useState([])

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { getObjectiveChangeSteps } = useCheckObjectiveChangeStatus(objective, platform)
  const name = 'platform'
  const isFirstRender = React.useRef(true)

  React.useEffect(() => {
    const options = platforms.map(({ name, value }) => ({
      name,
      value,
    }))

    setSelectOptions(options)
  }, [])

  const handleChange = (e) => {
    const { target: { value } } = e

    if (value === platform) return

    setPlatform(value)
  }

  React.useEffect(() => {
    if (shouldShowAlert) return

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const objectiveChangeSteps = getObjectiveChangeSteps()

    setObjectiveChangeSteps(objectiveChangeSteps)
    setType(name)
    save({ objective, platform }, objectiveChangeSteps)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform])

  React.useEffect(() => {
    if (shouldRestoreObjective) {
      setPlatform(optimizationPreferences.platform)
    }
  }, [shouldRestoreObjective, setShouldRestoreObjective, optimizationPreferences.platform, setPlatform])

  return (
    <div>
      {error && (
        <Error error={error} />
      )}
      <Select
        loading={isLoading}
        handleChange={handleChange}
        name={name}
        selectedValue={platform}
        options={selectOptions}
      />
    </div>
  )
}

ObjectiveSettingsPlatformSelector.propTypes = {
  objective: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  setPlatform: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  shouldShowAlert: PropTypes.bool.isRequired,
  setObjectiveChangeSteps: PropTypes.func.isRequired,
  shouldRestoreObjective: PropTypes.bool.isRequired,
  setShouldRestoreObjective: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
}

ObjectiveSettingsPlatformSelector.defaultProps = {
  error: null,
}

export default ObjectiveSettingsPlatformSelector
