
// IMPORT PACKAGES
import React from 'react'
// IMPORT CONSTANTS
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
import { track } from '@/helpers/trackingHelpers'
// IMPORT STYLES

import MarkdownText from '@/elements/MarkdownText'
import copy from '@/copy/BudgetCopy'

const getBudgetAction = (previousBudget, newBudget) => {
  if (previousBudget === 0) return 'Ads turned on'
  if (previousBudget > newBudget) return 'Daily budget decreased'
  if (previousBudget < newBudget) return 'Daily budget increased'
}

function BudgetConfirmation({ budget, previousBudget, artistId }) {
  const budgetInt = Number(budget)
  // Message for setting budget to positive number
  const budgetFormatted = utils.formatCurrency(budget)

  // Message for setting budget to 0
  if (budgetInt === 0) {
    track({
      category: 'Budget',
      action: 'Ads turn off',
      description: `New budget: ${budgetFormatted}`,
      label: `artistId: ${artistId}`,
    })
    return <MarkdownText markdown={copy.pauseBudget} />
  }

  const budgetAction = getBudgetAction(previousBudget, budget)
  track({
    category: 'Budget',
    action: budgetAction,
    description: `New nudget: ${budgetFormatted}`,
    label: `artistId: ${artistId}`,
  })

  return <MarkdownText markdown={copy.setBudget(budgetFormatted)} />
}

export default BudgetConfirmation
