import React from 'react'
import PropTypes from 'prop-types'

import { SwitchTransition, CSSTransition } from 'react-transition-group'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'
import InputCurrency from '@/elements/InputCurrency'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'
import { formatCurrency } from '@/helpers/utils'

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

  // CUSTOM INPUT
  const inputPlaceholder = `Suggested min: ${formatCurrency((minReccBudget / currencyOffset), currency)}`

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
                  const budget = value ? value * currencyOffset : minReccBudget
                  setBudget(budget)
                }}
                placeholder={inputPlaceholder}
                name="Budget"
                label={mobileVersion ? 'Custom Budget' : null}
                className={[
                  'mb-0 w-full',
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
  minBase: PropTypes.number.isRequired,
  minReccBudget: PropTypes.number.isRequired,
  minHardBudget: PropTypes.number.isRequired,
  initialBudget: PropTypes.number.isRequired,
  targetingState: PropTypes.object.isRequired,
  updateTargetingBudget: PropTypes.func.isRequired,
  isSummaryVersion: PropTypes.bool,
  mobileVersion: PropTypes.bool,
  showCustomBudget: PropTypes.bool.isRequired,
}

TargetingBudgetSetter.defaultProps = {
  currency: '',
  currencyOffset: 0,
  isSummaryVersion: false,
  mobileVersion: false,
}


export default TargetingBudgetSetter
