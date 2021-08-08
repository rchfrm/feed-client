import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const ControlsWizardBudgetStep = () => {
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

  const [budget, setBudget] = React.useState(targetingState.budget)
  const { next } = React.useContext(WizardContext)
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser: true })

  // GET SLIDER SETTINGS BASED ON MIN BUDGET
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

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardBudgetStepQuestion} />
      <div className="h-26 mb-4 px-6">
        <TargetingBudgetSlider
          sliderStep={sliderStep}
          sliderValueRange={sliderValueRange}
          initialBudget={initialTargetingState.budget}
          onChange={(budget) => {
            setBudget(budget)
          }}
          currency={currencyCode}
          currencyOffset={currencyOffset}
          mobileVersion
        />
      </div>
      <Button
        version="outline-green icon"
        onClick={saveBudget}
        spinnerFill={brandColors.black}
        className="w-full mb-6"
        loading={targetingLoading}
      >
        Next
        <ArrowAltIcon
          className="ml-3"
          direction="right"
        />
      </Button>
      <MarkdownText markdown={copy.controlsWizardBudgetRecommendation} className="mb-10" />
    </>
  )
}

ControlsWizardBudgetStep.propTypes = {
}

export default ControlsWizardBudgetStep
