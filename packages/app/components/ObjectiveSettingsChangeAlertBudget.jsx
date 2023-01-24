import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import TargetingDailyBudgetSlider from '@/app/TargetingDailyBudgetSlider'
import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'
import copy from '@/app/copy/getStartedCopy'
import controlsPageCopy from '@/app/copy/controlsPageCopy'


const ObjectiveSettingsChangeAlertBudget = ({
  shouldSave,
  setShouldSave,
  setIsDisabled,
}) => {
  const {
    initialTargetingState,
    targetingState,
    updateTargetingBudget,
    saveTargetingSettings,
    budgetSlider,
    setBudgetSlider,
  } = React.useContext(TargetingContext)

  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings })

  const [budget, setBudget] = React.useState(targetingState.budget)
  const [isLoading, setIsLoading] = React.useState(true)

  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
        currencyOffset,
        minorUnit: {
          minBase,
          minHard: minHardBudget,
          minRecommendedStories,
        },
        string: {
          minRecommendedStories: minRecommendedStoriesString,
        },
      },
    },
  } = React.useContext(ArtistContext)

  const hasInsufficientBudget = budget < minRecommendedStories

  // Get slider settings based on min budget
  const { sliderStep, sliderValueRange } = React.useMemo(() => {
    return targetingHelpers.calcBudgetSliderConfig(minBase, minHardBudget, targetingState.initialBudget)
  }, [minBase, minHardBudget, targetingState.initialBudget])

  React.useEffect(() => {
    if (typeof budget !== 'number') return

    setIsDisabled(hasInsufficientBudget)

    updateTargetingBudget(budget)
  }, [budget, updateTargetingBudget, hasInsufficientBudget, setIsDisabled])

  useAsyncEffect(async () => {
    if (shouldSave) {
      await saveTargeting('budget', { ...targetingState, budget })

      setShouldSave(false)
    }
  }, [shouldSave, setShouldSave, budget])

  // Set budget equal to min recommended stories value on mount
  React.useEffect(() => {
    if (budgetSlider.noUiSlider) {
      budgetSlider.noUiSlider.set(minRecommendedStories)
      setIsLoading(false)
    }
  }, [budgetSlider.noUiSlider, minRecommendedStories])

  if (isLoading) return <Spinner className="h-48 flex items-center" width={28} />

  return (
    <>
      <h2>{controlsPageCopy.alertBudgetTitle}</h2>
      <MarkdownText markdown={controlsPageCopy.alertBudgetDescription} className="text-grey-dark italic" />
      <TargetingDailyBudgetSlider
        sliderStep={sliderStep}
        sliderValueRange={sliderValueRange}
        initialBudget={initialTargetingState.budget}
        onChange={(budget) => {
          setBudget(budget)
        }}
        currency={currencyCode}
        currencyOffset={currencyOffset}
        shouldShowError={hasInsufficientBudget}
        errorMessage={copy.inSufficientBudget(minRecommendedStoriesString)}
        setBudgetSlider={setBudgetSlider}
        mobileVersion
      />
    </>
  )
}

ObjectiveSettingsChangeAlertBudget.propTypes = {
  shouldSave: PropTypes.bool,
  setShouldSave: PropTypes.func,
  setIsDisabled: PropTypes.func,
}

ObjectiveSettingsChangeAlertBudget.defaultProps = {
  shouldSave: false,
  setShouldSave: () => {},
  setIsDisabled: () => {},
}

export default ObjectiveSettingsChangeAlertBudget
