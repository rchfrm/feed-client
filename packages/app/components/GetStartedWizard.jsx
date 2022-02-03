import React from 'react'
// import PropTypes from 'prop-types'

import GetStartedObjectiveStep from '@/app/GetStartedObjectiveStep'
import GetStartedPlatformStep from '@/app/GetStartedPlatformStep'
import GetStartedWebsiteLinkStep from '@/app/GetStartedWebsiteLinkStep'
import GetStartedPlatformLinkStep from '@/app/GetStartedPlatformLinkStep'
import GetStartedConnectFacebookStep from '@/app/GetStartedConnectFacebookStep'
import GetStartedAnalysePostsStep from '@/app/GetStartedAnalysePostsStep'
import GetStartedChoosePostsStep from '@/app/GetStartedChoosePostsStep'
import GetStartedAdAccountStep from '@/app/GetStartedAdAccountStep'
import GetStartedFacebookPixelStep from '@/app/GetStartedFacebookPixelStep'
import GetStartedHomeCountryStep from '@/app/GetStartedHomeCountryStep'
import GetStartedDailyBudgetStep from '@/app/GetStartedDailyBudgetStep'
import GetStartedAdPreviewStep from '@/app/GetStartedAdPreviewStep'

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
      title: 'Platform Link?',
      component: <GetStartedPlatformLinkStep />,
    },
    {
      id: 3,
      title: 'Website Link?',
      component: <GetStartedWebsiteLinkStep />,
    },
    {
      id: 4,
      title: 'Connect Facebook?',
      component: <GetStartedConnectFacebookStep />,
    },
    {
      id: 5,
      title: 'Analyse Posts?',
      component: <GetStartedAnalysePostsStep />,
    },
    {
      id: 6,
      title: 'Choose Posts?',
      component: <GetStartedChoosePostsStep />,
    },
    {
      id: 7,
      title: 'Ad Account?',
      component: <GetStartedAdAccountStep />,
    },
    {
      id: 8,
      title: 'Facebook Pixel?',
      component: <GetStartedFacebookPixelStep />,
    },
    {
      id: 9,
      title: 'Home Country?',
      component: <GetStartedHomeCountryStep />,
    },
    {
      id: 10,
      title: 'Daily Budget?',
      component: <GetStartedDailyBudgetStep />,
    },
    {
      id: 11,
      title: 'Ad Preview?',
      component: <GetStartedAdPreviewStep />,
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  React.useEffect(() => {
    setSteps(initialSteps)
  }, [initialSteps])

  return (
    <div className="h-full flex flex-column flex-1">
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
