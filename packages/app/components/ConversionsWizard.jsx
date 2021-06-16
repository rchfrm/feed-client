import React from 'react'

import { WizardContextProvider } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import ConversionsWizardStartingStep from '@/app/ConversionsWizardStartingStep'
import ConversionsWizardBudgetStep from '@/app/ConversionsWizardBudgetStep'
import ConversionsWizardLinkStep from '@/app/ConversionsWizardLinkStep'
import ConversionsWizardFacebookPixelStep from '@/app/ConversionsWizardFacebookPixelStep'
import ConversionsWizardFacebookPixelEventStep from '@/app/ConversionsWizardFacebookPixelEventStep'
import ConversionsWizardCallToActionStep from '@/app/ConversionsWizardCallToActionStep'
import ConversionsWizardPostOptInStep from '@/app/ConversionsWizardPostOptInStep'

const ConversionsWizard = () => {
  const { artist } = React.useContext(ArtistContext)
  const facebookPixelId = artist.integrations.find(integration => integration.platform === 'facebook').pixel_id

  const steps = [
    { id: 0, shouldSkip: false },
    { id: 1, shouldSkip: artist.daily_budget >= 5 },
    { id: 2, shouldSkip: false },
    { id: 3, shouldSkip: Boolean(!facebookPixelId) },
    { id: 4, shouldSkip: false },
    { id: 5, shouldSkip: false },
    { id: 6, shouldSkip: false },
  ]

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
