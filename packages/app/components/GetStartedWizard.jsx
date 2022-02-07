import React from 'react'
// import PropTypes from 'prop-types'

import GetStartedObjectiveStep from '@/app/GetStartedObjectiveStep'
import GetStartedPlatformStep from '@/app/GetStartedPlatformStep'
import GetStartedWebsiteLinkStep from '@/app/GetStartedWebsiteLinkStep'
import GetStartedPlatformLinkStep from '@/app/GetStartedPlatformLinkStep'
import GetStartedConnectFacebookStep from '@/app/GetStartedConnectFacebookStep'
import GetStartedPostsStep from '@/app/GetStartedPostsStep'
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
      title: 'Platform Link',
      component: <GetStartedPlatformLinkStep />,
    },
    {
      id: 3,
      title: 'Website Link',
      component: <GetStartedWebsiteLinkStep />,
    },
    {
      id: 4,
      title: 'Connect Facebook',
      component: <GetStartedConnectFacebookStep />,
    },
    {
      id: 5,
      title: 'Posts',
      component: <GetStartedPostsStep />,
    },
    {
      id: 6,
      title: 'Ad Account',
      component: <GetStartedAdAccountStep />,
    },
    {
      id: 7,
      title: 'Facebook Pixel',
      component: <GetStartedFacebookPixelStep />,
    },
    {
      id: 8,
      title: 'Home Country',
      component: <GetStartedHomeCountryStep />,
    },
    {
      id: 9,
      title: 'Daily Budget',
      component: <GetStartedDailyBudgetStep />,
    },
    {
      id: 10,
      title: 'Ad Preview',
      component: <GetStartedAdPreviewStep />,
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  React.useEffect(() => {
    setSteps(initialSteps)
  }, [initialSteps])

  return (
    <div className="flex flex-column flex-1">
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
