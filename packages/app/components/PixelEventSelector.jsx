import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import Select from '@/elements/Select'

import { getFacebookPixelEvents } from '@/app/helpers/conversionsHelpers'

import useControlsStore from '@/app/stores/controlsStore'

const getControlsStoreState = (state) => ({
  facebookPixelEvent: state.conversionsPreferences.facebookPixelEvent,
})

const PixelEventSelector = ({ pixelEvent, setPixelEvent }) => {
  const { facebookPixelEvent } = useControlsStore(getControlsStoreState)
  const [facebookPixelEventOptions, setFacebookPixelEventOptions] = React.useState([])

  // Get all Facebook Pixel Events on first load and convert them to the correct select options object shape
  useAsyncEffect(async () => {
    const { res: events } = await getFacebookPixelEvents()
    const options = events.map(({ id, name }) => ({ name, value: id }))
    const selectedPixelEvent = options.find(event => event.value === facebookPixelEvent)
    setFacebookPixelEventOptions(options)
    setPixelEvent(selectedPixelEvent || options[0])
  }, [])

  const handleSelect = React.useCallback((e) => {
    const facebookPixelEventOption = facebookPixelEventOptions.find(({ value }) => value === e.target.value)
    // Set state in parent component
    setPixelEvent(facebookPixelEventOption)
  }, [facebookPixelEventOptions, setPixelEvent])

  return (
    <Select
      handleChange={handleSelect}
      name="facebook_pixel_event"
      label="Facebook Pixel Event"
      selectedValue={pixelEvent?.value}
      options={facebookPixelEventOptions}
    />
  )
}

PixelEventSelector.propTypes = {
  pixelEvent: PropTypes.object.isRequired,
  setPixelEvent: PropTypes.func.isRequired,
}

export default PixelEventSelector
