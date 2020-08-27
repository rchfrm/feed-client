import React from 'react'
import PropTypes from 'prop-types'

const SliderMarker = ({
  sliderValueRange,
  markerValue,
  markerLabel,
  className,
  style,
}) => {
  const [min, max] = sliderValueRange
  const width = 2
  const leftPercent = ((markerValue - min) / (max - min)) * 100
  const left = `${leftPercent}%`
  return (
    <div
      className={[
        'absolute',
        '-mt-3',
        className,
      ].join(' ')}
      style={{
        ...style,
        top: 0,
        left,
        marginLeft: width * 1.5,
        transform: 'translateY(-45%)',
      }}
    >
      {/* LINE */}
      <div className="h-10 bg-green" style={{ width }} />
      {/* TEXT */}
      <p className="absolute top-0 left-0 mb-0 -mt-1 pl-2 text-sm whitespace-no-wrap">{markerLabel}</p>
    </div>
  )
}

SliderMarker.propTypes = {
  sliderValueRange: PropTypes.array.isRequired,
  markerValue: PropTypes.number.isRequired,
  markerLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

SliderMarker.defaultProps = {
  className: null,
  style: null,
}


export default SliderMarker
