import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import { getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'
import { fetchTargetingState } from '@/app/helpers/targetingHelpers'
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
  controlsLoading: state.isControlsLoading,
})

const useCheckProfileSetupStatus = () => {
  // Get local storage state
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { objective: storedObjective, platform: storedPlatform, defaultLink: storedDefaultLink } = wizardState || {}

  // Get controls store values
  const {
    nestedLinks,
    postsPreferences,
    optimizationPreferences,
    budget,
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

  // Get targeting context values
  const {
    initPage,
    currencyOffset,
    locationOptions: locations,
  } = React.useContext(TargetingContext)

  const getProfileSetupStatus = async () => {
    let formattedRecentPosts = []

    if (artistId) {
      // Initialise targeting state
      const state = await fetchTargetingState(artistId, currencyOffset)
      const { error } = state

      initPage(state, error)

      // Fetch posts which have promotion enabled
      const res = await server.getPosts({
        artistId,
        sortBy: ['normalized_score'],
        filterBy: {
          // promotion_enabled: [true],
        },
      })

      formattedRecentPosts = formatRecentPosts(res)
    }

    // Define profile setup conditions
    const profileSetupConditions = [
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
        isComplete: formattedRecentPosts.length > 0,
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
        isComplete: (Object.keys(locations).length || artist.country_code),
      },
      {
        name: 'budget',
        isComplete: hasSufficientBudget,
      },
    ]

    const profileStatus = profileSetupConditions.find((condition) => !condition.isComplete)?.name

    return profileStatus
  }

  return getProfileSetupStatus
}

export default useCheckProfileSetupStatus
