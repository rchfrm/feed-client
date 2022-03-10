import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { updateArtist } from '@/app/helpers/artistHelpers'

const getControlsStoreState = (state) => ({
  updatePreferences: state.updatePreferences,
})

const ObjectiveSettingsSelector = ({
  name,
  label,
  optionValues,
  currentObjective,
}) => {
  const [selectOptions, setSelectOptions] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [objective, setObjective] = React.useState(currentObjective)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)
  const { updatePreferences } = useControlsStore(getControlsStoreState)

  React.useEffect(() => {
    const options = optionValues.map(({ name, value }) => ({
      name,
      value,
    }))

    setSelectOptions(options)
  }, [optionValues])

  const save = async ({ objective, platform }) => {
    setIsLoading(true)

    const { res: artist, error } = await updateArtist(artistId, {
      objective,
      platform,
      ...(objective !== 'growth' && { platform: 'website' }),
    })

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    updatePreferences({
      optimizationPreferences: {
        objective: artist.preferences.optimization.objective,
        platform: artist.preferences.optimization.platform,
      },
    })

    setIsLoading(false)
  }

  const handleChange = (e) => {
    const { target: { value } } = e

    if (value === objective[name]) return

    const updatedObjective = {
      ...objective,
      [name]: value,
    }

    // Update local state
    setObjective(updatedObjective)

    save(updatedObjective)
  }

  return (
    <div>
      {error && (
        <Error error={error} />
      )}
      <Select
        loading={isLoading}
        handleChange={handleChange}
        name={name}
        label={label}
        selectedValue={objective[name]}
        options={selectOptions}
      />
    </div>
  )
}

ObjectiveSettingsSelector.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  optionValues: PropTypes.array.isRequired,
  currentObjective: PropTypes.shape({
    objective: PropTypes.string,
    platform: PropTypes.string,
  }).isRequired,
}

ObjectiveSettingsSelector.defaultProps = {
}

export default ObjectiveSettingsSelector
