import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { updateArtist, getPreferencesObject } from '@/app/helpers/artistHelpers'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  updatePreferences: state.updatePreferences,
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
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

  const { artist, setPostPreferences } = React.useContext(ArtistContext)
  const { updatePreferences, nestedLinks, updateLinks } = useControlsStore(getControlsStoreState)

  React.useEffect(() => {
    const options = optionValues.map(({ name, value }) => ({
      name,
      value,
    }))

    setSelectOptions(options)
  }, [optionValues])

  const save = async ({ objective, platform }) => {
    setIsLoading(true)

    const integrationLink = getLinkByPlatform(nestedLinks, platform)

    const { res: updatedArtist, error } = await updateArtist(artist, {
      objective,
      platform,
      ...(objective !== 'growth' && { platform: 'website' }),
      defaultLink: integrationLink.id,
    })

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    // Set the new link as the default link
    updateLinks('chooseNewDefaultLink', { newArtist: updatedArtist, newLink: integrationLink })

    // Update artist status
    setPostPreferences('default_link_id', integrationLink.id)

    // Update preferences object in controls store
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
