import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { WizardContext } from '@/app/contexts/WizardContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import Spinner from '@/elements/Spinner'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

import copy from '@/app/copy/getStartedCopy'

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
        },
      },
    },
    artistId,
  } = React.useContext(ArtistContext)

  const [budget, setBudget] = React.useState(targetingState.budget)
  const { next } = React.useContext(WizardContext)
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser: true })

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
      <h3 className="mb-0 font-medium text-xl">{copy.budgetSubtitle}</h3>
      <div className="flex flex-1 flex-column justify-center items-center">
        <div className="w-full sm:w-1/2 h-26 mb-4 px-6">
          <TargetingBudgetSlider
            sliderStep={sliderStep}
            sliderValueRange={sliderValueRange}
            initialBudget={initialTargetingState.budget}
            onChange={(budget) => {
              setBudget(budget)
            }}
            minReccBudget={minReccBudget}
            currency={currencyCode}
            currencyOffset={currencyOffset}
            mobileVersion
          />
        </div>
        <Button
          version="green"
          onClick={handleNext}
          loading={targetingLoading}
          className="w-full sm:w-48"
          trackComponentName="GetStartedDailyBudget"
        >
          Save
          <ArrowAltIcon
            className="ml-3"
            direction="right"
            fill="white"
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
