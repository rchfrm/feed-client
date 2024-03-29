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
import ArrowIcon from '@/icons/ArrowIcon'
import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'
import * as targetingHelpers from '@/app/helpers/targetingHelpers'
import { updateCompletedSetupAt } from '@/app/helpers/artistHelpers'
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
    disableSaving,
  } = React.useContext(TargetingContext)

  const {
    artist: {
      feedMinBudgetInfo: {
        currencyCode,
        currencyOffset,
        minorUnit: {
          minBase,
          minHard: minHardBudget,
        },
        majorUnit: {
          minBaseUnrounded: minBaseUnroundedMajor,
        },
        string: {
          minRecommendedStories: minRecommendedStoriesString,
        },
      },
      hasSetUpProfile,
      plan,
      is_managed: isManaged,
    },
    artistId,
    updateArtist,
  } = React.useContext(ArtistContext)

  const [budget, setBudget] = React.useState(targetingState.budget)
  const [showCustomBudget, setShowCustomBudget] = React.useState(false)
  const [budgetSuggestions, setBudgetSuggestions] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const { next } = React.useContext(WizardContext)
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser: true })
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences

  const hasFreePlan = plan?.includes('free')

  // If minReccBudget isn't set yet reinitialise targeting context state
  useAsyncEffect(async (isMounted) => {
    if (minReccBudget || ! isMounted()) return

    const state = await targetingHelpers.fetchTargetingState(artistId, currencyOffset)
    const { error } = state

    initPage(state, error)
  }, [minReccBudget])

  const checkAndUpdateCompletedSetupAt = async () => {
    if (! hasSetUpProfile) {
      const { res: artistUpdated, error } = await updateCompletedSetupAt(artistId)

      if (error) {
        setError(error)
        setIsLoading(false)

        return
      }

      updateArtist(artistUpdated)
      await saveTargeting('', { ...targetingState, status: 1 })
    }
  }

  const saveBudget = async (budget) => {
    await saveTargeting(
      'settings',
      { ...targetingState, budget, ...((hasFreePlan || isManaged) && { status: 1 }) },
    )
  }

  const handleNext = async (budget) => {
    if (budget !== initialTargetingState.budget) {
      setIsLoading(true)
      await saveBudget(budget)
    }

    if (hasFreePlan || isManaged) {
      setIsLoading(true)
      await checkAndUpdateCompletedSetupAt()
    }

    setIsLoading(false)
    next()
  }

  React.useEffect(() => {
    if (! minBaseUnroundedMajor || ! objective) {
      return
    }

    const suggestions = targetingHelpers.getBudgetSuggestions(objective, minBaseUnroundedMajor)
    setBudgetSuggestions(suggestions)
  }, [minBaseUnroundedMajor, objective])

  if (! minReccBudget || ! budgetSuggestions.length) {
    return <Spinner />
  }

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="w-full mb-8 xs:mb-4 font-medium text-lg">{copy.budgetSubtitle}</h3>
      <ControlsSettingsSectionFooter
        copy={copy.budgetFooter(minBaseUnroundedMajor, currencyCode)}
        className="text-insta mb-6"
      />
      <Error error={error} />
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
          onClick={() => handleNext(budget)}
          isLoading={targetingLoading || isLoading}
          className="w-full sm:w-48 mb-4"
          trackComponentName="GetStartedDailyBudget"
          isDisabled={Boolean(disableSaving)}
        >
          Save
          <ArrowIcon
            className="w-7 h-auto ml-1"
            direction="right"
            fill={brandColors.black}
          />
        </Button>
      </div>
    </div>
  )
}

export default GetStartedDailyBudget
