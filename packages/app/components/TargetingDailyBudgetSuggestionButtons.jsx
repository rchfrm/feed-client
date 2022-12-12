import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import TargetingDailyBudgetSuggestionButton from '@/app/TargetingDailyBudgetSuggestionButton'

import { ArtistContext } from '@/app/contexts/ArtistContext'

const TargetingDailyBudgetSuggestionButtons = ({
  budgetSuggestions,
  sliderValueRange,
  setBudget,
  onBudgetSuggestionClick,
}) => {
  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
        currencyOffset,
      } = {},
    },
  } = React.useContext(ArtistContext)

  const [minSliderValue, maxSliderValue] = sliderValueRange
  const isDesktopLayout = useBreakpointTest('xs')

  return (
    <div
      className="relative flex"
      style={{ width: 'calc(100% - 24px)', margin: '0 auto 24px' }}
    >
      {budgetSuggestions.map((budget, index) => {
        if (isDesktopLayout || (! isDesktopLayout && index !== 0)) {
          const min = minSliderValue / currencyOffset
          const max = maxSliderValue / currencyOffset
          const offset = ((budget - min) / (max - min)) * 100

          return (
            <TargetingDailyBudgetSuggestionButton
              key={budget}
              budget={budget}
              currency={currencyCode}
              currencyOffset={currencyOffset}
              offset={offset}
              setBudget={setBudget}
              onBudgetSuggestionClick={onBudgetSuggestionClick}
            />
          )
        }
        return null
      })}
    </div>
  )
}

TargetingDailyBudgetSuggestionButtons.propTypes = {
  budgetSuggestions: PropTypes.array.isRequired,
  sliderValueRange: PropTypes.array.isRequired,
  setBudget: PropTypes.func.isRequired,
  onBudgetSuggestionClick: PropTypes.func.isRequired,
}

TargetingDailyBudgetSuggestionButtons.defaultProps = {
}

export default TargetingDailyBudgetSuggestionButtons
