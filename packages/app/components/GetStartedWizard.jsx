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
  const objective = 'growth'
  const platform = 'soundcloud'
  const defaultLinkId = 'set'
  const missingScopes = []
  const posts = ['post', 'post']
  const adAccountId = 'set'
  const facebookPixel = 'set'
  const locations = ['UK']
  const countryCode = ''
  const budget = 5

  const steps = [
    {
      id: 0,
      title: 'What are you hoping to achieve?',
      component: <GetStartedObjectiveStep />,
      isComplete: Boolean(objective),
    },
    {
      id: 1,
      title: 'On which platform?',
      component: <GetStartedPlatformStep />,
      isComplete: Boolean(platform),
      shouldSkip: objective !== 'growth',
    },
    {
      id: 2,
      title: 'Platform Link',
      component: <GetStartedPlatformLinkStep />,
      isComplete: Boolean(defaultLinkId),
      shouldSkip: objective !== 'growth' || platform === 'facebook' || platform === 'instagram',
    },
    {
      id: 3,
      title: 'Website Link',
      component: <GetStartedWebsiteLinkStep />,
      isComplete: Boolean(defaultLinkId),
      shouldSkip: objective === 'growth',
    },
    {
      id: 4,
      title: 'Connect Facebook',
      component: <GetStartedConnectFacebookStep />,
      isComplete: missingScopes.length === 0,
    },
    {
      id: 5,
      title: 'Posts',
      component: <GetStartedPostsStep />,
      isComplete: posts.length > 0,
    },
    {
      id: 6,
      title: 'Ad Account',
      component: <GetStartedAdAccountStep />,
      isComplete: Boolean(adAccountId),
    },
    {
      id: 7,
      title: 'Facebook Pixel',
      component: <GetStartedFacebookPixelStep />,
      isComplete: Boolean(facebookPixel),
      shouldSkip: objective === 'growth',
    },
    {
      id: 8,
      title: 'Home Country',
      component: <GetStartedHomeCountryStep />,
      isComplete: Object.keys(locations).length > 0 || Boolean(countryCode),
      shouldSkip: Object.keys(locations).length > 0 || Boolean(countryCode),
    },
    {
      id: 9,
      title: 'Daily Budget',
      component: <GetStartedDailyBudgetStep />,
      isComplete: Boolean(budget),
    },
    {
      id: 10,
      title: 'Ad Preview',
      component: <GetStartedAdPreviewStep />,
      isComplete: false,
    },
  ]

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
