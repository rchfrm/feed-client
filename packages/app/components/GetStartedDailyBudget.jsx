import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { WizardContext } from '@/app/contexts/WizardContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'
import useControlsStore from '@/app/stores/controlsStore'

import TargetingDailyBudgetSetter from '@/app/TargetingDailyBudgetSetter'
import TargetingDailyBudgetCustomBudgetButton from '@/app/TargetingDailyBudgetCustomBudgetButton'
import ControlsSettingsSectionFooter from '@/app/ControlsSettingsSectionFooter'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import Spinner from '@/elements/Spinner'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

import copy from '@/app/copy/getStartedCopy'
import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const GetStartedDailyBudget = () => {
  const {
    initPage,
    minReccBudget,
    targetingState,
    initialTargetingState,
    updateTargetingBudget,
    saveTargetingSettings,
    targetingLoading,
    setBudgetSlider,
  } = React.useContext(TargetingContext)

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
        majorUnit: {
          minBaseUnrounded: minBaseUnroundedMajor,
        },
        string: {
          minRecommendedStories: minRecommendedStoriesString,
        },
      },
    },
    artistId,
  } = React.useContext(ArtistContext)

  const [budget, setBudget] = React.useState(targetingState.budget)
  const [showCustomBudget, setShowCustomBudget] = React.useState(false)
  const [budgetSuggestions, setBudgetSuggestions] = React.useState([])

  const { next } = React.useContext(WizardContext)
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser: true })
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences

  const hasSalesObjective = objective === 'sales'
  const hasInsufficientBudget = hasSalesObjective && budget < minRecommendedStories

  // If minReccBudget isn't set yet reinitialise targeting context state
  useAsyncEffect(async (isMounted) => {
    if (minReccBudget || ! isMounted()) return

    const state = await targetingHelpers.fetchTargetingState(artistId, currencyOffset)
    const { error } = state

    initPage(state, error)
  }, [minReccBudget])

  const saveBudget = async (budget) => {
    await saveTargeting('settings', { ...targetingState, budget })

    next()
  }

  const handleNext = async (budget) => {
    if (budget === initialTargetingState.budget) {
      next()

      return
    }
    saveBudget(budget)
  }

  React.useEffect(() => {
    if (! minBaseUnroundedMajor || ! objective) return

    const suggestions = targetingHelpers.getBudgetSuggestions(objective, minBaseUnroundedMajor)
    setBudgetSuggestions(suggestions)
  }, [minBaseUnroundedMajor, objective])

  if (! minReccBudget || ! budgetSuggestions.length) return <Spinner />

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="w-full mb-8 xs:mb-4 font-medium text-lg">{copy.budgetSubtitle}</h3>
      <ControlsSettingsSectionFooter
        copy={copy.budgetFooter(minBaseUnroundedMajor, currencyCode)}
        className="text-insta mb-6"
      />
      <div className="flex flex-1 flex-column justify-center items-center">
        <div
          className="w-full sm:w-3/4 flex flex-column justify-between mb-10"
          style={{ minHeight: '120px' }}
        >
          <div className="mb-5">
            <TargetingDailyBudgetSetter
              budget={budget}
              setBudget={setBudget}
              currency={currencyCode}
              currencyOffset={currencyOffset}
              minBase={minBase}
              minHardBudget={minHardBudget}
              initialBudget={initialTargetingState.budget || budgetSuggestions[1] * currencyOffset}
              budgetSuggestions={budgetSuggestions}
              updateTargetingBudget={updateTargetingBudget}
              showCustomBudget={showCustomBudget}
              setBudgetSlider={setBudgetSlider}
              shouldShowError={hasInsufficientBudget}
              errorMessage={copy.inSufficientBudget(minRecommendedStoriesString)}
              onBudgetSuggestionClick={handleNext}
            />
          </div>
          <div className="flex justify-center">
            <TargetingDailyBudgetCustomBudgetButton
              style={{ zIndex: 2 }}
              showCustomBudget={showCustomBudget}
              setShowCustomBudget={setShowCustomBudget}
              initialBudget={initialTargetingState.budget}
              minBase={minBase}
              minHardBudget={minHardBudget}
            />
          </div>
        </div>
        <Button
          version="green"
          onClick={() => handleNext(budget)}
          loading={targetingLoading}
          className="w-full sm:w-48 mb-4"
          trackComponentName="GetStartedDailyBudget"
          disabled={hasInsufficientBudget}
        >
          Save
          <ArrowAltIcon
            className="ml-3"
            direction="right"
            fill={hasInsufficientBudget ? brandColors.greyDark : brandColors.white}
          />
        </Button>
      </div>
    </div>
  )
}

GetStartedDailyBudget.propTypes = {
}

GetStartedDailyBudget.defaultProps = {
}

export default GetStartedDailyBudget
