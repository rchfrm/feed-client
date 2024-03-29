import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import { SwitchTransition, CSSTransition } from 'react-transition-group'

import TargetingDailyBudgetSlider from '@/app/TargetingDailyBudgetSlider'
import TargetingDailyBudgetSuggestionButtons from '@/app/TargetingDailyBudgetSuggestionButtons'
import InputCurrency from '@/elements/InputCurrency'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const TargetingDailyBudgetSetter = ({
  budget,
  setBudget,
  currency,
  currencyOffset,
  minBase,
  minReccBudget,
  minHardBudget,
  initialBudget,
  budgetSuggestions,
  updateTargetingBudget,
  isSummaryVersion,
  mobileVersion,
  showCustomBudget,
  setBudgetSlider,
  shouldShowError,
  errorMessage,
  onBudgetSuggestionClick,
}) => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences

  React.useEffect(() => {
    if (typeof budget !== 'number') return
    updateTargetingBudget(budget)
  }, [budget, updateTargetingBudget])

  // GET SLIDER SETTINGS BASED ON MIN BUDGET
  const { sliderStep, sliderValueRange } = React.useMemo(() => {
    return targetingHelpers.calcBudgetSliderConfig(minBase, minHardBudget, initialBudget, objective)
  }, [minBase, minHardBudget, initialBudget, objective])

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
                  'mt-3 mb-0.5 w-full',
                ].join(' ')}
                currency={currency}
                autoFocus
              />
            ) : (
              <>
                <TargetingDailyBudgetSlider
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
                  shouldShowError={shouldShowError}
                  errorMessage={errorMessage}
                />
                {budgetSuggestions && (
                  <TargetingDailyBudgetSuggestionButtons
                    budgetSuggestions={budgetSuggestions}
                    sliderValueRange={sliderValueRange}
                    setBudget={setBudget}
                    onBudgetSuggestionClick={onBudgetSuggestionClick}
                  />
                )}
              </>
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  )
}

TargetingDailyBudgetSetter.propTypes = {
  budget: PropTypes.number,
  setBudget: PropTypes.func,
  currency: PropTypes.string,
  currencyOffset: PropTypes.number,
  minBase: PropTypes.number,
  minReccBudget: PropTypes.number,
  minHardBudget: PropTypes.number,
  initialBudget: PropTypes.number.isRequired,
  budgetSuggestions: PropTypes.array,
  updateTargetingBudget: PropTypes.func.isRequired,
  isSummaryVersion: PropTypes.bool,
  mobileVersion: PropTypes.bool,
  showCustomBudget: PropTypes.bool.isRequired,
  setBudgetSlider: PropTypes.func.isRequired,
  onBudgetSuggestionClick: PropTypes.func,
}

TargetingDailyBudgetSetter.defaultProps = {
  budget: 0,
  setBudget: () => {},
  currency: 'GBP',
  currencyOffset: 1,
  minReccBudget: 0,
  minBase: 1,
  minHardBudget: 0,
  budgetSuggestions: null,
  isSummaryVersion: false,
  mobileVersion: false,
  onBudgetSuggestionClick: () => {},
}

export default TargetingDailyBudgetSetter
