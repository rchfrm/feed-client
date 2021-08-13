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
  budget,
  defaultPaymentMethod,
}) => {
  const [steps, setSteps] = React.useState([])
  const initialSteps = React.useMemo(() => [
    {
      id: 0,
      title: 'Welcome to Feed!',
      component: <ControlsWizardLinkStep />,
      shouldSkip: Boolean(defaultLinkId),
    },
    {
      id: 1,
      title: 'Posts become ads',
      component: <ControlsWizardPostsStep />,
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
  ], [])

  React.useEffect(() => {
    setSteps(initialSteps.filter((step) => !step.shouldSkip))
  }, [initialSteps])

  React.useEffect(() => {
    setIsWizardActive(true)
  }, [])

  return (
    <div className="flex flex-col h-full">
      {steps.length && (
        <WizardContextProvider steps={steps} hasBackButton>
          {steps.map((step) => <React.Fragment key={step.id}>{step.component}</React.Fragment>)}
        </WizardContextProvider>
      )}
    </div>
  )
}

ControlsWizard.propTypes = {
  setIsWizardActive: PropTypes.func.isRequired,
  defaultLinkId: PropTypes.string.isRequired,
  budget: PropTypes.number.isRequired,
  defaultPaymentMethod: PropTypes.object,
}

ControlsWizard.defaultProps = {
  defaultPaymentMethod: null,
}

export default ControlsWizard
