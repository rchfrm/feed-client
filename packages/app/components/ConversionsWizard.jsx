import React from 'react'
import PropTypes from 'prop-types'

import { WizardContextProvider } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import ConversionsWizardStartingStep from '@/app/ConversionsWizardStartingStep'
import ConversionsWizardBudgetStep from '@/app/ConversionsWizardBudgetStep'
import ConversionsWizardLinkStep from '@/app/ConversionsWizardLinkStep'
import ConversionsWizardFacebookPixelStep from '@/app/ConversionsWizardFacebookPixelStep'
import ConversionsWizardFacebookPixelEventStep from '@/app/ConversionsWizardFacebookPixelEventStep'
import ConversionsWizardCallToActionStep from '@/app/ConversionsWizardCallToActionStep'
import ConversionsWizardPostOptInStep from '@/app/ConversionsWizardPostOptInStep'

const getControlsStoreState = (state) => ({
  conversionsPreferences: state.conversionsPreferences,
  budget: state.budget,
  minConversionsBudget: state.minConversionsBudget,
})

const ConversionsWizard = ({ setIsWizardActive }) => {
  const { artist } = React.useContext(ArtistContext)
  const { conversionsPreferences, budget, minConversionsBudget } = useControlsStore(getControlsStoreState)
  const { callToAction, defaultLinkId, facebookPixelEvent } = conversionsPreferences
  const facebookPixelId = artist.integrations.find(integration => integration.platform === 'facebook').pixel_id

  // Steps array which includes logic to skip a wizard step
  const steps = [
    { id: 0, shouldSkip: false },
    { id: 1, shouldSkip: budget >= minConversionsBudget },
    { id: 2, shouldSkip: Boolean(facebookPixelId && facebookPixelId !== '-1') },
    { id: 3, shouldSkip: Boolean(defaultLinkId) },
    { id: 4, shouldSkip: Boolean(facebookPixelEvent) },
    { id: 5, shouldSkip: Boolean(callToAction) },
    { id: 6, shouldSkip: false },
  ]

  return (
    <div>
      <WizardContextProvider steps={steps}>
        {/* All Wizard steps */}
        <ConversionsWizardStartingStep setIsWizardActive={setIsWizardActive} />
        <ConversionsWizardBudgetStep />
        <ConversionsWizardFacebookPixelStep />
        <ConversionsWizardLinkStep />
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
