import React from 'react'
import PropTypes from 'prop-types'

import useCheckObjectiveChangeStatus from '@/app/hooks/useCheckObjectiveChangeStatus'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { platforms } from '@/app/helpers/artistHelpers'

const ObjectiveSettingsSelector = ({
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

  const { getObjectiveChangeSteps } = useCheckObjectiveChangeStatus(objective, platform)
  const name = 'platform'

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
    if (shouldShowAlert) {
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
      // Restore previous platform
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
        selectedValue={platform}
        options={selectOptions}
      />
    </div>
  )
}

ObjectiveSettingsSelector.propTypes = {
  platform: PropTypes.string.isRequired,
  setObjectiveChangeSteps: PropTypes.func.isRequired,
  shouldRestoreObjective: PropTypes.bool.isRequired,
  setShouldRestoreObjective: PropTypes.func.isRequired,
}

ObjectiveSettingsSelector.defaultProps = {
}

export default ObjectiveSettingsSelector
