import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import { formatCurrency } from '@/helpers/utils'

const TargetingSuggestedBudgetButton = ({ budget, currency }) => {
  return (
    <Button
      version="small outline-green"
      onClick={() => {}}
      className="h-9 mr-2 p-2"
      trackComponentName="LoginWithEmail"
    >
      {formatCurrency(budget, currency, true)}
    </Button>
  )
}


TargetingSuggestedBudgetButton.propTypes = {
  budget: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
}

TargetingSuggestedBudgetButton.defaultProps = {
}

export default TargetingSuggestedBudgetButton
