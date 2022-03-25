import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { getFacebookPixelEvents, updateFacebookPixelEvent } from '@/app/helpers/adDefaultsHelpers'
import { getCurrentPixelId } from '@/app/helpers/settingsHelpers'

const PixelEventSelector = ({
  pixelEvent,
  setPixelEvent,
  shouldSaveOnChange,
  onSuccess,
  className,
  label,
  disabled,
}) => {
  const [facebookPixelEventOptions, setFacebookPixelEventOptions] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const { artist, artistId } = React.useContext(ArtistContext)
  const pixelId = getCurrentPixelId(artist)

  // Get all Facebook Pixel Events on first load and convert them to the correct select options object shape
  useAsyncEffect(async (isMounted) => {
    if (!artistId) {
      setIsLoading(false)
      return
    }
    const { res: { event_total_counts: events } } = await getFacebookPixelEvents(artistId, pixelId)

    if (!isMounted()) {
      setIsLoading(false)
      return
    }

    const sortedEvents = events.sort((a, b) => b.count - a.count)

    const options = sortedEvents.map(({ value, count }) => ({
      name: `${value} (${count})`,
      value,
    }))

    setFacebookPixelEventOptions(options)
    setIsLoading(false)
  }, [])

  const updatePixelEvent = async (selectedOptionValue) => {
    setIsLoading(true)

    // Skip API request and only update parent call to action value
    if (!shouldSaveOnChange) {
      setPixelEvent(selectedOptionValue)
      setIsLoading(false)
      return
    }

    // Make API request
    const { res, error } = await updateFacebookPixelEvent(artistId, selectedOptionValue)

    // Handle error
    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    // Handle success
    onSuccess(res)
    setError(null)
    setIsLoading(false)
  }

  const handleSelect = (e) => {
    const { target: { value } } = e
    if (value === pixelEvent) return

    setPixelEvent(value)
    updatePixelEvent(value)
  }

  React.useEffect(() => {
    if (!pixelEvent) {
      setPixelEvent(facebookPixelEventOptions[0]?.value)
    }
  }, [pixelEvent, setPixelEvent, facebookPixelEventOptions])

  return (
    <div className={className}>
      {error && (
        <Error error={error} />
      )}
      <Select
        handleChange={handleSelect}
        name="facebook_pixel_event"
        loading={isLoading}
        label={label}
        placeholder="Pixel Event"
        selectedValue={pixelEvent}
        options={facebookPixelEventOptions}
        disabled={disabled}
      />
    </div>
  )
}

PixelEventSelector.propTypes = {
  pixelEvent: PropTypes.string,
  setPixelEvent: PropTypes.func.isRequired,
  shouldSaveOnChange: PropTypes.bool,
  onSuccess: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
}

PixelEventSelector.defaultProps = {
  pixelEvent: '',
  shouldSaveOnChange: false,
  onSuccess: () => {},
  className: '',
  label: '',
  disabled: false,
}

export default PixelEventSelector
