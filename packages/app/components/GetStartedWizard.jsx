import React from 'react'
// import PropTypes from 'prop-types'

import GetStartedObjectiveStep from '@/app/GetStartedObjectiveStep'
import GetStartedPlatformStep from '@/app/GetStartedPlatformStep'
import GetStartedLinkStep from '@/app/GetStartedLinkStep'

import { WizardContextProvider } from '@/app/contexts/WizardContext'

const GetStartedWizard = () => {
  const [steps, setSteps] = React.useState([])
  const initialSteps = React.useMemo(() => [
    {
      id: 0,
      title: 'What are you hoping to achieve?',
      component: <GetStartedObjectiveStep />,
    },
    {
      id: 1,
      title: 'On which platform?',
      component: <GetStartedPlatformStep />,
    },
    {
      id: 2,
      title: 'Which link do you want to use?',
      component: <GetStartedLinkStep />,
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  React.useEffect(() => {
    setSteps(initialSteps)
  }, [initialSteps])

  return (
    <div>
      {steps.length && (
        <WizardContextProvider steps={steps} hasBackButton>
          {steps.map((step) => <React.Fragment key={step.id}>{step.component}</React.Fragment>)}
        </WizardContextProvider>
      )}
    </div>
  )
}

GetStartedWizard.propTypes = {
}

GetStartedWizard.defaultProps = {
}

export default GetStartedWizard
