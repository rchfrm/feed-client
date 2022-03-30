import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { updateArtist, getPreferencesObject } from '@/app/helpers/artistHelpers'

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
  updatePreferences: state.updatePreferences,
})

const ObjectiveSettingsSelector = ({
  name,
  optionValues,
  currentObjective,
}) => {
  const [selectOptions, setSelectOptions] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [objective, setObjective] = React.useState(currentObjective)
  const [error, setError] = React.useState(null)

  const { artist } = React.useContext(ArtistContext)
  const { postsPreferences, updatePreferences } = useControlsStore(getControlsStoreState)
  const { defaultLinkId } = postsPreferences

  React.useEffect(() => {
    const options = optionValues.map(({ name, value }) => ({
      name,
      value,
    }))

    setSelectOptions(options)
  }, [optionValues])

  const save = async ({ objective, platform }) => {
    setIsLoading(true)

    const { res: updatedArtist, error } = await updateArtist(artist, {
      objective,
      platform,
      ...(objective !== 'growth' && { platform: 'website' }),
      defaultLink: defaultLinkId,
    })

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    updatePreferences(getPreferencesObject(updatedArtist))

    // Update local state
    setObjective({
      objective: updatedArtist.preferences.optimization.objective,
      platform: updatedArtist.preferences.optimization.platform,
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
        selectedValue={objective[name]}
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
}

ObjectiveSettingsSelector.defaultProps = {
}

export default ObjectiveSettingsSelector
