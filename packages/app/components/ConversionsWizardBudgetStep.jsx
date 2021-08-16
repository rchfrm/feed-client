import React from 'react'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { WizardContext } from '@/app/contexts/WizardContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import useControlsStore from '@/app/stores/controlsStore'

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  minConversionsBudget: state.minConversionsBudget,
  formattedMinConversionsBudget: state.formattedMinConversionsBudget,
})

const ConversionsWizardBudgetStep = () => {
  const { next } = React.useContext(WizardContext)
  const { minConversionsBudget, formattedMinConversionsBudget } = useControlsStore(getControlsStoreState)
  const { updateTargetingBudget, initialTargetingState, targetingState, saveTargetingSettings } = React.useContext(TargetingContext)
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings })

  // Update targeting budget state
  const setBudget = () => {
    updateTargetingBudget(minConversionsBudget)
  }

  // Save targeting settings and go to next step
  React.useEffect(() => {
    if (targetingState.budget === minConversionsBudget) {
      saveTargeting('budget')
      next()
    }
  }, [targetingState.budget, saveTargeting, minConversionsBudget, next])

  return (
    <>
      <MarkdownText markdown={copy.budgetStepDescription(formattedMinConversionsBudget)} />
      <Button
        version="outline-green icon"
        onClick={setBudget}
        spinnerFill={brandColors.black}
        className="w-full"
      >
        Set budget to {formattedMinConversionsBudget}
        <ArrowAltIcon
          className="ml-3"
          direction="right"
        />
      </Button>
    </>
  )
}

export default ConversionsWizardBudgetStep
