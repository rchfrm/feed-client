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
import { getLinkByPlatform, getLinkById, getLinkByHref } from '@/app/helpers/linksHelpers'
import { getStartedSections, updateArtist, getPreferencesObject, profileStatus } from '@/app/helpers/artistHelpers'

import * as ROUTES from '@/app/constants/routes'

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
      name: profileStatus.objective,
      title: 'Your objective',
      section: getStartedSections.objective,
      component: <GetStartedObjective />,
    },
    {
      id: 1,
      name: profileStatus.platform,
      title: 'Your objective',
      section: getStartedSections.objective,
      component: <GetStartedPlatform />,
    },
    {
      id: 2,
      name: profileStatus.defaultLink,
      title: 'Your objective',
      section: getStartedSections.objective,
      component: <GetStartedDefaultLink />,
    },
    {
      id: 3,
      name: profileStatus.connectProfile,
      title: 'Promoting your posts',
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
      name: profileStatus.defaultPostPromotion,
      title: 'Promoting your posts',
      section: getStartedSections.postPromotion,
      component: <GetStartedPostsDefaultSelection />,
    },
    {
      id: 6,
      name: profileStatus.adAccount,
      title: 'Your ad account',
      section: getStartedSections.adAccount,
      component: <GetStartedAdAccount />,
    },
    {
      id: 7,
      name: profileStatus.facebookPixel,
      title: 'Your pixel',
      section: getStartedSections.adAccount,
      component: <GetStartedFacebookPixel />,
    },
    {
      id: 8,
      name: profileStatus.location,
      title: 'Your location',
      section: getStartedSections.adAccount,
      component: <GetStartedLocation />,
      shouldSkip: (Object.keys(locations || {}).length || artist.country_code),
    },
    {
      id: 9,
      name: profileStatus.budget,
      title: 'Budget',
      section: getStartedSections.targeting,
      component: <GetStartedDailyBudget />,
    },
    {
      id: 10,
      title: '',
      component: <GetStartedSummary />,
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [isControlsLoading])

  React.useEffect(() => {
    // Filter out the steps that should be skipped
    setSteps(initialSteps.filter((step) => !step.shouldSkip))
  }, [initialSteps])

  React.useEffect(() => {
    if (!artistId) return

    const { hasSetUpProfile } = artist

    // If set-up already has been completed send the user to the posts page
    if (hasSetUpProfile) {
      Router.push(ROUTES.HOME)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistId])

  // Once a profile has been created we use the data in localstorage to patch the newly created profile with these values
  useAsyncEffect(async (isMounted) => {
    if (
      !isMounted()
      || !artistId
      || [objective, platform, defaultLink].every(Boolean)
      || !wizardState
      || isControlsLoading
    ) {
      return
    }

    const { objective: storedObjective, platform: storedPlatform, defaultLink: storedDefaultLink } = wizardState

    const isFacebookOrInstagram = storedPlatform === 'facebook' || storedPlatform === 'instagram'

    let link = ''

    // If the chosen platform is either Facebook or Instagram we get the link from the linkbank
    if (isFacebookOrInstagram) {
      link = getLinkByPlatform(nestedLinks, storedPlatform)
    } else if (storedObjective === 'growth') {
      // If the objective is growth but the platform is not Facebook or Instagram we save the link as new integration link
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

      if (!currentLink) return

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
      platforms: isFacebookOrInstagram ? [storedPlatform] : [],
    })

    // Remove stored data from localstorage
    localStorage.removeItem('getStartedWizard')
  }, [artistId, objective, platform, defaultLink])

  return (
    <div className="flex flex-column flex-1">
      {steps.length && (
        <WizardContextProvider
          steps={steps}
          goBackToPath={ROUTES.HOME}
          isLoading={isControlsLoading}
          navigation={<GetStartedSummarySentence />}
          profileSetupStatus={profileSetupStatus}
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
