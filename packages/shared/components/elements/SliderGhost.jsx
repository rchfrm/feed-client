import React from 'react'
import PropTypes from 'prop-types'

const SliderGhost = ({
  markerPositionPercent,
  className,
  style,
}) => {
  if (markerPositionPercent === null) return null
  const xPercent = 1000 - ((markerPositionPercent / 100) * 1000)
  const transform = `translateX(${-xPercent}%)`

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
  markerPositionPercent: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
}

SliderGhost.defaultProps = {
  markerPositionPercent: null,
  className: null,
  style: {},
}


export default SliderGhost
