import React from 'react'
import PropTypes from 'prop-types'

import Slider from '@/elements/Slider'

const CboAgeSlider = ({ minAge, maxAge }) => {
  const lowestAge = 16
  const highestAge = 65
  return (
    <div className={['relative'].join(' ')}>
      <Slider
        valueRange={[lowestAge, highestAge]}
        defaultValue={[minAge, maxAge]}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={(state) => {
          console.log('state', state)
          return `Thumb value ${state.valueNow}`
        }}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        pearling
        minDistance={1}
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
      />
    </div>
  )
}

CboAgeSlider.propTypes = {
  minAge: PropTypes.number,
  maxAge: PropTypes.number,
}

CboAgeSlider.defaultProps = {
  minAge: 18,
  maxAge: 65,
}


export default CboAgeSlider
