import React from 'react'
import PropTypes from 'prop-types'

import { SwitchTransition, CSSTransition } from 'react-transition-group'

import produce from 'immer'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'
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
    <>
      <div className="h-32">
        <SwitchTransition>
          <CSSTransition
            key={showCustomBudget}
            addEndListener={(node, done) => {
              node.addEventListener('transitionend', () => {
                done()
              }, false)
            }}
            classNames="fade"
          >
            {showCustomBudget ? (
              <InputCurrency
                handleChange={(value) => {
                  console.log('value', value)
                  setBudget(value || minBudget)
                }}
                placeholder={inputPlaceholder}
                name="Budget"
                label="Custom Budget"
                className={['w-full'].join(' ')}
                currency={currency}
              />
            ) : (
              <TargetingBudgetSlider
                mobileVersion={mobileVersion}
                budget={budget}
                minBudget={targetingState.minBudget}
                onChange={(budget) => {
                  setBudget(budget)
                }}
              />
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>

      {/* TOGGLE CUSTOM BUDGET */}
      <p className="pt-8 text-right">
        <a role="button" onClick={() => setShowCustomBudget(!showCustomBudget)}>
          <em>
            {showCustomBudget ? 'Cancel' : 'Custom Budget'}
          </em>
        </a>
      </p>
    </>
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
