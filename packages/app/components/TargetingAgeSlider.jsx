import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import TargetingSectionHeader from '@/app/TargetingSectionHeader'

import Slider from '@/elements/Slider'

const TargetingAgeSlider = ({ ageMin, ageMax, setTargetingState, className }) => {
  const lowestAge = 18
  const highestAge = 65

  const getLabel = (age) => {
    if (age === highestAge) return `${age}+`
    return age
  }

  // DEFINE START VALUE
  const startValues = React.useRef([ageMin, ageMax])

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
        ghosts={startValues.current}
        onChange={({ values }) => {
          const [ageMin, ageMax] = values
          setTargetingState((targetingState) => {
            return produce(targetingState, draftState => {
              draftState.age_min = ageMin
              draftState.age_max = ageMax
            })
          })
        }}
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
  ageMin: PropTypes.number,
  ageMax: PropTypes.number,
  setTargetingState: PropTypes.func.isRequired,
  className: PropTypes.string,
}

TargetingAgeSlider.defaultProps = {
  ageMin: 18,
  ageMax: 65,
  className: null,
}


export default TargetingAgeSlider
