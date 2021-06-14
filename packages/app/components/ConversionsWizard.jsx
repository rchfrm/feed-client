import React from 'react'

import { WizardContextProvider } from '@/app/contexts/WizardContext'

import ConversionsWizardStartingStep from '@/app/ConversionsWizardStartingStep'
import ConversionsWizardBudgetStep from '@/app/ConversionsWizardBudgetStep'
import ConversionsWizardLinkStep from '@/app/ConversionsWizardLinkStep'
import ConversionsWizardFacebookPixelStep from '@/app/ConversionsWizardFacebookPixelStep'
import ConversionsWizardFacebookPixelEventStep from '@/app/ConversionsWizardFacebookPixelEventStep'
import ConversionsWizardCallToActionStep from '@/app/ConversionsWizardCallToActionStep'
import ConversionsWizardPostOptInStep from '@/app/ConversionsWizardPostOptInStep'

const steps = [
  {
    id: 0,
    shouldSkip: false,
  },
  {
    id: 1,
    shouldSkip: false,
  },
  {
    id: 2,
    shouldSkip: false,
  },
  {
    id: 3,
    shouldSkip: false,
  },
  {
    id: 4,
    shouldSkip: false,
  },
  {
    id: 5,
    shouldSkip: false,
  },
  {
    id: 6,
    shouldSkip: false,
  },
]

const ConversionsWizard = () => {
  return (
    <div>
      <WizardContextProvider steps={steps}>
        <ConversionsWizardStartingStep />
        <ConversionsWizardBudgetStep />
        <ConversionsWizardLinkStep />
        <ConversionsWizardFacebookPixelStep />
        <ConversionsWizardFacebookPixelEventStep />
        <ConversionsWizardCallToActionStep />
        <ConversionsWizardPostOptInStep />
      </WizardContextProvider>
    </div>
  )
}

ConversionsWizard.propTypes = {

}

export default ConversionsWizard
