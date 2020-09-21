import React from 'react'
import PropTypes from 'prop-types'

const SliderDragger = ({ isMarker }) => {
  return (
    <div
      className={[
        'h-6 w-6',
        '-mt-1',
        'mx-auto rounded-full',
        !isMarker ? 'bg-green' : null,
      ].join(' ')}
      style={{ transform: 'translateY(-20%)', cursor: 'grab' }}
    />
  )
}

SliderDragger.propTypes = {
  isMarker: PropTypes.bool,
}

SliderDragger.defaultProps = {
  isMarker: false,
}


export default SliderDragger
