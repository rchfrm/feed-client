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

  const [steps, setSteps] = React.useState([])
  // Steps array which includes logic to skip a wizard step
  const initialSteps = React.useMemo(() => [
    {
      id: 0,
      title: 'Set up Conversions',
      component: <ConversionsWizardStartingStep />,
      shouldSkip: false,
    },
    { id: 1,
      title: 'Budget',
      component: <ConversionsWizardBudgetStep />,
      shouldSkip: budget >= minConversionsBudget,
    },
    {
      id: 2,
      title: 'Facebook Pixel',
      component: <ConversionsWizardFacebookPixelStep />,
      shouldSkip: facebookPixelId && facebookPixelId !== '-1',
    },
    {
      id: 3,
      title: 'Default Link',
      component: <ConversionsWizardLinkStep />,
      shouldSkip: Boolean(defaultLinkId),
    },
    { id: 4,
      title: 'Facebook Pixel Event',
      component: <ConversionsWizardFacebookPixelEventStep />,
      shouldSkip: Boolean(facebookPixelEvent),
    },
    {
      id: 5,
      title: 'Call to Action',
      component: <ConversionsWizardCallToActionStep />,
      shouldSkip: Boolean(callToAction),
    },
    {
      id: 6,
      title: 'Get going',
      component: <ConversionsWizardPostOptInStep setIsWizardActive={setIsWizardActive} />,
      shouldSkip: false,
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  React.useEffect(() => {
    // Filter out the steps that should be skipped
    setSteps(initialSteps.filter((step) => !step.shouldSkip))
  }, [initialSteps])

  React.useEffect(() => {
    setIsWizardActive(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {steps.length && (
        <WizardContextProvider steps={steps}>
          {/* All Wizard steps */}
          {steps.map((step) => <React.Fragment key={step.id}>{step.component}</React.Fragment>)}
        </WizardContextProvider>
      )}
    </div>
  )
}

ConversionsWizard.propTypes = {
  setIsWizardActive: PropTypes.func.isRequired,
}

export default ConversionsWizard
