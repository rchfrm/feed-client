import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import useControlsStore from '@/app/stores/controlsStore'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const GetStartedDailyBudgetStep = () => {
  const {
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
  } = React.useContext(ArtistContext)

  const getControlsStoreState = (state) => ({
    minConversionsBudget: state.minConversionsBudget,
  })

  const [budget, setBudget] = React.useState(targetingState.budget)
  const { minConversionsBudget } = useControlsStore(getControlsStoreState)
  const { next } = React.useContext(WizardContext)
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser: true })

  // Get slider settings based on min budget
  const { sliderStep, sliderValueRange } = React.useMemo(() => {
    return targetingHelpers.calcBudgetSliderConfig(minBase, minHardBudget, targetingState.initialBudget)
  }, [minBase, minHardBudget, targetingState.initialBudget])

  React.useEffect(() => {
    if (typeof budget !== 'number') return
    updateTargetingBudget(budget)
  }, [budget, updateTargetingBudget])

  const saveBudget = async () => {
    await saveTargeting('settings')
    next()
  }

  const handleNext = () => {
    if (budget === initialTargetingState.budget) {
      next()
      return
    }
    saveBudget()
  }

  return (
    <div className="flex flex-1 flex-column justify-center items-center">
      <h2 className="w-full mb-16 font-normal text-xl">Finally, how much would you like to spend?</h2>
      <div className="w-1/2 h-26 mb-4 px-6">
        <TargetingBudgetSlider
          sliderStep={sliderStep}
          sliderValueRange={sliderValueRange}
          initialBudget={initialTargetingState.budget || (minConversionsBudget * currencyOffset)}
          onChange={(budget) => {
            setBudget(budget)
          }}
          currency={currencyCode}
          currencyOffset={currencyOffset}
          mobileVersion
        />
      </div>
      <Button
        version="green"
        onClick={handleNext}
        loading={targetingLoading}
        className=""
      >
        Next
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill="white"
        />
      </Button>
    </div>
  )
}

GetStartedDailyBudgetStep.propTypes = {
}

GetStartedDailyBudgetStep.defaultProps = {
}

export default GetStartedDailyBudgetStep
