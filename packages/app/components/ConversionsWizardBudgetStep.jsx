import React from 'react'
import useAsyncEffect from 'use-async-effect'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { WizardContext } from '@/app/contexts/WizardContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import copy from '@/app/copy/controlsPageCopy'
import { getMinBudgets } from '@/app/helpers/budgetHelpers'

import brandColors from '@/constants/brandColors'

import { formatCurrency } from '@/helpers/utils'

const ConversionsWizardBudgetStep = () => {
  const [minBudget, setMinBudget] = React.useState(0)
  const [formattedMinBudget, setFormattedMinBudget] = React.useState('')
  const [error, setError] = React.useState('')
  const { next } = React.useContext(WizardContext)
  const { updateTargetingBudget, initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser, currency } = React.useContext(TargetingContext)
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser })
  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async () => {
    const { res: minBudgets, error } = await getMinBudgets(artistId)
    if (error) {
      setError(error)
      return
    }
    const { min_recommended_stories_rounded: budget } = minBudgets
    setMinBudget(budget * 100)
    setFormattedMinBudget(formatCurrency(budget, currency))
  }, [artistId])

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
  }, [targetingState.budget, saveTargeting, minBudget, next])

  return (
    <>
      <h2>Budget</h2>
      <MarkdownText markdown={copy.budgetStepDescription(formattedMinBudget)} />
      {error && (
        <Error error={error} />
      )}
      <Button
        version="outline icon"
        onClick={setBudget}
        spinnerFill={brandColors.black}
        className="w-full"
      >
        Set budget to {formattedMinBudget}
        <ArrowAltIcon
          className="ml-3"
          direction="right"
        />
      </Button>
    </>
  )
}

export default ConversionsWizardBudgetStep
