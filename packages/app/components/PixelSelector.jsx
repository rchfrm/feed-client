import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { ArtistContext } from '@/contexts/ArtistContext'

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
  const { artist, artistId } = React.useContext(ArtistContext)

  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  const [activePixelId, setActivePixelId] = React.useState(getCurrentPixelId(artist))

  // LOAD AVAILABLE PIXEL
  const [availablePixels, setAvailablePixels] = React.useState([])
  useAsyncEffect(async (isMounted) => {
    if (!artistId) return
    const { res, error } = await getArtistPixels(artistId)
    if (!isMounted()) return
    setLoading(false)
    if (error) {
      setError(error)
      return
    }
    console.log('res', res)
    setAvailablePixels(res)
  }, [artistId])

  // SET NEW PIXEL
  const setNewPixel = React.useCallback(async (pixelId) => {
    console.log('pixelId', pixelId)
    setLoading(true)
    onSelect(pixelId)
    const { res, error } = await setPixel(artistId, pixelId)
    setLoading(false)
    if (error) {
      setError(error)
      onError(error)
      return
    }
    console.log('res', res)
    const { pixelId: newPixelId } = res
    onSuccess(newPixelId)
    setActivePixelId(newPixelId)
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
      return
    }
    setNewPixel(value)
  }, [setNewPixel, activePixelId])

  console.log('availablePixels', availablePixels)

  const selectOptions = [
    {
      type: 'group',
      name: 'Available pixels',
      options: availablePixels,
    },
    {
      type: 'group',
      name: 'Other options',
      options: [
        {
          value: '_new',
          name: '+ Create a new pixel',
        },
        {
          value: '_none',
          name: 'Disable Pixel',
        },
      ],
    }]

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
