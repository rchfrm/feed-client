import React from 'react'
import PropTypes from 'prop-types'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import { formatCurrency } from '@/helpers/utils'

const TargetingSuggestedBudgetButton = ({
  budget,
  currency,
  currencyOffset,
  offset,
  setBudget,
  onBudgetSuggestionClick,
}) => {
  const buttonRef = React.useRef(null)
  const buttonWidth = buttonRef?.current?.offsetWidth
  const { budgetSlider } = React.useContext(TargetingContext)

  const onClick = () => {
    const newBudget = budget * currencyOffset

    budgetSlider.noUiSlider.set(newBudget)
    setBudget(newBudget)
    onBudgetSuggestionClick(newBudget)
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={[
        'absolute w-7 h-6 lg:w-9 lg:h-8 xl:w-10 xl:h-9',
        'flex items-center justify-center',
        'border-2 border-solid border-green rounded-dialogue',
        'text-xs lg:text-sm text-center rounded-dialogue',
      ].join(' ')}
      style={{ left: `calc(${offset}% - ${buttonWidth / 2}px)` }}
    >
      {formatCurrency(budget, currency, true)}
    </button>
  )
}


TargetingSuggestedBudgetButton.propTypes = {
  budget: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencyOffset: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  setBudget: PropTypes.func.isRequired,
  onBudgetSuggestionClick: PropTypes.func.isRequired,
}

TargetingSuggestedBudgetButton.defaultProps = {
}

export default TargetingSuggestedBudgetButton
