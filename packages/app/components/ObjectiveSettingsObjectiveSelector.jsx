import React from 'react'
import PropTypes from 'prop-types'

import useCheckObjectiveChangeStatus from '@/app/hooks/useCheckObjectiveChangeStatus'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { objectives } from '@/app/helpers/artistHelpers'

const ObjectiveSettingsSelector = ({
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

  const { getObjectiveChangeSteps } = useCheckObjectiveChangeStatus(objective, platform)
  const name = 'objective'

  React.useEffect(() => {
    const options = objectives.map(({ name, value }) => ({
      name,
      value,
    }))

    setSelectOptions(options)
  }, [])

  const handleChange = (e) => {
    const { target: { value } } = e

    if (value === objective) return

    const newPlatform = value === 'growth' ? '' : 'website'

    setObjective(value)
    setPlatform(newPlatform)
  }

  React.useEffect(() => {
    if (shouldShowAlert) {
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
      // Restore previous objective
      setShouldRestoreObjective(false)
    }
  }, [shouldRestoreObjective, setShouldRestoreObjective])

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

ObjectiveSettingsSelector.propTypes = {
  objective: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  setObjectiveChangeSteps: PropTypes.func.isRequired,
  shouldRestoreObjective: PropTypes.bool.isRequired,
  setShouldRestoreObjective: PropTypes.func.isRequired,
}

ObjectiveSettingsSelector.defaultProps = {
}

export default ObjectiveSettingsSelector
