import React from 'react'
import PropTypes from 'prop-types'

import TargetingSectionHeader from '@/app/TargetingSectionHeader'

import Slider from '@/elements/SliderAlt'

const TargetingAgeSlider = ({ minAge, maxAge, onChange, className }) => {
  const lowestAge = 15
  const highestAge = 65

  const getLabel = (age) => {
    if (age === highestAge) return `${age}+`
    return age
  }

  // DEFINE START VALUE
  const startValues = React.useRef([minAge, maxAge])

  return (
    <section className={className}>
      <TargetingSectionHeader className="mb-10" header="Age Range" />
      <Slider
        containerClassName={className}
        valueRange={{
          min: lowestAge,
          max: highestAge,
        }}
        startValue={startValues.current}
        onChange={onChange}
        labelOptions={[
          {
            to: getLabel,
          },
          {
            to: getLabel,
          },
        ]}
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
