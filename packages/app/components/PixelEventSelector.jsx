import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import Select from '@/elements/Select'

import { getFacebookPixelEvents } from '@/app/helpers/conversionsHelpers'

const PixelEventSelector = ({
  pixelEvent,
  setPixelEvent,
  className,
  disabled,
}) => {
  const [facebookPixelEventOptions, setFacebookPixelEventOptions] = React.useState([])

  // Get all Facebook Pixel Events on first load and convert them to the correct select options object shape
  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return
    const { res: events } = await getFacebookPixelEvents()
    const options = events.map(({ id, name }) => ({ name, value: id }))
    setFacebookPixelEventOptions(options)
  }, [])

  const handleSelect = React.useCallback((e) => {
    const facebookPixelEventOption = facebookPixelEventOptions.find(({ value }) => value === e.target.value)
    // Set state in parent component
    setPixelEvent(facebookPixelEventOption.value)
  }, [facebookPixelEventOptions, setPixelEvent])

  React.useEffect(() => {
    if (!pixelEvent) {
      setPixelEvent(facebookPixelEventOptions[0]?.value)
    }
  }, [pixelEvent, setPixelEvent, facebookPixelEventOptions])

  return (
    <div className={className}>
      <Select
        handleChange={handleSelect}
        name="facebook_pixel_event"
        label="Facebook Pixel Event"
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
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

PixelEventSelector.defaultProps = {
  pixelEvent: '',
  className: '',
  disabled: false,
}

export default PixelEventSelector
