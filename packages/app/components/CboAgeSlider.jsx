import React from 'react'
import PropTypes from 'prop-types'

import Slider from '@/elements/Slider'

const CboAgeSlider = ({ minAge, maxAge, onChange }) => {
  const lowestAge = 16
  const highestAge = 65
  return (
    <Slider
      label="Age range"
      valueRange={[lowestAge, highestAge]}
      defaultValue={[minAge, maxAge]}
      thumbNames={['Lower age', 'Upper age']}
      pearling
      minDistance={1}
      className="horizontal-slider"
      thumbClassName="example-thumb"
      onChange={onChange}
    />
  )
}

CboAgeSlider.propTypes = {
  minAge: PropTypes.number,
  maxAge: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

CboAgeSlider.defaultProps = {
  minAge: 18,
  maxAge: 65,
}


export default CboAgeSlider
