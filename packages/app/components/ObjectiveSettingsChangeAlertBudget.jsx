import React from 'react'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'
import copy from '@/app/copy/getStartedCopy'

const ObjectiveSettingsChangeAlertBudget = () => {
  const {
    initialTargetingState,
    targetingState,
    updateTargetingBudget,
  } = React.useContext(TargetingContext)

  const [budget, setBudget] = React.useState(targetingState.budget)

  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
        currencyOffset,
        minorUnit: {
          minBase,
          minHard: minHardBudget,
          minReccomendedStories,
        },
        string: {
          minReccomendedStories: minReccomendedStoriesString,
        },
      },
    },
  } = React.useContext(ArtistContext)

  const hasInsufficientBudget = budget < minReccomendedStories

  // Get slider settings based on min budget
  const { sliderStep, sliderValueRange } = React.useMemo(() => {
    return targetingHelpers.calcBudgetSliderConfig(minBase, minHardBudget, targetingState.initialBudget)
  }, [minBase, minHardBudget, targetingState.initialBudget])

  React.useEffect(() => {
    if (typeof budget !== 'number') return

    updateTargetingBudget(budget)
  }, [budget, updateTargetingBudget])

  return (
    <>
      <h3>Adjust your daily budget</h3>
      <p>You can change this at any time. We recommend spreading budget out over a longer period of time as consistency boosts ad performance.</p>
      <TargetingBudgetSlider
        sliderStep={sliderStep}
        sliderValueRange={sliderValueRange}
        initialBudget={initialTargetingState.budget}
        onChange={(budget) => {
          setBudget(budget)
        }}
        currency={currencyCode}
        currencyOffset={currencyOffset}
        shouldShowError={hasInsufficientBudget}
        errorMessage={copy.inSufficientBudget(minReccomendedStoriesString)}
        mobileVersion
      />
    </>
  )
}

export default ObjectiveSettingsChangeAlertBudget
