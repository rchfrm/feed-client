import React from 'react'
import PropTypes from 'prop-types'

import { SwitchTransition, CSSTransition } from 'react-transition-group'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'
import InputCurrency from '@/elements/InputCurrency'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'
import { formatCurrency } from '@/helpers/utils'

const TargetingBudgetSetter = ({
  currency,
  minReccBudget,
  minHardBudget,
  initialBudget,
  targetingState,
  updateTargetingBudget,
  isSummaryVersion,
  mobileVersion,
}) => {
  // UPDATE TARGETING STATE when BUDGET changes
  const [budget, setBudget] = React.useState(targetingState.budget)
  React.useEffect(() => {
    if (typeof budget !== 'number') return
    updateTargetingBudget(budget)
  }, [budget, updateTargetingBudget])

  // GET SLIDER SETTINGS BASED ON MIN BUDGET
  const { sliderStep, sliderValueRange } = targetingHelpers.calcBudgetSliderConfig(minHardBudget)

  // FLIP
  // Show custom budget input if budget is higher than max slider value
  const showCustomInitially = budget > sliderValueRange[1]
  const [showCustomBudget, setShowCustomBudget] = React.useState(showCustomInitially)
  // CUSTOM INPUT
  const inputPlaceholder = `Min. rec. budget: ${formatCurrency(minReccBudget, currency)}`

  return (
    <>
      <div className="h-26">
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
                className={['pt-3 mb-0 w-full'].join(' ')}
                currency={currency}
              />
            ) : (
              <TargetingBudgetSlider
                sliderStep={sliderStep}
                sliderValueRange={sliderValueRange}
                mobileVersion={mobileVersion}
                isSummaryVersion={isSummaryVersion}
                budget={budget}
                minReccBudget={minReccBudget}
                initialBudget={initialBudget}
                onChange={(budget) => {
                  setBudget(budget)
                }}
              />
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>

      {/* TOGGLE CUSTOM BUDGET */}
      <p
        className={[
          'pt-3',
          isSummaryVersion ? 'text-left' : 'ml-1',
        ].join(' ')}
      >
        <a role="button" onClick={() => setShowCustomBudget(!showCustomBudget)}>
          <em>
            {showCustomBudget ? 'Budget Slider' : 'Custom Budget'}
          </em>
        </a>
      </p>
    </>
  )
}

TargetingBudgetSetter.propTypes = {
  currency: PropTypes.string,
  minReccBudget: PropTypes.number.isRequired,
  minHardBudget: PropTypes.number.isRequired,
  initialBudget: PropTypes.number.isRequired,
  targetingState: PropTypes.object.isRequired,
  updateTargetingBudget: PropTypes.func.isRequired,
  isSummaryVersion: PropTypes.bool,
  mobileVersion: PropTypes.bool,
}

TargetingBudgetSetter.defaultProps = {
  currency: '',
  isSummaryVersion: false,
  mobileVersion: false,
}


export default TargetingBudgetSetter
