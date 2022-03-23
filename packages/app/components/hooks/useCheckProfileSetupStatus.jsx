import React from 'react'
import useAsyncEffect from 'use-async-effect'

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
  const [profileSetupStatus, setProfileSetupStatus] = React.useState('')
  const [posts, setPosts] = React.useState([])
  const [postsLoading, setPostsLoading] = React.useState(true)

  // Get local storage state
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { objective: storedObjective, platform: storedPlatform, defaultLink: storedDefaultLink } = wizardState || {}

  // Get controls store values
  const {
    nestedLinks,
    postsPreferences,
    optimizationPreferences,
    updateProfileSetUpStatus,
    budget,
    controlsLoading,
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

  const { setup_completed_at: setupCompletedAt } = artist

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
    targetingState,
    initPage,
    currencyOffset,
    locationOptions: locations,
    settingsReady,
  } = React.useContext(TargetingContext)

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
      isComplete: posts.length > 0,
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
  ], [adAccountId, artist.country_code, defaultLink, defaultPromotionEnabled, facebookPixelId, hasSufficientBudget, locations, objective, platform, posts.length, user.artists.length, wizardState?.defaultLink, wizardState?.objective, wizardState?.platform])

  // Initialise targeting context state
  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !artistId || controlsLoading || Object.keys(targetingState).length > 0) return

    const state = await fetchTargetingState(artistId, currencyOffset)
    const { error } = state
    initPage(state, error)
  }, [artistId, controlsLoading])

  // Fetch posts which are opted in for promotion
  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !artistId) {
      setPostsLoading(false)
      return
    }

    const res = await server.getPosts({
      artistId,
      sortBy: ['normalized_score'],
      filterBy: {
        // promotion_enabled: [true],
      },
    })

    const formattedRecentPosts = formatRecentPosts(res)

    setPosts(formattedRecentPosts)
    setPostsLoading(false)
  }, [artistId])

  React.useEffect(() => {
    if (controlsLoading || postsLoading || (artistId && !settingsReady)) return

    if (setupCompletedAt) {
      setProfileSetupStatus('completed')

      return
    }

    const profileStatus = profileSetupConditions.find((condition) => !condition.isComplete)?.name

    setProfileSetupStatus(profileStatus)
  }, [controlsLoading, postsLoading, artistId, settingsReady, profileSetupConditions, setupCompletedAt, updateProfileSetUpStatus])

  return profileSetupStatus
}

export default useCheckProfileSetupStatus
