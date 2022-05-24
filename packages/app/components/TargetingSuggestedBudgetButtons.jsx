import React from 'react'
import PropTypes from 'prop-types'

import TargetingSuggestedBudgetButton from '@/app/TargetingSuggestedBudgetButton'

import { ArtistContext } from '@/app/contexts/ArtistContext'

const TargetingSuggestedBudgetButtons = ({ budgetSuggestions }) => {
  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
      } = {},
    },
  } = React.useContext(ArtistContext)

  return (
    <div className="flex mb-4">
      {budgetSuggestions.map((budget) => (
        <TargetingSuggestedBudgetButton
          key={budget}
          budget={budget}
          currency={currencyCode}
        />
      ))}
    </div>
  )
}

TargetingSuggestedBudgetButtons.propTypes = {
  budgetSuggestions: PropTypes.array.isRequired,
}

TargetingSuggestedBudgetButtons.defaultProps = {
}

export default TargetingSuggestedBudgetButtons
