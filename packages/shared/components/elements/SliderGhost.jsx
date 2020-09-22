import React from 'react'
import PropTypes from 'prop-types'

import SliderDragger from '@/elements/SliderDragger'

const SliderGhost = ({
  sliderValueRange,
  markerValue,
  className,
  style,
}) => {
  const [min, max] = sliderValueRange
  const leftPercent = ((markerValue - min) / (max - min)) * 100
  const left = `${leftPercent}%`

  return (
    <div
      className={['noUi-handle -ghost', className].join(' ')}
      style={{
        ...style,
        left,
      }}
    />
  )
}

SliderGhost.propTypes = {
  sliderValueRange: PropTypes.array.isRequired,
  markerValue: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

SliderGhost.defaultProps = {
  className: null,
  style: {},
}


export default SliderGhost
