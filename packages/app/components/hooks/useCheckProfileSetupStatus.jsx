import React from 'react'
import useAsyncEffect from 'use-async-effect'

import useControlsStore from '@/app/stores/controlsStore'

import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import { getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'
import { getLinkById } from '@/app/helpers/linksHelpers'
import { getLocalStorage } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  postsPreferences: state.postsPreferences,
  optimizationPreferences: state.optimizationPreferences,
  updateProfileSetUpStatus: state.updateProfileSetUpStatus,
  budget: state.budget,
})

const useCheckProfileSetupStatus = (posts) => {
  const [enabledPosts, setEnabledPosts] = React.useState([posts])
  // Get local storage state
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { objective: storedObjective, platform: storedPlatform, defaultLink: storedDefaultLink } = wizardState || {}

  // Get controls store values
  const {
    nestedLinks,
    postsPreferences,
    optimizationPreferences,
    updateProfileSetUpStatus,
  } = useControlsStore(getControlsStoreState)

  const { defaultPromotionEnabled } = postsPreferences
  const objective = optimizationPreferences.objective || storedObjective
  const platform = optimizationPreferences.platform || storedPlatform
  const defaultLink = getLinkById(nestedLinks, postsPreferences?.defaultLinkId) || storedDefaultLink

  const hasSalesObjective = objective === 'sales'

  // Get artist context values
  const { artist } = React.useContext(ArtistContext)

  const {
    feedMinBudgetInfo: {
      majorUnit: {
        minReccomendedStories,
      } = {},
    },
    daily_budget: dailyBudget,
  } = artist

  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const adAccountId = facebookIntegration?.adaccount_id
  const facebookPixelId = facebookIntegration?.pixel_id
  const hasSufficientBudget = (!hasSalesObjective && Boolean(dailyBudget)) || (hasSalesObjective && dailyBudget >= minReccomendedStories)

  // Get user context value
  const { user } = React.useContext(UserContext)

  // Get targeting context values
  const { locations } = React.useContext(TargetingContext)

  // Define profile setup conditions
  const profileSetupConditions = React.useMemo(() => [
    {
      name: 'objective',
      isComplete: Boolean(objective || wizardState?.objective),
    },
    {
      name: 'platform',
      isComplete: objective !== 'growth' || Boolean(platform || wizardState?.platform),
    },
    {
      name: 'default-link',
      isComplete: Boolean(defaultLink?.href || wizardState?.defaultLink?.href),
    },
    {
      name: 'connect-profile',
      isComplete: Boolean(user.artists.length),
    },
    {
      name: 'posts',
      isComplete: Boolean(enabledPosts.length),
    },
    {
      name: 'default-post-promotion',
      isComplete: defaultPromotionEnabled !== null,
    },
    {
      name: 'ad-account',
      isComplete: Boolean(adAccountId),
    },
    {
      name: 'facebook-pixel',
      isComplete: objective === 'growth' || Boolean(facebookPixelId),
    },
    {
      name: 'location',
      isComplete: (Object.keys(locations || {}).length || artist.country_code),
    },
    {
      name: 'budget',
      isComplete: hasSufficientBudget,
    },
  ], [adAccountId, artist.country_code, defaultLink?.href, locations, defaultPromotionEnabled, facebookPixelId, hasSufficientBudget, objective, platform, enabledPosts, user.artists.length, wizardState?.defaultLink?.href, wizardState?.objective, wizardState?.platform])

  const getProfileSetupStatus = () => {
    const profileStatus = profileSetupConditions.find((condition) => !condition.isComplete)?.name

    return profileStatus
  }

  useAsyncEffect(async () => {
    const profileStatus = getProfileSetupStatus()

    updateProfileSetUpStatus(profileStatus)
  }, [profileSetupConditions])

  return { getProfileSetupStatus, setEnabledPosts }
}

export default useCheckProfileSetupStatus
