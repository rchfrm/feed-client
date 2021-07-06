import React from 'react'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { WizardContext } from '@/app/contexts/WizardContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'

const ConversionsWizardBudgetStep = () => {
  const { next } = React.useContext(WizardContext)
  const { updateTargetingBudget, initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser } = React.useContext(TargetingContext)
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser })
  const minBudget = 500

  // Update targeting budget state
  const setBudget = () => {
    updateTargetingBudget(minBudget)
  }

  // Save targeting settings and go to next step
  React.useEffect(() => {
    if (targetingState.budget === minBudget) {
      saveTargeting('budget')
      next()
    }
  }, [targetingState.budget, saveTargeting, next])

  return (
    <>
      <h2>Budget</h2>
      <MarkdownText markdown={copy.budgetStepDescription} />
      <Button
        version="outline icon"
        onClick={setBudget}
        spinnerFill={brandColors.black}
        className="w-full"
      >
        Set budget to £5.00
        <ArrowAltIcon
          className="ml-3"
          direction="right"
        />
      </Button>
    </>
  )
}

export default ConversionsWizardBudgetStep
