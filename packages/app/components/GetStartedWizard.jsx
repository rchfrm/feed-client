import React from 'react'
import useAsyncEffect from 'use-async-effect'
import Router from 'next/router'

import { WizardContextProvider } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import useControlsStore from '@/app/stores/controlsStore'
import useSaveLinkToLinkBank from '@/app/hooks/useSaveLinkToLinkBank'
import useSaveIntegrationLink from '@/app/hooks/useSaveIntegrationLink'

import GetStartedObjective from '@/app/GetStartedObjective'
import GetStartedDefaultLink from '@/app/GetStartedDefaultLink'
import GetStartedPricing from '@/app/GetStartedPricing'
import GetStartedConnectFacebook from '@/app/GetStartedConnectFacebook'
import GetStartedPostsSelection from '@/app/GetStartedPostsSelection'
import GetStartedAdAccount from '@/app/GetStartedAdAccount'
import GetStartedLocation from '@/app/GetStartedLocation'
import GetStartedDailyBudget from '@/app/GetStartedDailyBudget'
import GetStartedPaymentMethod from '@/app/GetStartedPaymentMethod'
import GetStartedSummary from '@/app/GetStartedSummary'
import GetStartedSummarySentence from '@/app/GetStartedSummarySentence'

import { getLocalStorage } from '@/helpers/utils'
import { getLinkByPlatform, getLinkById, getLinkByHref } from '@/app/helpers/linksHelpers'
import { getStartedSections, updateArtist, getPreferencesObject, profileStatus } from '@/app/helpers/artistHelpers'

import * as ROUTES from '@/app/constants/routes'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  updateLinks: state.updateLinks,
  updatePreferences: state.updatePreferences,
  optimizationPreferences: state.optimizationPreferences,
  postsPreferences: state.postsPreferences,
  profileSetupStatus: state.profileSetupStatus,
  isControlsLoading: state.isControlsLoading,
})

