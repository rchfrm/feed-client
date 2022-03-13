import React from 'react'
import PropTypes from 'prop-types'

import PixelEventSelector from '@/app/PixelEventSelector'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'

import copy from '@/app/copy/controlsPageCopy'

const AdDefaultsPixelSelector = ({
  facebookPixelEvent,
  updatePreferences,
  className,
}) => {
  const [pixelEvent, setPixelEvent] = React.useState(facebookPixelEvent || '')

  const handleSuccess = ({ preferences }) => {
    const { conversions: { facebook_pixel_event: facebookPixelEvent } } = preferences

    setPixelEvent(facebookPixelEvent)

    // Update store value
    updatePreferences({
      conversionsPreferences: {
        facebookPixelEvent,
      },
    })
  }

  return (
    <div
      className={[
        'relative pr-3',
        className,
      ].join(' ')}
    >
      <PixelEventSelector
        pixelEvent={pixelEvent}
        setPixelEvent={setPixelEvent}
        onSuccess={handleSuccess}
        shouldSaveOnChange
        className="mb-14"
      />
      <ControlsSettingsSectionFooter copy={copy.facebookPixelEventFooter} className="text-insta" />
    </div>
  )
}

AdDefaultsPixelSelector.propTypes = {
  facebookPixelEvent: PropTypes.string,
  updatePreferences: PropTypes.func.isRequired,
  className: PropTypes.string,
}

AdDefaultsPixelSelector.defaultProps = {
  facebookPixelEvent: '',
  className: null,
}

export default AdDefaultsPixelSelector
