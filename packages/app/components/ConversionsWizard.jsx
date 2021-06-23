import React from 'react'
import PropTypes from 'prop-types'

import { WizardContextProvider } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import ConversionsWizardStartingStep from '@/app/ConversionsWizardStartingStep'
import ConversionsWizardBudgetStep from '@/app/ConversionsWizardBudgetStep'
import ConversionsWizardLinkStep from '@/app/ConversionsWizardLinkStep'
import ConversionsWizardFacebookPixelStep from '@/app/ConversionsWizardFacebookPixelStep'
import ConversionsWizardFacebookPixelEventStep from '@/app/ConversionsWizardFacebookPixelEventStep'
import ConversionsWizardCallToActionStep from '@/app/ConversionsWizardCallToActionStep'
import ConversionsWizardPostOptInStep from '@/app/ConversionsWizardPostOptInStep'

const ConversionsWizard = ({ setIsWizardActive }) => {
  const { artist } = React.useContext(ArtistContext)
  const facebookPixelId = artist.integrations.find(integration => integration.platform === 'facebook').pixel_id

  // Steps array which includes logic to skip a wizard step
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
        {/* All Wizard steps */}
        <ConversionsWizardStartingStep setIsWizardActive={setIsWizardActive} />
        <ConversionsWizardBudgetStep />
        <ConversionsWizardLinkStep />
        <ConversionsWizardFacebookPixelStep />
        <ConversionsWizardFacebookPixelEventStep />
        <ConversionsWizardCallToActionStep />
        <ConversionsWizardPostOptInStep setIsWizardActive={setIsWizardActive} />
      </WizardContextProvider>
    </div>
  )
}

ConversionsWizard.propTypes = {
  setIsWizardActive: PropTypes.func.isRequired,
}

export default ConversionsWizard