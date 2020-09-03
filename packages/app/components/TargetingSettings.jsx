import React from 'react'
// import PropTypes from 'prop-types'

import produce from 'immer'

import TargetingAgeSlider from '@/app/TargetingAgeSlider'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingSettings = () => {
  const {
    targetingState,
    setTargetingState,
    setCurrentView,
  } = React.useContext(TargetingContext)

  return (
    <div>
      <button
        className="px-10 py-4 bg-black text-white mb-10"
        onClick={() => {
          setCurrentView('summary')
        }}
      >
        BACK
      </button>
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
