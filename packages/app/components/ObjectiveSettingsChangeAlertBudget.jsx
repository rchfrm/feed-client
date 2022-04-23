import React from 'react'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'
import MarkdownText from '@/elements/MarkdownText'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'
import copy from '@/app/copy/getStartedCopy'
import controlsPageCopy from '@/app/copy/controlsPageCopy'


const ObjectiveSettingsChangeAlertBudget = ({
  data,
  setData,
  shouldStoreData,
  setShouldStoreData,
  setIsDisabled,
}) => {
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

    setIsDisabled(hasInsufficientBudget)

    updateTargetingBudget(budget)
  }, [budget, updateTargetingBudget, hasInsufficientBudget, setIsDisabled])

  React.useEffect(() => {
    if (shouldStoreData) {
      setData({ ...data, budget })
      setShouldStoreData(false)
    }
  }, [shouldStoreData, setShouldStoreData, data, setData, budget])

  return (
    <>
      <h3>{controlsPageCopy.alertBudgetTitle}</h3>
      <MarkdownText markdown={controlsPageCopy.alertBudgetDescription} />
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
