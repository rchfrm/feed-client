import React from 'react'
import PropTypes from 'prop-types'

import PixelEventSelector from '@/app/PixelEventSelector'

const AdDefaultsPixelSelector = ({
  facebookPixelEvent,
  updatePreferences,
  className,
}) => {
  const [pixelEvent, setPixelEvent] = React.useState(facebookPixelEvent)

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
      />
    </div>
  )
}

AdDefaultsPixelSelector.propTypes = {
  className: PropTypes.string,
}

AdDefaultsPixelSelector.defaultProps = {
  className: null,
}

export default AdDefaultsPixelSelector
