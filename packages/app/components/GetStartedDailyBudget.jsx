import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { WizardContext } from '@/app/contexts/WizardContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'
import useControlsStore from '@/app/stores/controlsStore'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

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
  } = React.useContext(TargetingContext)

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
    artistId,
  } = React.useContext(ArtistContext)

  const [budget, setBudget] = React.useState(targetingState.budget)
  const { next } = React.useContext(WizardContext)
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser: true })
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'
  const hasInsufficientBudget = hasSalesObjective && budget < minReccomendedStories

  // Get slider settings based on min budget
  const { sliderStep, sliderValueRange } = React.useMemo(() => {
    return targetingHelpers.calcBudgetSliderConfig(minBase, minHardBudget, targetingState.initialBudget)
  }, [minBase, minHardBudget, targetingState.initialBudget])

  React.useEffect(() => {
    if (typeof budget !== 'number') return
    updateTargetingBudget(budget)
  }, [budget, updateTargetingBudget, minReccBudget])

  // If minReccBudget isn't set yet reinitialise targeting context state
  useAsyncEffect(async (isMounted) => {
    if (minReccBudget || !isMounted()) return

    const state = await targetingHelpers.fetchTargetingState(artistId, currencyOffset)
    const { error } = state

    await initPage(state, error)
  }, [minReccBudget])

  const saveBudget = async () => {
    await saveTargeting('settings', { ...targetingState, budget })
    next()
  }

  const handleNext = () => {
    if (budget === initialTargetingState.budget) {
      next()
      return
    }
    saveBudget()
  }

  if (!minReccBudget) return <Spinner />

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="w-full mb-8 xs:mb-4 font-medium text-xl">{copy.budgetSubtitle}</h3>
      <MarkdownText className="hidden xs:block sm:w-2/3 text-grey-3 italic" markdown={copy.budgetDescription} />
      <div className="flex flex-1 flex-column justify-center items-center">
        <div className="w-full sm:w-2/3 h-26 mb-4 px-6">
          <TargetingBudgetSlider
            sliderStep={sliderStep}
            sliderValueRange={sliderValueRange}
            initialBudget={initialTargetingState.budget || minReccomendedStories}
            onChange={(budget) => {
              setBudget(budget)
            }}
            currency={currencyCode}
            currencyOffset={currencyOffset}
            shouldShowError={hasInsufficientBudget}
            errorMessage={copy.inSufficientBudget(minReccomendedStoriesString)}
            mobileVersion
          />
        </div>
        <Button
          version="green"
          onClick={handleNext}
          loading={targetingLoading}
          className="w-full sm:w-48"
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
