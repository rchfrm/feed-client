import React from 'react'
import PropTypes from 'prop-types'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import { formatCurrency } from '@/helpers/utils'

const TargetingSuggestedBudgetButton = ({
  budget,
  currency,
  offset,
  setBudget,
  onBudgetSuggestionClick,
}) => {
  const { budgetSlider } = React.useContext(TargetingContext)

  const onClick = () => {
    const newBudget = budget * 100

    budgetSlider.noUiSlider.set(newBudget)
    setBudget(newBudget)
    onBudgetSuggestionClick(newBudget)
  }

  return (
    <div
      role="button"
      onClick={onClick}
      className={[
        'absolute w-6 h-5',
        'flex items-center justify-center',
        'border border-solid border-green rounded-dialogue',
        'text-xs text-center text-xs rounded-dialogue',
      ].join(' ')}
      style={{ left: `calc(${offset}% - 12px)` }}
    >
      {formatCurrency(budget, currency, true)}
    </div>
  )
}


TargetingSuggestedBudgetButton.propTypes = {
  budget: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  setBudget: PropTypes.func.isRequired,
  onBudgetSuggestionClick: PropTypes.func.isRequired,
}

TargetingSuggestedBudgetButton.defaultProps = {
}

export default TargetingSuggestedBudgetButton
