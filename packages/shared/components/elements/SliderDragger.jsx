import React from 'react'
import PropTypes from 'prop-types'

const SliderDragger = ({ isMarker, className, style }) => {
  return (
    <div
      className={[
        'h-6 w-6',
        '-mt-1',
        'mx-auto rounded-full',
        isMarker ? 'border-solid border-green border-2' : 'bg-green',
        isMarker ? 'z0' : null,
        className,
      ].join(' ')}
      style={{ ...style, transform: 'translateY(-18%)', cursor: 'grab' }}
    />
  )
}

SliderDragger.propTypes = {
  isMarker: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

SliderDragger.defaultProps = {
  isMarker: false,
  className: null,
  style: {},
}


export default SliderDragger
