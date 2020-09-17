import React from 'react'
import PropTypes from 'prop-types'

import { SwitchTransition, CSSTransition } from 'react-transition-group'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'
import InputCurrency from '@/elements/InputCurrency'

import { formatCurrency } from '@/helpers/utils'

const TargetingBudgetSetter = ({
  currency,
  minReccBudget,
  minHardBudget,
  targetingState,
  updateTargetingBudget,
  mobileVersion,
}) => {
  // UPDATE TARGETING STATE when BUDGET changes
  const [budget, setBudget] = React.useState(targetingState.budget)
  React.useEffect(() => {
    if (typeof budget !== 'number') return
    updateTargetingBudget(budget)
  }, [budget, updateTargetingBudget])

  // FLIP
  const [showCustomBudget, setShowCustomBudget] = React.useState(false)

  const inputPlaceholder = `Minimum Budget ${formatCurrency(minReccBudget, currency)}`

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
                  setBudget(value || minReccBudget)
                }}
                placeholder={inputPlaceholder}
                name="Budget"
                label={mobileVersion ? 'Custom Budget' : null}
                className={['w-full'].join(' ')}
                currency={currency}
              />
            ) : (
              <TargetingBudgetSlider
                mobileVersion={mobileVersion}
                budget={budget}
                minHardBudget={minHardBudget}
                minReccBudget={targetingState.minReccBudget}
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
  minReccBudget: PropTypes.number.isRequired,
  targetingState: PropTypes.object.isRequired,
  updateTargetingBudget: PropTypes.func.isRequired,
  mobileVersion: PropTypes.bool,
}

TargetingBudgetSetter.defaultProps = {
  currency: '',
  mobileVersion: false,
}


export default TargetingBudgetSetter
