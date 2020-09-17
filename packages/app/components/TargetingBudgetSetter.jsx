import React from 'react'
import PropTypes from 'prop-types'

import { SwitchTransition, CSSTransition } from 'react-transition-group'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'
import InputCurrency from '@/elements/InputCurrency'

import { formatCurrency } from '@/helpers/utils'

const TargetingBudgetSetter = ({
  currency,
  minReccBudget,
  targetingState,
  updateTargetingBudget,
  mobileVersion,
}) => {
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
                  updateTargetingBudget(value || minReccBudget)
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
                budget={targetingState.budget}
                minReccBudget={targetingState.minReccBudget}
                onChange={(budget) => {
                  updateTargetingBudget(budget)
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
