import React from 'react'
// import PropTypes from 'prop-types'

import ControlsWizardLinkStep from '@/app/ControlsWizardLinkStep'
import ControlsWizardPostsStep from '@/app/ControlsWizardPostsStep'
import ControlsWizardBudgetStep from '@/app/ControlsWizardBudgetStep'
import ControlsWizardPaymentStep from '@/app/ControlsWizardPaymentStep'
import ControlsWizardReviewStep from '@/app/ControlsWizardReviewStep'

import { WizardContextProvider } from '@/app/contexts/WizardContext'

const ControlsWizard = () => {
  const steps = [
    { id: 0, title: 'Welcome to Feed!', shouldSkip: false },
    { id: 1, title: 'Posts become ads', shouldSkip: false },
    { id: 2, title: 'Budget', shouldSkip: false },
    { id: 3, title: 'Payment method', shouldSkip: false },
    { id: 4, title: 'All set!', shouldSkip: false },
  ]

  return (
    <div className="flex flex-col h-full">
      <WizardContextProvider steps={steps} hasNavigation>
        {/* All Wizard steps */}
        <ControlsWizardLinkStep />
        <ControlsWizardPostsStep />
        <ControlsWizardBudgetStep />
        <ControlsWizardPaymentStep />
        <ControlsWizardReviewStep />
      </WizardContextProvider>
    </div>
  )
}

ControlsWizard.propTypes = {
}

export default ControlsWizard
