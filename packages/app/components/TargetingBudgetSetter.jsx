import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import FlipContainer from '@/elements/FlipContainer'
import Input from '@/elements/Input'

import { formatCurrency } from '@/helpers/utils'

const TargetingBudgetSetter = ({
  currency,
  minBudget,
  setTargetingState,
}) => {
  // FLIP
  const [showCustomBudget, setShowCustomBudget] = React.useState(false)

  // UPDATE TARGETING STATE when BUDGET changes
  const [budget, setBudget] = React.useState('')
  React.useEffect(() => {
    if (typeof budget !== 'number') return
    setTargetingState((targetingState) => {
      return produce(targetingState, draftState => {
        draftState.budget = budget
      })
    })
  }, [budget, setTargetingState])

  console.log('currency', currency)

  const inputPlaceholder = `Minimum Budget ${formatCurrency(minBudget, currency)}`

  return (
    <div>
      {/* VIEW CONTAINER */}
      <FlipContainer
        isFlipped={showCustomBudget}
        rotationAxis="X"
        containerClass="h-20"
        // BUDGET SLIDER
        frontContent={(
          <div className="h-20 w-full bg-grey-1">Budget slider</div>
        )}
        // BUDGET CUSTOM INPUT
        backContent={(
          <Input
            value={budget}
            updateValue={setBudget}
            placeholder={inputPlaceholder}
            name="Budget"
            label="Custom Budget"
            type="number"
            className="w-full"
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
  setTargetingState: PropTypes.func.isRequired,
}

TargetingBudgetSetter.defaultProps = {
  currency: '',
}


export default TargetingBudgetSetter
