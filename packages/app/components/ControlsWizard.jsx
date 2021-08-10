import React from 'react'
import PropTypes from 'prop-types'

import ControlsWizardLinkStep from '@/app/ControlsWizardLinkStep'
import ControlsWizardPostsStep from '@/app/ControlsWizardPostsStep'
import ControlsWizardBudgetStep from '@/app/ControlsWizardBudgetStep'
import ControlsWizardPaymentStep from '@/app/ControlsWizardPaymentStep'
import ControlsWizardReviewStep from '@/app/ControlsWizardReviewStep'

import { WizardContextProvider } from '@/app/contexts/WizardContext'

const ControlsWizard = ({
  setIsWizardActive,
  defaultLinkId,
  defaultPromotionEnabled,
  budget,
  defaultPaymentMethod,
}) => {
  const steps = [
    { id: 0, title: 'Welcome to Feed!', shouldSkip: Boolean(defaultLinkId) },
    { id: 1, title: 'Posts become ads', shouldSkip: defaultPromotionEnabled !== 'null' },
    { id: 2, title: 'Budget', shouldSkip: Boolean(budget) },
    { id: 3, title: 'Payment method', shouldSkip: Boolean(defaultPaymentMethod) },
    { id: 4, title: 'All set!', shouldSkip: false },
  ]

  return (
    <div className="flex flex-col h-full">
      <WizardContextProvider steps={steps} hasNavigation>
        {/* All Wizard steps */}
        <ControlsWizardLinkStep setIsWizardActive={setIsWizardActive} />
        <ControlsWizardPostsStep />
        <ControlsWizardBudgetStep />
        <ControlsWizardPaymentStep />
        <ControlsWizardReviewStep setIsWizardActive={setIsWizardActive} />
      </WizardContextProvider>
    </div>
  )
}

ControlsWizard.propTypes = {
  setIsWizardActive: PropTypes.func.isRequired,
  defaultLinkId: PropTypes.string.isRequired,
  defaultPromotionEnabled: PropTypes.bool.isRequired,
  budget: PropTypes.number.isRequired,
  defaultPaymentMethod: PropTypes.object,
}

ControlsWizard.defaultProps = {
  defaultPaymentMethod: null,
}

export default ControlsWizard
