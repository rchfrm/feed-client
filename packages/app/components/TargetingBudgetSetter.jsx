import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'
import FlipContainer from '@/elements/FlipContainer'
import InputCurrency from '@/elements/InputCurrency'

import { formatCurrency } from '@/helpers/utils'

const TargetingBudgetSetter = ({
  currency,
  minBudget,
  targetingState,
  setTargetingState,
  mobileVersion,
}) => {
  // FLIP
  const [showCustomBudget, setShowCustomBudget] = React.useState(false)

  // UPDATE TARGETING STATE when BUDGET changes
  const [budget, setBudget] = React.useState(targetingState.budget)
  React.useEffect(() => {
    if (typeof budget !== 'number') return
    setTargetingState((targetingState) => {
      return produce(targetingState, draftState => {
        draftState.budget = budget
      })
    })
  }, [budget, setTargetingState])

  const inputPlaceholder = `Minimum Budget ${formatCurrency(minBudget, currency)}`

  return (
    <div>
      {/* VIEW CONTAINER */}
      <FlipContainer
        isFlipped={showCustomBudget}
        rotationAxis="X"
        containerClass="h-32"
        // BUDGET SLIDER
        frontContent={(
          <TargetingBudgetSlider
            mobileVersion={mobileVersion}
            budget={budget}
            minBudget={targetingState.minBudget}
            onChange={(budget) => {
              setBudget(budget)
            }}
          />
        )}
        // BUDGET CUSTOM INPUT
        backContent={(
          <InputCurrency
            handleChange={(value) => {
              setBudget(value)
            }}
            placeholder={inputPlaceholder}
            name="Budget"
            label="Custom Budget"
            className={['w-full'].join(' ')}
            currency={currency}
          />
        )}
      />
      {/* TOGGLE CUSTOM BUDGET */}
      <p className="pt-8 text-right">
        <a role="button" onClick={() => setShowCustomBudget(!showCustomBudget)}>
          <em>
            {showCustomBudget ? 'Cancel' : 'Custom Budget'}
          </em>
        </a>
      </p>
    </div>
  )
}

TargetingBudgetSetter.propTypes = {
  currency: PropTypes.string,
  minBudget: PropTypes.number.isRequired,
  targetingState: PropTypes.object.isRequired,
  setTargetingState: PropTypes.func.isRequired,
  mobileVersion: PropTypes.bool,
}

TargetingBudgetSetter.defaultProps = {
  currency: '',
  mobileVersion: false,
}


export default TargetingBudgetSetter
