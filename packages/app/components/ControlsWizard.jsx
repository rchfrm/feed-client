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
  const [steps, setSteps] = React.useState([])
  const initialSteps = React.useMemo(() => [
    {
      id: 0,
      title: 'Welcome to Feed!',
      component: <ControlsWizardLinkStep setIsWizardActive={setIsWizardActive} />,
      shouldSkip: Boolean(defaultLinkId),
    },
    {
      id: 1,
      title: 'Posts become ads',
      component: <ControlsWizardPostsStep defaultPromotionEnabled={defaultPromotionEnabled} />,
      shouldSkip: false,
    },
    {
      id: 2,
      title: 'Budget',
      component: <ControlsWizardBudgetStep />,
      shouldSkip: Boolean(budget),
    },
    {
      id: 3,
      title: 'Payment method',
      component: <ControlsWizardPaymentStep />,
      shouldSkip: Boolean(defaultPaymentMethod),
    },
    {
      id: 4,
      title: 'All set!',
      component: <ControlsWizardReviewStep setIsWizardActive={setIsWizardActive} />,
      shouldSkip: false,
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [defaultPromotionEnabled, setIsWizardActive])

  React.useEffect(() => {
    setSteps(initialSteps.filter((step) => !step.shouldSkip))
  }, [initialSteps])

  return (
    <div className="flex flex-col h-full">
      {steps.length && (
        <WizardContextProvider steps={steps} hasBackButton>
          {steps.map((step) => step.component)}
        </WizardContextProvider>
      )}
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
