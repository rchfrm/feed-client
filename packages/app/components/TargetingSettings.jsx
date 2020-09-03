import React from 'react'
// import PropTypes from 'prop-types'

import produce from 'immer'

import TargetingAgeSlider from '@/app/TargetingAgeSlider'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingSettings = () => {
  const {
    targetingState,
    setTargetingState,
  } = React.useContext(TargetingContext)

  return (
    <div>
      <TargetingAgeSlider
        minAge={targetingState.minAge}
        maxAge={targetingState.maxAge}
        onChange={([minAge, maxAge]) => {
          setTargetingState((targetingState) => {
            return produce(targetingState, draftState => {
              draftState.minAge = minAge
              draftState.maxAge = maxAge
            })
          })
        }}
      />
    </div>
  )
}

TargetingSettings.propTypes = {

}

export default TargetingSettings
