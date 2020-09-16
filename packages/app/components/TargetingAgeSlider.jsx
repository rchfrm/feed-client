import React from 'react'
import PropTypes from 'prop-types'

import TargetingSettingsHeader from '@/app/TargetingSettingsHeader'

import Slider from '@/elements/Slider'

const TargetingAgeSlider = ({ minAge, maxAge, onChange, className }) => {
  const lowestAge = 15
  const highestAge = 65

  const getLabel = (age) => {
    if (age === highestAge) return `${age}+`
    return age
  }

  const getLabelValue = React.useCallback((value) => {
    return getLabel(value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Aria label function
  const valueLabelFunction = React.useCallback((state) => {
    const [minAge, maxAge] = state.value
    return `Min age set to ${getLabel(minAge)}, max age set to ${getLabel(maxAge)}`
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <section>
      <TargetingSettingsHeader className="mb-10" header="Age Range" />
      <Slider
        containerClassName={className}
        valueRange={[lowestAge, highestAge]}
        value={[minAge, maxAge]}
        thumbName={['Lower age', 'Upper age']}
        pearling
        getLabelValue={getLabelValue}
        valueLabelFunction={valueLabelFunction}
        onChange={onChange}
      />
    </section>
  )
}

TargetingAgeSlider.propTypes = {
  minAge: PropTypes.number,
  maxAge: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

TargetingAgeSlider.defaultProps = {
  minAge: 18,
  maxAge: 65,
  className: null,
}


export default TargetingAgeSlider
