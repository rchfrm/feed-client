import React from 'react'
import PropTypes from 'prop-types'

import { SwitchTransition, CSSTransition } from 'react-transition-group'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'
import InputCurrency from '@/elements/InputCurrency'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const TargetingBudgetSetter = ({
  currency,
  currencyOffset,
  minBase,
  minReccBudget,
  minHardBudget,
  initialBudget,
  targetingState,
  updateTargetingBudget,
  isSummaryVersion,
  mobileVersion,
  showCustomBudget,
  setBudgetSlider,
}) => {
  // UPDATE TARGETING STATE when BUDGET changes
  const [budget, setBudget] = React.useState(targetingState.budget)
  React.useEffect(() => {
    if (typeof budget !== 'number') return
    updateTargetingBudget(budget)
  }, [budget, updateTargetingBudget])

  // GET SLIDER SETTINGS BASED ON MIN BUDGET
  const { sliderStep, sliderValueRange } = React.useMemo(() => {
    return targetingHelpers.calcBudgetSliderConfig(minBase, minHardBudget, initialBudget)
  }, [minBase, minHardBudget, initialBudget])

  return (
    <>
      <div>
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
                  const budget = value ? value * currencyOffset : minReccBudget
                  setBudget(budget)
                }}
                name="Budget"
                label={mobileVersion ? 'Custom Budget' : null}
                className={[
                  'mt-3 mb-5 w-full',
                  mobileVersion ? null : 'pt-5',
                ].join(' ')}
                currency={currency}
                autoFocus
              />
            ) : (
              <TargetingBudgetSlider
                sliderStep={sliderStep}
                sliderValueRange={sliderValueRange}
                mobileVersion={mobileVersion}
                isSummaryVersion={isSummaryVersion}
                minReccBudget={minReccBudget}
                initialBudget={initialBudget}
                currency={currency}
                currencyOffset={currencyOffset}
                onChange={(budget) => {
                  setBudget(budget)
                }}
                setBudgetSlider={setBudgetSlider}
              />
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  )
}

TargetingBudgetSetter.propTypes = {
  currency: PropTypes.string,
  currencyOffset: PropTypes.number,
  minBase: PropTypes.number,
  minReccBudget: PropTypes.number,
  minHardBudget: PropTypes.number,
  initialBudget: PropTypes.number.isRequired,
  targetingState: PropTypes.object.isRequired,
  updateTargetingBudget: PropTypes.func.isRequired,
  isSummaryVersion: PropTypes.bool,
  mobileVersion: PropTypes.bool,
  showCustomBudget: PropTypes.bool.isRequired,
  setBudgetSlider: PropTypes.func.isRequired,
}

TargetingBudgetSetter.defaultProps = {
  currency: 'GBP',
  currencyOffset: 1,
  minReccBudget: 0,
  minBase: 1,
  minHardBudget: 0,
  isSummaryVersion: false,
  mobileVersion: false,
}


export default TargetingBudgetSetter
