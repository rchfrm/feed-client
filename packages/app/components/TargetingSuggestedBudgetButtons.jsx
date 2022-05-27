import React from 'react'
import PropTypes from 'prop-types'

import TargetingSuggestedBudgetButton from '@/app/TargetingSuggestedBudgetButton'

import { ArtistContext } from '@/app/contexts/ArtistContext'

const TargetingSuggestedBudgetButtons = ({
  budgetSuggestions,
  sliderValueRange,
  setBudget,
  onBudgetSuggestionClick,
}) => {
  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
      } = {},
    },
  } = React.useContext(ArtistContext)

  const [minSliderValue, maxSliderValue] = sliderValueRange

  return (
    <div
      className="relative flex"
      style={{ width: 'calc(100% - 24px)', margin: '0 auto 24px' }}
    >
      {budgetSuggestions.map((budget) => {
        const min = minSliderValue / 100
        const max = maxSliderValue / 100
        const offset = ((budget - min) / (max - min)) * 100

        return (
          <TargetingSuggestedBudgetButton
            key={budget}
            budget={budget}
            currency={currencyCode}
            offset={offset}
            setBudget={setBudget}
            onBudgetSuggestionClick={onBudgetSuggestionClick}
          />
        )
      })}
    </div>
  )
}

TargetingSuggestedBudgetButtons.propTypes = {
  budgetSuggestions: PropTypes.array.isRequired,
  sliderValueRange: PropTypes.array.isRequired,
  setBudget: PropTypes.func.isRequired,
  onBudgetSuggestionClick: PropTypes.func.isRequired,
}

TargetingSuggestedBudgetButtons.defaultProps = {
}

export default TargetingSuggestedBudgetButtons
