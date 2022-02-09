import React from 'react'
import PropTypes from 'prop-types'

import GetStartedObjectiveStep from '@/app/GetStartedObjectiveStep'
import GetStartedPlatformStep from '@/app/GetStartedPlatformStep'
import GetStartedDefaultLinkStep from '@/app/GetStartedDefaultLinkStep'
import GetStartedConnectFacebookStep from '@/app/GetStartedConnectFacebookStep'
import GetStartedPostsSelection from '@/app/GetStartedPostsSelection'
import GetStartedPostsDefaultSelection from '@/app/GetStartedPostsDefaultSelection'
import GetStartedAdAccountStep from '@/app/GetStartedAdAccountStep'
import GetStartedFacebookPixelStep from '@/app/GetStartedFacebookPixelStep'
import GetStartedLocationStep from '@/app/GetStartedLocationStep'
import GetStartedDailyBudgetStep from '@/app/GetStartedDailyBudgetStep'
import GetStartedReviewStep from '@/app/GetStartedReviewStep'

import { WizardContextProvider } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

const GetStartedWizard = ({
  objective,
  platform,
  defaultLinkId,
  missingScopes,
  posts,
  adAccountId,
  facebookPixelId,
  locations,
  budget,
}) => {
  const { artist } = React.useContext(ArtistContext)
  const hasLocation = Object.keys(locations).length > 0 || Boolean(artist?.country_code)

  const steps = [
    {
      id: 0,
      title: 'Objective',
      component: <GetStartedObjectiveStep />,
      isComplete: Boolean(objective),
    },
    {
      id: 1,
      title: 'Platform',
      component: <GetStartedPlatformStep />,
      isComplete: Boolean(platform),
      shouldSkip: objective !== 'growth',
    },
    {
      id: 2,
      title: 'Default link',
      component: <GetStartedDefaultLinkStep />,
      isComplete: Boolean(defaultLinkId),
      shouldSkip: objective === 'growth' && (platform === 'facebook' || platform === 'instagram'),
    },
    {
      id: 3,
      title: 'Connect Facebook',
      component: <GetStartedConnectFacebookStep scopes={missingScopes} />,
      isComplete: missingScopes.length !== 0,
    },
    {
      id: 4,
      title: 'Posts selection',
      component: <GetStartedPostsSelection />,
      isComplete: posts.length > 0,
    },
    {
      id: 5,
      title: 'Default posts selection',
      component: <GetStartedPostsDefaultSelection />,
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
      isComplete: Boolean(facebookPixelId),
      shouldSkip: objective === 'growth',
    },
    {
      id: 8,
      title: 'Home Country',
      component: <GetStartedLocationStep />,
      isComplete: hasLocation,
      shouldSkip: hasLocation,
    },
    {
      id: 9,
      title: 'Daily Budget',
      component: <GetStartedDailyBudgetStep />,
      isComplete: Boolean(budget),
    },
    {
      id: 10,
      title: 'Congrats!',
      component: <GetStartedReviewStep />,
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
  objective: PropTypes.string,
  platform: PropTypes.string,
  defaultLinkId: PropTypes.string.isRequired,
  missingScopes: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  adAccountId: PropTypes.string.isRequired,
  facebookPixelId: PropTypes.string,
  locations: PropTypes.object.isRequired,
  budget: PropTypes.number.isRequired,
}

GetStartedWizard.defaultProps = {
  objective: '',
  platform: '',
  facebookPixelId: '',
}

export default GetStartedWizard
