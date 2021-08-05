import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/controlsPageCopy'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const ControlsWizardBudgetStep = () => {
  const { targetingState } = React.useContext(TargetingContext)
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

  // GET SLIDER SETTINGS BASED ON MIN BUDGET
  const { sliderStep, sliderValueRange } = React.useMemo(() => {
    return targetingHelpers.calcBudgetSliderConfig(minBase, minHardBudget, targetingState.initialBudget)
  }, [minBase, minHardBudget, targetingState.initialBudget])

  React.useEffect(() => {
    console.log(budget)
  }, [budget])

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardBudgetStepQuestion} />
      <div className="h-26 mb-4 px-6">
        <TargetingBudgetSlider
          sliderStep={sliderStep}
          sliderValueRange={sliderValueRange}
          initialBudget={targetingState.initialBudget}
          onChange={(budget) => {
            setBudget(budget)
          }}
          currency={currencyCode}
          currencyOffset={currencyOffset}
          mobileVersion
        />
      </div>
      <Button
        version="outline icon"
        onClick={next}
        spinnerFill={brandColors.black}
        className="w-full mb-6"
      >
        Next
        <ArrowAltIcon
          className="ml-3"
          direction="right"
        />
      </Button>
      <MarkdownText markdown={copy.controlsWizardBudgetRecommendation} />
    </>
  )
}

ControlsWizardBudgetStep.propTypes = {
}

export default ControlsWizardBudgetStep
