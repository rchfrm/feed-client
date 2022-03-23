import React from 'react'
import useAsyncEffect from 'use-async-effect'

import useControlsStore from '@/app/stores/controlsStore'

import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import { getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'
import { getLinkById } from '@/app/helpers/linksHelpers'
import { formatRecentPosts } from '@/app/helpers/resultsHelpers'
import { getLocalStorage } from '@/helpers/utils'

import * as server from '@/app/helpers/appServer'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  postsPreferences: state.postsPreferences,
  optimizationPreferences: state.optimizationPreferences,
  updateProfileSetUpStatus: state.updateProfileSetUpStatus,
  budget: state.budget,
})

const useCheckProfileSetupStatus = () => {
  const [posts, setPosts] = React.useState([])
  // Get local storage state
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { objective: storedObjective, platform: storedPlatform, defaultLink: storedDefaultLink } = wizardState || {}

  // Get controls store values
  const {
    nestedLinks,
    postsPreferences,
    optimizationPreferences,
    budget,
    updateProfileSetUpStatus,
  } = useControlsStore(getControlsStoreState)

  const { defaultPromotionEnabled } = postsPreferences
  const objective = optimizationPreferences.objective || storedObjective
  const platform = optimizationPreferences.platform || storedPlatform
  const defaultLink = getLinkById(nestedLinks, postsPreferences?.defaultLinkId) || storedDefaultLink

  const hasSalesObjective = objective === 'sales'

  // Get artist context values
  const {
    artistId,
    artist,
  } = React.useContext(ArtistContext)

  const {
    feedMinBudgetInfo: {
      majorUnit: {
        minReccomendedStories,
      } = {},
    },
  } = artist

  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const adAccountId = facebookIntegration?.adaccount_id
  const facebookPixelId = facebookIntegration?.pixel_id
  const hasSufficientBudget = (!hasSalesObjective && Boolean(budget)) || (hasSalesObjective && budget >= minReccomendedStories)

  // Get user context value
  const { user } = React.useContext(UserContext)

  const fetchEnabledPosts = React.useCallback(async () => {
    const res = await server.getPosts({
      artistId,
      sortBy: ['normalized_score'],
      filterBy: {
        // promotion_enabled: [true],
      },
    })

    return formatRecentPosts(res)
  }, [artistId])

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
      isComplete: Boolean(defaultLink || wizardState?.defaultLink),
    },
    {
      name: 'connect-profile',
      isComplete: Boolean(user.artists.length),
    },
    {
      name: 'posts',
      isComplete: async () => {
        let enabledPosts = posts

        if (!enabledPosts.length) {
          enabledPosts = await fetchEnabledPosts()

          setPosts(enabledPosts)
        }

        return enabledPosts.length > 0
      },
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
      isComplete: artist.country_code,
    },
    {
      name: 'budget',
      isComplete: hasSufficientBudget,
    },
  ], [adAccountId, artist.country_code, defaultLink, defaultPromotionEnabled, facebookPixelId, fetchEnabledPosts, hasSufficientBudget, objective, platform, posts, user.artists.length, wizardState?.defaultLink, wizardState?.objective, wizardState?.platform])

  const getProfileSetupStatus = () => {
    const profileStatus = profileSetupConditions.find((condition) => !condition.isComplete)?.name

    return profileStatus
  }

  useAsyncEffect(async () => {
    const profileStatus = getProfileSetupStatus()

    updateProfileSetUpStatus(profileStatus)
  }, [profileSetupConditions])

  return getProfileSetupStatus
}

export default useCheckProfileSetupStatus
