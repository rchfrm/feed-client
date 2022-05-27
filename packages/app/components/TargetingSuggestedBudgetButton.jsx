import React from 'react'
import PropTypes from 'prop-types'

import { formatCurrency } from '@/helpers/utils'

const TargetingSuggestedBudgetButton = ({
  budget,
  currency,
  offset,
}) => {
  return (
    <div
      role="button"
      onClick={() => {}}
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
}

TargetingSuggestedBudgetButton.defaultProps = {
}

export default TargetingSuggestedBudgetButton
