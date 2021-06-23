import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import Select from '@/elements/Select'

import { getFacebookPixelEvents } from '@/app/helpers/conversionsHelpers'

import useControlsStore from '@/app/stores/controlsStore'

const getControlsStoreState = (state) => ({
  facebookPixelEvent: state.conversionsPreferences.facebookPixelEvent,
})

const PixelEventSelector = ({
  pixelEvent,
  setPixelEvent,
  className,
}) => {
  const { facebookPixelEvent: currentFacebookPixelEvent } = useControlsStore(getControlsStoreState)
  const [facebookPixelEventOptions, setFacebookPixelEventOptions] = React.useState([])

  // Get all Facebook Pixel Events on first load and convert them to the correct select options object shape
  useAsyncEffect(async () => {
    const { res: events } = await getFacebookPixelEvents()
    const options = events.map(({ id, name }) => ({ name, value: id }))
    const selectedPixelEvent = options.find(event => event.value === currentFacebookPixelEvent)
    setFacebookPixelEventOptions(options)
    setPixelEvent(selectedPixelEvent || options[0])
  }, [])

  const handleSelect = React.useCallback((e) => {
    const facebookPixelEventOption = facebookPixelEventOptions.find(({ value }) => value === e.target.value)
    // Set state in parent component
    setPixelEvent(facebookPixelEventOption)
  }, [facebookPixelEventOptions, setPixelEvent])

  return (
    <div className={className}>
      <Select
        handleChange={handleSelect}
        name="facebook_pixel_event"
        label="Facebook Pixel Event"
        selectedValue={pixelEvent?.value}
        options={facebookPixelEventOptions}
      />
    </div>
  )
}

PixelEventSelector.propTypes = {
  pixelEvent: PropTypes.object,
  setPixelEvent: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PixelEventSelector.defaultProps = {
  pixelEvent: null,
  className: '',
}

export default PixelEventSelector
