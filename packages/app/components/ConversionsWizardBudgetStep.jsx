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

import { formatCurrency } from '@/helpers/utils'

const ConversionsWizardBudgetStep = () => {
  const { next } = React.useContext(WizardContext)
  const { minConversionsBudget } = useControlsStore(getControlsStoreState)
  const { updateTargetingBudget, initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser, currency } = React.useContext(TargetingContext)
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser })
  const formattedMinConversionsBudget = formatCurrency(minConversionsBudget / 100, currency)

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
      <h2>Budget</h2>
      <MarkdownText markdown={copy.budgetStepDescription(formattedMinConversionsBudget)} />
      <Button
        version="outline icon"
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
