import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'
import useCheckObjectiveChangeStatus from '@/app/hooks/useCheckObjectiveChangeStatus'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { objectives } from '@/app/helpers/artistHelpers'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const ObjectiveSettingsObjectiveSelector = ({
  objective,
  setObjective,
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
  const name = 'objective'
  const isFirstRender = React.useRef(true)

  const { artist: { hasProPlan } } = React.useContext(ArtistContext)

  React.useEffect(() => {
    let options = objectives.map(({ name, value }) => ({
      name,
      value,
    }))

    if (!hasProPlan) {
      options = options.filter((option) => option.value !== 'sales')
    }

    setSelectOptions(options)
  }, [hasProPlan])

  const handleChange = (e) => {
    const { target: { value } } = e

    if (value === objective) return

    const newPlatform = value === 'growth' ? '' : 'website'

    setObjective(value)
    setPlatform(newPlatform)
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
  }, [objective])

  React.useEffect(() => {
    if (shouldRestoreObjective) {
      setObjective(optimizationPreferences.objective)
    }
  }, [shouldRestoreObjective, setShouldRestoreObjective, optimizationPreferences.objective, setObjective])

  return (
    <div>
      {error && (
        <Error error={error} />
      )}
      <Select
        loading={isLoading}
        handleChange={handleChange}
        name={name}
        selectedValue={objective}
        options={selectOptions}
      />
    </div>
  )
}

ObjectiveSettingsObjectiveSelector.propTypes = {
  objective: PropTypes.string.isRequired,
  setObjective: PropTypes.func.isRequired,
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

ObjectiveSettingsObjectiveSelector.defaultProps = {
  error: null,
}

export default ObjectiveSettingsObjectiveSelector
