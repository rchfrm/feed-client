import React from 'react'
import PropTypes from 'prop-types'

import Slider from '@/elements/Slider'

const CboAgeSlider = ({ minAge, maxAge, onChange }) => {
  const lowestAge = 16
  const highestAge = 65

  const getLabel = (age) => {
    if (age === highestAge) return `${age}+`
    return age
  }

  const getLabelValue = React.useCallback((value) => {
    return getLabel(value)
  }, [])

  // Aria label function
  const valueLabelFunction = React.useCallback((state) => {
    const [minAge, maxAge] = state.value
    return `Min age set to ${getLabel(minAge)}, max age set to ${getLabel(maxAge)}`
  }, [])


  return (
    <Slider
      label="Age range"
      valueRange={[lowestAge, highestAge]}
      defaultValue={[minAge, maxAge]}
      thumbName={['Lower age', 'Upper age']}
      pearling
      getLabelValue={getLabelValue}
      valueLabelFunction={valueLabelFunction}
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
