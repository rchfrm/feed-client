import React from 'react'
import PropTypes from 'prop-types'

import FadeInOut from '@/elements/FadeInOut'

const SliderMarker = ({
  sliderValueRange,
  markerValue,
  markerLabel,
  hideText,
  className,
  style,
}) => {
  const [min, max] = sliderValueRange
  const width = 2
  const leftPercent = ((markerValue - min) / (max - min)) * 100
  const left = `${leftPercent}%`

  return (
    <FadeInOut
      show
      unmountOnExit
    >
      <div
        className={[
          'absolute',
          'w-8 -ml-3',
          'mb-2',
          className,
        ].join(' ')}
        style={{
          ...style,
          bottom: '0px',
          left,
          opacity: 0,
        }}
      >
        {/* LINE */}
        <div className="h-10 bg-green mx-auto" style={{ width }} />
        {/* TEXT */}
        <p
          className="absolute top-0 left-0 mb-0 -mt-1 pl-6 text-sm whitespace-nowrap"
          style={hideText ? { opacity: 0 } : null}
        >
          {markerLabel}
        </p>
      </div>
    </FadeInOut>
  )
}

SliderMarker.propTypes = {
  sliderValueRange: PropTypes.array.isRequired,
  markerValue: PropTypes.number.isRequired,
  markerLabel: PropTypes.string.isRequired,
  hideText: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

SliderMarker.defaultProps = {
  hideText: false,
  className: null,
  style: null,
}


export default SliderMarker
