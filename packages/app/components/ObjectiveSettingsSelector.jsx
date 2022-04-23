import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'
import useCheckObjectiveChangeStatus from '@/app/hooks/useCheckObjectiveChangeStatus'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
  updatePreferences: state.updatePreferences,
  optimizationPreferences: state.optimizationPreferences,
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
})

const ObjectiveSettingsSelector = ({
  name,
  optionValues,
  currentObjective,
  shouldShowAlert,
  setCurrentObjective,
  setObjectiveChangeSteps,
  shouldRestoreObjective,
  setShouldRestoreObjective,
  save,
  isLoading,
  error,
}) => {
  const [selectOptions, setSelectOptions] = React.useState([])

  const { getObjectiveChangeSteps } = useCheckObjectiveChangeStatus(currentObjective, setCurrentObjective)
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)

  React.useEffect(() => {
    const options = optionValues.map(({ name, value }) => ({
      name,
      value,
    }))

    setSelectOptions(options)
  }, [optionValues])

  const handleChange = (e) => {
    const { target: { value } } = e

    if (value === currentObjective[name]) return

    let platform

    if (name === 'objective') {
      platform = value === 'growth' ? '' : 'website'
    }

    setCurrentObjective({
      ...currentObjective,
      [name]: value,
      ...(name === 'objective' && { platform }),
    })
  }

  React.useEffect(() => {
    if (shouldShowAlert) {
      return
    }

    const objectiveChangeSteps = getObjectiveChangeSteps()

    setObjectiveChangeSteps(objectiveChangeSteps)
    save(currentObjective, objectiveChangeSteps)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentObjective])

  React.useEffect(() => {
    if (shouldRestoreObjective) {
      setCurrentObjective({
        objective: optimizationPreferences.objective,
        platform: optimizationPreferences.platform,
      })

      setShouldRestoreObjective(false)
    }
  }, [shouldRestoreObjective, optimizationPreferences.objective, optimizationPreferences.platform, setShouldRestoreObjective, setCurrentObjective])

  return (
    <div>
      {error && (
        <Error error={error} />
      )}
      <Select
        loading={isLoading}
        handleChange={handleChange}
        name={name}
        selectedValue={currentObjective[name]}
        options={selectOptions}
      />
    </div>
  )
}

ObjectiveSettingsSelector.propTypes = {
  name: PropTypes.string.isRequired,
  optionValues: PropTypes.array.isRequired,
  currentObjective: PropTypes.shape({
    objective: PropTypes.string,
    platform: PropTypes.string,
  }).isRequired,
  setObjectiveChangeSteps: PropTypes.func.isRequired,
  shouldRestoreObjective: PropTypes.bool.isRequired,
  setShouldRestoreObjective: PropTypes.func.isRequired,
}

ObjectiveSettingsSelector.defaultProps = {
}

export default ObjectiveSettingsSelector
