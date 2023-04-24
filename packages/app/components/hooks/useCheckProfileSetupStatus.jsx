import React from 'react'
import useControlsStore from '@/app/stores/controlsStore'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { getArtistIntegrationByPlatform, profileStatus } from '@/app/helpers/artistHelpers'
import { getLinkById } from '@/app/helpers/linksHelpers'
import { getLocalStorage } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  postsPreferences: state.postsPreferences,
  optimizationPreferences: state.optimizationPreferences,
  updateProfileSetUpStatus: state.updateProfileSetUpStatus,
  budget: state.budget,
})

const useCheckProfileSetupStatus = () => {
  // Get local storage state
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { platform: storedPlatform, defaultLink: storedDefaultLink } = wizardState || {}

  // Get controls store values
  const {
    nestedLinks,
    postsPreferences,
    optimizationPreferences,
  } = useControlsStore(getControlsStoreState)

  const platform = optimizationPreferences.platform || storedPlatform
  const defaultLink = getLinkById(nestedLinks, postsPreferences?.defaultLinkId) || storedDefaultLink

  // Get artist context values
  const { artist, enabledPosts } = React.useContext(ArtistContext)

  const {
    daily_budget: dailyBudget,
    plan,
    is_managed: isManaged,
  } = artist

  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const adAccountId = facebookIntegration?.adaccount_id

  // Get user context value
  const { user } = React.useContext(UserContext)

  // Get targeting context values
  const { locations } = React.useContext(TargetingContext)

  // Define profile setup conditions
  const profileSetupConditions = React.useMemo(() => [
    {
      name: profileStatus.platform,
      isComplete: Boolean(platform || wizardState?.platform),
    },
    {
      name: profileStatus.defaultLink,
      isComplete: Boolean(defaultLink?.href || wizardState?.defaultLink?.href),
    },
    {
      name: profileStatus.pricingPlan,
      isComplete: Boolean(plan || wizardState?.plan) || isManaged,
    },
    {
      name: profileStatus.connectProfile,
      isComplete: Boolean(user.artists.length),
    },
    {
      name: profileStatus.posts,
      isComplete: Boolean(enabledPosts.length),
    },
    {
      name: profileStatus.adAccount,
      isComplete: Boolean(adAccountId),
    },
    {
      name: profileStatus.location,
      isComplete: (Object.keys(locations || {}).length || artist.country_code),
    },
    {
      name: profileStatus.budget,
      isComplete: Boolean(dailyBudget),
    },
    {
      name: profileStatus.paymentMethod,
      isComplete: isManaged || plan === 'free',
    },
  ], [platform, wizardState?.platform, wizardState?.defaultLink?.href, wizardState?.plan, defaultLink?.href, plan, isManaged, user.artists.length, enabledPosts.length, adAccountId, locations, artist.country_code, dailyBudget])

  const getProfileSetupStatus = () => {
    return profileSetupConditions.find((condition) => ! condition.isComplete)?.name
  }

  return { getProfileSetupStatus, profileSetupConditions }
}

export default useCheckProfileSetupStatus