const GetStartedWizard = () => {
  const [steps, setSteps] = React.useState([])

  const { user } = React.useContext(UserContext)
  const { artistId, artist, setPostPreferences } = React.useContext(ArtistContext)
  const { plan, is_managed: isManaged } = artist
  const hasFreePlan = plan?.includes('free')

  const [stripePromise] = React.useState(() => loadStripe(process.env.stripe_provider))

  const {
    nestedLinks,
    updateLinks,
    updatePreferences,
    optimizationPreferences,
    postsPreferences,
    profileSetupStatus,
    isControlsLoading,
  } = useControlsStore(getControlsStoreState)

  const { objective, platform } = optimizationPreferences
  const defaultLink = getLinkById(nestedLinks, postsPreferences?.defaultLinkId)

  const saveLinkToLinkBank = useSaveLinkToLinkBank()
  const saveIntegrationLink = useSaveIntegrationLink()

  const { targetingState, saveTargetingSettings, locations } = React.useContext(TargetingContext)
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))

  // Define wizard steps
  const initialSteps = React.useMemo(() => [
    {
      id: 0,
      name: profileStatus.platform,
      title: 'Your objective',
      section: getStartedSections.objective,
      component: <GetStartedObjective />,
    },
    {
      id: 1,
      name: profileStatus.defaultLink,
      title: 'Your objective',
      section: getStartedSections.objective,
      component: <GetStartedDefaultLink />,
    },
    {
      id: 2,
      name: profileStatus.pricingPlan,
      title: 'Your plan',
      section: getStartedSections.pricingPlan,
      component: <GetStartedPricing />,
      shouldSkip: isManaged,
    },
    {
      id: 3,
      name: profileStatus.connectProfile,
      title: 'Connect your profiles',
      section: getStartedSections.postPromotion,
      component: <GetStartedConnectFacebook />,
      shouldSkip: Boolean(user.artists.length),
    },
    {
      id: 4,
      name: profileStatus.posts,
      title: 'Promoting your posts',
      section: getStartedSections.postPromotion,
      component: <GetStartedPostsSelection />,
    },
    {
      id: 5,
      name: profileStatus.adAccount,
      title: 'Your ad account',
      section: getStartedSections.adAccount,
      component: <GetStartedAdAccount />,
    },
    {
      id: 6,
      name: profileStatus.location,
      title: 'Your location',
      section: getStartedSections.adAccount,
      component: <GetStartedLocation />,
      shouldSkip: (Object.keys(locations || {}).length || artist.country_code),
    },
    {
      id: 7,
      name: profileStatus.budget,
      title: 'Budget',
      section: getStartedSections.targeting,
      component: <GetStartedDailyBudget />,
    },
    {
      id: 8,
      name: profileStatus.paymentMethod,
      title: 'Your payment method',
      section: getStartedSections.targeting,
      component: <Elements stripe={stripePromise}><GetStartedPaymentMethod /></Elements>,
      shouldSkip: hasFreePlan || isManaged,
    },
    {
      id: 9,
      name: profileStatus.confirmSetup,
      title: '',
      component: <GetStartedSummary />,
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [isControlsLoading, hasFreePlan, isManaged])

  React.useEffect(() => {
    // Filter out the steps that should be skipped
    setSteps(initialSteps.filter((step) => ! step.shouldSkip))
  }, [initialSteps])

  React.useEffect(() => {
    if (! artistId) return

    const { hasSetUpProfile } = artist

    // If set-up already has been completed send the user to the posts page
    if (hasSetUpProfile) {
      Router.push(ROUTES.HOME)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistId])

  // Once a profile has been created we use the data in local storage to patch the newly created profile with these values
  useAsyncEffect(async (isMounted) => {
    if (
      ! isMounted()
      || ! artistId
      || [objective, platform, defaultLink].every(Boolean)
      || ! wizardState
      || isControlsLoading
    ) {
      return
    }

    const {
      objective: storedObjective,
      platform: storedPlatform,
      defaultLink: storedDefaultLink,
    } = wizardState

    const isInstagram = storedPlatform === 'instagram'

    let link = ''

    // If the chosen platform is Instagram we get the link from the linkbank
    if (isInstagram) {
      link = getLinkByPlatform(nestedLinks, storedPlatform)
    } else if (storedObjective === 'growth') {
      // Otherwise we save the link as new integration link
      const { savedLink, error } = await saveIntegrationLink({ platform: storedPlatform }, storedDefaultLink?.href)

      if (error) {
        return
      }

      link = savedLink
    } else {
      let action = 'add'

      // Check if the link already exists in the linkbank
      const existingLink = getLinkByHref(nestedLinks, storedDefaultLink?.href)
      const currentLink = existingLink || storedDefaultLink

      if (! currentLink) return

      if (existingLink) {
        action = 'edit'
      }

      // Otherwise user has provided a custom link and we save it to the linkbank
      const { savedLink, error } = await saveLinkToLinkBank(currentLink, action)

      if (error) {
        return
      }

      link = savedLink
    }

    // Patch the profile
    const { res: updatedArtist, error } = await updateArtist(artist, { ...wizardState, defaultLink: link?.id })

    if (error) {
      return
    }

    // Set the new link as the default link
    updateLinks('chooseNewDefaultLink', { newArtist: updatedArtist, newLink: link })

    // Update artist status
    setPostPreferences('default_link_id', link.id)

    // Update preferences in controls store
    updatePreferences(getPreferencesObject(updatedArtist))

    // Update targeting values
    saveTargetingSettings({
      ...targetingState,
      platforms: isInstagram ? [storedPlatform] : [],
    })

    // Remove stored data from localstorage
    localStorage.removeItem('getStartedWizard')
  }, [artistId, objective, platform, defaultLink])

  return (
    <div className="flex flex-column flex-1 md:pl-20">
      {steps.length && (
        <WizardContextProvider
          steps={steps}
          goBackToPath={ROUTES.HOME}
          isControlsLoading={isControlsLoading}
          navigation={<GetStartedSummarySentence />}
          profileSetupStatus={profileSetupStatus}
          artistId={artistId}
        >
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
