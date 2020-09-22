import React from 'react'
import PropTypes from 'prop-types'

const SliderGhost = ({
  sliderValueRange,
  markerValue,
  className,
  style,
}) => {
  const [min, max] = sliderValueRange
  const xPercent = -1000 + (((markerValue - min) / max) * 1000)
  const transform = `translateX(${xPercent}%)`

  return (
    <div className="noUi-origin -ghost" style={{ transform }}>
      <div
        className={['noUi-handle -ghost', className].join(' ')}
        style={{
          ...style,
        }}
      />
    </div>
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
