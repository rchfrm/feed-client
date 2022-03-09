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
  setValue,
  objective,
  platform,
  values,
}) => {
  const [selectOptions, setSelectOptions] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(name === 'objective' ? objective : platform)
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)
  const { updatePreferences } = useControlsStore(getControlsStoreState)

  React.useEffect(() => {
    const options = values.map(({ name, value }) => ({
      name,
      value,
    }))

    setSelectOptions(options)
  }, [values])

  const save = async (value) => {
    setIsLoading(true)

    const { res: artist, error } = await updateArtist(artistId, {
      [name]: value,
      ...(name === 'objective' ? { platform } : { objective }),
    })

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    updatePreferences({
      optimizationPreferences: {
        [name]: artist.preferences.optimization[name],
      },
    })

    setIsLoading(false)
  }

  const handleChange = (e) => {
    const { target: { value } } = e

    if (value === selectedValue) return

    // Update parent component state
    setValue(value)

    // Update local state
    setSelectedValue(value)
    save(value)
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
        selectedValue={selectedValue}
        options={selectOptions}
      />
    </div>
  )
}

ObjectiveSettingsSelector.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  objective: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
}

ObjectiveSettingsSelector.defaultProps = {
}

export default ObjectiveSettingsSelector
