import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { ArtistContext } from '@/contexts/ArtistContext'

import useCreateNewPixel from '@/app/hooks/useCreateNewPixel'

import {
  getArtistPixels,
  getCurrentPixelId,
  setPixel,
} from '@/app/helpers/settingsHelpers'

const PixelSelector = ({
  onSelect,
  onSuccess,
  onError,
  className,
  selectClassName,
}) => {
  const { artist, artistId, setArtist } = React.useContext(ArtistContext)

  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const [activePixelId, setActivePixelId] = React.useState(getCurrentPixelId(artist))

  // UPDATE ARTIST CONTEXT
  const updateArtistContext = (newIntegrations) => {
    setArtist({
      type: 'update-integrations',
      payload: {
        integrations: newIntegrations,
      },
    })
  }

  // OPEN NEW PIXEL MODAL
  const openNewPixelModal = useCreateNewPixel({
    artistId,
    onSave: (res) => {
      console.log('on save new pixel', res)
      setLoading(false)
    },
    onError: () => setLoading(false),
    onCancel: () => setLoading(false),
  })

  // LOAD AVAILABLE PIXELS
  const [availablePixels, setAvailablePixels] = React.useState([])
  useAsyncEffect(async (isMounted) => {
    if (!artistId) return
    const { res: pixels = [], error } = await getArtistPixels(artistId)
    if (!isMounted()) return
    setLoading(false)
    if (error) {
      const errorUpdated = { message: `Failled to fetch pixels: ${error.message}` }
      setError(errorUpdated)
      return
    }
    const availablePixels = pixels.map(({ name, id }) => { return { name, value: id } })
    setAvailablePixels(availablePixels)
  }, [artistId])

  // SELECT PIXEL
  const selectPixel = React.useCallback(async (pixelId) => {
    setLoading(true)
    onSelect(pixelId)
    const { newPixelId, newIntegrations, error } = await setPixel(artistId, pixelId)
    setLoading(false)
    if (error) {
      setError(error)
      onError(error)
      return
    }
    onSuccess(newPixelId)
    // Update in comp state
    setActivePixelId(newPixelId)
    // Update artist context
    updateArtistContext(newIntegrations)
    // Reset error
    setError(null)
  }, [artistId, onSelect, onError, onSuccess])

  // HANDLE CHANGE IN SELECT
  const handleChange = React.useCallback((e) => {
    const { target: { value } } = e
    // Do nothing if value is current value
    if (value === activePixelId) return
    // Handle adding NEW PIXEL
    if (value === '_new') {
      setLoading(true)
      openNewPixelModal()
      return
    }
    selectPixel(value)
  }, [selectPixel, activePixelId, openNewPixelModal])

  console.log('availablePixels', availablePixels)


  // CREATE SELECT OPTIONS
  const noPixelOptions = [
    {
      value: '_new',
      name: '+ Create a new pixel',
    },
    {
      value: '-1',
      name: 'Don\'t use a pixel',
    },
  ]
  const selectOptions = availablePixels.length ? [
    {
      type: 'group',
      name: 'Available pixels',
      options: availablePixels,

    },
    {
      type: 'group',
      name: 'Other options',
      options: noPixelOptions,
    },
  ] : noPixelOptions

  return (
    <div className={className}>
      {error && (
        <Error error={error} />
      )}
      <Select
        loading={loading}
        className={selectClassName}
        handleChange={handleChange}
        name="Choose link"
        options={selectOptions}
        placeholder={!activePixelId ? 'Choose a pixel to use' : null}
        selectedValue={activePixelId}
        version="box"
      />
    </div>
  )
}

PixelSelector.propTypes = {
  onSelect: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
}

PixelSelector.defaultProps = {
  onSelect: () => {},
  onSuccess: () => {},
  onError: () => {},
  className: null,
  selectClassName: null,
}

export default PixelSelector
