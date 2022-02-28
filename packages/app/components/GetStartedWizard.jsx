import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { WizardContextProvider } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import useControlsStore from '@/app/stores/controlsStore'
import useSaveLinkToLinkBank from '@/app/hooks/useSaveLinkToLinkBank'

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
import GetStartedSummary from '@/app/GetStartedSummary'
import GetStartedSummarySentence from '@/app/GetStartedSummarySentence'

import { getLocalStorage } from '@/helpers/utils'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'
import { getStartedSections, updateArtist } from '@/app/helpers/artistHelpers'


import * as ROUTES from '@/app/constants/routes'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
  updatePreferences: state.updatePreferences,
})

const GetStartedWizard = ({
  isLoading,
  objective,
  platform,
  defaultLink,
  posts,
  defaultPromotionEnabled,
  adAccountId,
  facebookPixelId,
  locations,
  budget,
}) => {
  const [steps, setSteps] = React.useState([])
  const { user } = React.useContext(UserContext)
  const { artistId, artist } = React.useContext(ArtistContext)
  const hasLocation = Object.keys(locations).length > 0 || Boolean(artist?.country_code)

  const {
    nestedLinks,
    updateLinks,
    updatePreferences,
  } = useControlsStore(getControlsStoreState)

  const saveLinkToLinkBank = useSaveLinkToLinkBank()
  const { targetingState, saveTargetingSettings } = React.useContext(TargetingContext)
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))

  const initialSteps = React.useMemo(() => [
    {
      id: 0,
      title: 'Your objective',
      section: getStartedSections.objective,
      component: <GetStartedObjective />,
      isComplete: Boolean(objective || wizardState?.objective),
    },
    {
      id: 1,
      title: 'Your objective',
      section: getStartedSections.objective,
      component: <GetStartedPlatform />,
      isComplete: Boolean(platform || wizardState?.platform),
      isApplicable: objective === 'growth',
    },
    {
      id: 2,
      title: 'Your objective',
      section: getStartedSections.objective,
      component: <GetStartedDefaultLink defaultLink={defaultLink || wizardState?.defaultLink} />,
      isComplete: Boolean(defaultLink || wizardState?.defaultLink),
      isApplicable: objective !== 'growth' && (platform !== 'facebook' || platform !== 'instagram'),
    },
    {
      id: 3,
      title: 'Promoting your posts',
      section: getStartedSections.postPromotion,
      component: <GetStartedConnectFacebook />,
      isComplete: Boolean(user.artists.length),
    },
    {
      id: 4,
      title: 'Promoting your posts',
      section: getStartedSections.postPromotion,
      component: <GetStartedPostsSelection activePosts={posts} />,
      isComplete: posts.length > 0,
    },
    {
      id: 5,
      title: 'Promoting your posts',
      section: getStartedSections.postPromotion,
      component: <GetStartedPostsDefaultSelection />,
      isComplete: defaultPromotionEnabled !== null,
    },
    {
      id: 6,
      title: 'Your ad account',
      section: getStartedSections.adAccount,
      component: <GetStartedAdAccount />,
      isComplete: Boolean(adAccountId),
    },
    {
      id: 7,
      title: 'Your ad account',
      section: getStartedSections.adAccount,
      component: <GetStartedFacebookPixel />,
      isComplete: Boolean(facebookPixelId),
      isApplicable: objective !== 'growth',
    },
    {
      id: 8,
      title: 'Your ad account',
      section: getStartedSections.adAccount,
      component: <GetStartedLocation />,
      isComplete: hasLocation,
      shouldSkip: hasLocation,
    },
    {
      id: 9,
      title: 'Targeting',
      section: getStartedSections.targeting,
      component: <GetStartedDailyBudget />,
      isComplete: Boolean(budget),
    },
    {
      id: 10,
      title: '',
      component: <GetStartedSummary />,
      isComplete: false,
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  React.useEffect(() => {
    // Filter out the steps that should be skipped completely
    setSteps(initialSteps.filter((step) => !step.shouldSkip))
  }, [initialSteps])

  useAsyncEffect(async (isMounted) => {
    if (
      !isMounted()
      || !artistId
      || [objective, platform, defaultLink].every(Boolean)
      || isLoading
      || !wizardState
    ) {
      return
    }

    const { platform: storedPlatform, defaultLink: storedDefaultLink } = wizardState
    let link = ''

    // If user has provided a link then save it to the linkbank
    if (storedDefaultLink) {
      const { savedLink, error } = await saveLinkToLinkBank(storedDefaultLink)

      if (error) {
        return
      }

      link = savedLink
    } else {
      // Otherwise get the link from the linkbank based on previously chosen platform (either Facebook or Instagram)
      link = getLinkByPlatform(nestedLinks, storedPlatform)
    }

    const { res: artist, error } = await updateArtist(artistId, { ...wizardState, defaultLink: link.id })

    if (error) {
      return
    }

    // Set the new link as the default link
    updateLinks('chooseNewDefaultLink', { newArtist: artist })

    const currentObjective = artist.preferences.optimization.objective

    // Update preferences in controls store
    updatePreferences({
      postsPreferences: {
        callToAction: artist.preferences.posts.call_to_action,
        defaultLinkId: artist.preferences.posts.default_link_id,
        promotionEnabled: artist.preferences.posts.promotion_enabled_default,
      },
      optimizationPreferences: {
        objective: artist.preferences.optimization.objective,
        platform: artist.preferences.optimization.platform,
      },
      conversionsPreferences: {
        ...(currentObjective === 'sales' && { callToAction: artist.preferences.conversions.call_to_action }),
        ...((currentObjective === 'sales' || currentObjective === 'traffic') && { facebookPixelEvent: artist.preferences.conversions.facebook_pixel_event }),
      },
    })

    const isFacebookOrInstagram = platform === 'facebook' || platform === 'instagram'

    saveTargetingSettings({
      ...targetingState,
      platforms: isFacebookOrInstagram ? [platform] : [],
    })

    localStorage.removeItem('getStartedWizard')
  }, [artistId, isLoading, objective, platform, defaultLink])

  return (
    <div className="flex flex-column flex-1">
      <WizardContextProvider
        steps={steps}
        goBackToPath={ROUTES.HOME}
        isLoading={isLoading}
        navigation={<GetStartedSummarySentence />}
      >
        {steps.map((step) => <React.Fragment key={step.id}>{step.component}</React.Fragment>)}
      </WizardContextProvider>
    </div>
  )
}

GetStartedWizard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  objective: PropTypes.string,
  platform: PropTypes.string,
  defaultLink: PropTypes.object,
  posts: PropTypes.array.isRequired,
  defaultPromotionEnabled: PropTypes.bool,
  adAccountId: PropTypes.string,
  facebookPixelId: PropTypes.string,
  locations: PropTypes.object.isRequired,
  budget: PropTypes.number.isRequired,
}

GetStartedWizard.defaultProps = {
  objective: '',
  platform: '',
  defaultLink: null,
  defaultPromotionEnabled: null,
  adAccountId: '',
  facebookPixelId: '',
}

export default GetStartedWizard
