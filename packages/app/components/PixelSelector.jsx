import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import PixelCopier from '@/app/PixelCopier'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useCreateNewPixel from '@/app/hooks/useCreateNewPixel'

import {
  getArtistPixels,
  getCurrentPixelId,
  setPixel,
} from '@/app/helpers/settingsHelpers'

import { track } from '@/helpers/trackingHelpers'

const disabledPixelId = '-1'

const PixelSelector = ({
  onSelect,
  onSuccess,
  onError,
  errorFetching,
  setErrorFetching,
  trackLocation,
  className,
  selectClassName,
  updateParentPixel,
  shouldSaveOnChange,
  hasNoPixelOption,
  shouldShowPixelCopier,
}) => {
  const { artist, artistId, setArtist } = React.useContext(ArtistContext)

  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const [activePixelId, setActivePixelId] = React.useState(getCurrentPixelId(artist) || disabledPixelId)
  const [activePixelEmbed, setActivePixelEmbed] = React.useState('')

  // LOAD AVAILABLE PIXELS
  const [availablePixels, setAvailablePixels] = React.useState([])
  useAsyncEffect(async (isMounted) => {
    if (!artistId) {
      setLoading(false)
      return
    }
    const { res: pixels = [], error } = await getArtistPixels(artistId)
    if (!isMounted()) return
    setLoading(false)
    if (error) {
      const errorUpdated = { message: `Failed to fetch pixels: ${error.message}` }
      setError(errorUpdated)
      setErrorFetching(true)
      return
    }
    const availablePixels = pixels.map(({ name, id, code: embedCode }) => {
      return { name, value: id, id, embedCode }
    })
    setErrorFetching(false)
    setAvailablePixels(availablePixels)
  }, [artistId])

  React.useEffect(() => {
    if (!availablePixels.length) return

    if (!activePixelId) {
      setActivePixelId(availablePixels[0].value)
    }
  }, [activePixelId, setActivePixelId, availablePixels])

  // ON PIXEL UPDATE
  React.useEffect(() => {
    // Update pixel on parent state
    updateParentPixel(activePixelId)
    // Get embed code of active pixel
    const { embedCode } = availablePixels.find(({ id }) => id === activePixelId) || {}
    setActivePixelEmbed(embedCode)
  }, [activePixelId, updateParentPixel, availablePixels])

  // SELECT PIXEL
  const selectPixel = React.useCallback(async (pixelId) => {
    // Skip API request and only update parent pixel value
    if (!shouldSaveOnChange) {
      setActivePixelId(pixelId)
      return
    }
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
    setArtist({
      type: 'update-integrations',
      payload: {
        integrations: newIntegrations,
      },
    })
    // Reset error
    setError(null)
    // Track
    track('change_pixel', {
      location: trackLocation,
      pixelId,
      ...(pixelId === disabledPixelId && { disabled: true }),
    })
  }, [artistId, onSelect, onError, onSuccess, setArtist, trackLocation, shouldSaveOnChange])

  // ON CREATE NEW PIXEL
  const onCreateNewPixel = (pixel) => {
    const { id, name, code: embedCode } = pixel
    // Update list of available pixels
    setAvailablePixels((availablePixels) => {
      return [{ name, value: id, id, embedCode }, ...availablePixels]
    })
    // Set pixel on server
    selectPixel(id)
    // Track
    track('add_new_pixel', {
      location: trackLocation,
      pixelId: id,
    })
  }

  // OPEN CREATE PIXEL MODAL
  const openNewPixelModal = useCreateNewPixel({
    artistId,
    // Handle creation of new pixel
    onSave: (res) => {
      onCreateNewPixel(res)
    },
    onError: () => setLoading(false),
    onCancel: () => setLoading(false),
  })

  // HANDLE CHANGE IN SELECT
  const handleChange = React.useCallback((e) => {
    const { target: { value: pixelId } } = e
    // Do nothing if value is current value
    if (pixelId === activePixelId) return
    // Handle adding NEW PIXEL
    if (pixelId === '_new') {
      setLoading(true)
      openNewPixelModal()
      return
    }
    selectPixel(pixelId)
  }, [selectPixel, activePixelId, openNewPixelModal])

  // CREATE SELECT OPTIONS
  const noPixelOptions = []

  // Add "Don't use a pixel" option if hasNoPixelOption is true
  if (hasNoPixelOption) {
    noPixelOptions.push({
      value: disabledPixelId,
      name: 'Don\'t use a pixel',
    })
  }

  // Add "create new" option if there are no active pixels
  if (!availablePixels.length && !loading) {
    noPixelOptions.unshift({
      value: '_new',
      name: '+ Create a new pixel',
    })
  }

  const selectOptions = []

  // Add all available pixels to the select options if there are any
  if (availablePixels.length) {
    selectOptions.push({
      type: 'group',
      name: 'Available pixels',
      options: availablePixels,

    })
  }

  // Add all no pixel options to the select options if there are any
  if (noPixelOptions.length) {
    selectOptions.push({
      type: 'group',
      name: 'Other options',
      options: noPixelOptions,
    })
  }

  return (
    <div className={className}>
      {error && (
        <Error error={error} />
      )}
      {!errorFetching && (
        <Select
          loading={loading}
          className={selectClassName}
          handleChange={handleChange}
          name="Choose link"
          options={selectOptions}
          placeholder={!activePixelId || loading || (!hasNoPixelOption && activePixelId === '-1') ? 'Choose a pixel to use' : null}
          selectedValue={activePixelId}
          version="box"
        />
      )}
      {activePixelId && activePixelId !== disabledPixelId && shouldShowPixelCopier && (
        <PixelCopier
          pixelId={activePixelId}
          pixelEmbed={activePixelEmbed}
          isLoading={loading}
          trackLocation={trackLocation}
          className="-mt-2"
        />
      )}
    </div>
  )
}

PixelSelector.propTypes = {
  onSelect: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  trackLocation: PropTypes.string,
  errorFetching: PropTypes.bool,
  setErrorFetching: PropTypes.func,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
  updateParentPixel: PropTypes.func,
  shouldSaveOnChange: PropTypes.bool,
  hasNoPixelOption: PropTypes.bool,
  shouldShowPixelCopier: PropTypes.bool,
}

PixelSelector.defaultProps = {
  onSelect: () => {},
  onSuccess: () => {},
  onError: () => {},
  trackLocation: '',
  errorFetching: false,
  setErrorFetching: () => {},
  className: null,
  selectClassName: null,
  updateParentPixel: () => {},
  shouldSaveOnChange: true,
  hasNoPixelOption: true,
  shouldShowPixelCopier: true,
}

export default PixelSelector
