import React from 'react'
import PropTypes from 'prop-types'

import GetStartedObjective from '@/app/GetStartedObjective'
import GetStartedPlatform from '@/app/GetStartedPlatform'
import GetStartedDefaultLink from '@/app/GetStartedDefaultLink'
import GetStartedConnectFacebook from '@/app/GetStartedConnectFacebook'
import GetStartedPostsSelection from '@/app/GetStartedPostsSelection'
import GetStartedPostsDefaultSelection from '@/app/GetStartedPostsDefaultSelection'
import GetStartedAdAccount from '@/app/GetStartedAdAccount'
import GetStartedFacebookPixel from '@/app/GetStartedFacebookPixel'
import GetStartedLocation from '@/app/GetStartedLocation'
import GetStartedDailyBudget from '@/app/GetStartedDailyBudget'
import GetStartedReview from '@/app/GetStartedReview'

import Spinner from '@/elements/Spinner'

import { WizardContextProvider } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import * as ROUTES from '@/app/constants/routes'

const GetStartedWizard = ({
  isLoading,
  objective,
  platform,
  defaultLink,
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
      component: <GetStartedObjective />,
      isComplete: Boolean(objective),
    },
    {
      id: 1,
      title: 'Platform',
      component: <GetStartedPlatform />,
      isComplete: Boolean(platform),
      shouldSkip: objective !== 'growth',
    },
    {
      id: 2,
      title: 'Default link',
      component: <GetStartedDefaultLink defaultLink={defaultLink} />,
      isComplete: Boolean(defaultLink),
      shouldSkip: objective === 'growth' && (platform === 'facebook' || platform === 'instagram'),
    },
    {
      id: 3,
      title: 'Connect Facebook',
      component: <GetStartedConnectFacebook scopes={missingScopes} />,
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
      component: <GetStartedAdAccount />,
      isComplete: Boolean(adAccountId),
    },
    {
      id: 7,
      title: 'Facebook Pixel',
      component: <GetStartedFacebookPixel />,
      isComplete: Boolean(facebookPixelId),
      shouldSkip: objective === 'growth',
    },
    {
      id: 8,
      title: 'Home Country',
      component: <GetStartedLocation />,
      isComplete: hasLocation,
      shouldSkip: hasLocation,
    },
    {
      id: 9,
      title: 'Daily Budget',
      component: <GetStartedDailyBudget />,
      isComplete: Boolean(budget),
    },
    {
      id: 10,
      title: 'Congrats!',
      component: <GetStartedReview />,
      isComplete: false,
    },
  ]

  return (
    <div className="flex flex-column flex-1">
      {steps.length && (
        <WizardContextProvider steps={steps} goBackToPath={ROUTES.HOME} hasBackButton>
          {isLoading ? (
            <Spinner />
          ) : (
            steps.map((step) => <React.Fragment key={step.id}>{step.component}</React.Fragment>)
          )}
        </WizardContextProvider>
      )}
    </div>
  )
}

GetStartedWizard.propTypes = {
  objective: PropTypes.string,
  platform: PropTypes.string,
  defaultLink: PropTypes.string,
  missingScopes: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  adAccountId: PropTypes.string,
  facebookPixelId: PropTypes.string,
  locations: PropTypes.object.isRequired,
  budget: PropTypes.number.isRequired,
}

GetStartedWizard.defaultProps = {
  objective: '',
  platform: '',
  facebookPixelId: '',
  defaultLink: '',
  adAccountId: '',
}

export default GetStartedWizard
