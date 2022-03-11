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

import * as server from '@/app/helpers/appServer'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  postsPreferences: state.postsPreferences,
  optimizationPreferences: state.optimizationPreferences,
  budget: state.budget,
  controlsLoading: state.isControlsLoading,
})

const useGetStartedWizard = () => {
  const [posts, setPosts] = React.useState([])
  const [postsLoading, setPostsLoading] = React.useState(true)
  const {
    nestedLinks,
    postsPreferences,
    optimizationPreferences,
    budget,
    controlsLoading,
  } = useControlsStore(getControlsStoreState)

  const { objective, platform } = optimizationPreferences
  const defaultLink = getLinkById(nestedLinks, postsPreferences?.defaultLinkId)
  const { defaultPromotionEnabled } = postsPreferences
  const { artistId, artistLoading, artist, updateHasSetUpProfile } = React.useContext(ArtistContext)
  const { user } = React.useContext(UserContext)
  const {
    targetingState,
    initPage,
    currencyOffset,
    locationOptions: locations,
    settingsReady,
  } = React.useContext(TargetingContext)
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const adAccountId = facebookIntegration?.adaccount_id
  const facebookPixelId = facebookIntegration?.pixel_id

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
        promotion_enabled: [true],
      },
    })

    const formattedRecentPosts = formatRecentPosts(res)

    setPosts(formattedRecentPosts)
    setPostsLoading(false)
  }, [artistId])

  // Boolean value which determines if a profile has been set up completely
  const hasSetUpProfile = Boolean(objective
    && platform
    && defaultLink
    && user.artists.length
    && posts.length > 0
    && defaultPromotionEnabled !== null
    && adAccountId
    && (objective === 'growth' || facebookPixelId)
    && (Object.keys(locations).length || artist.country_code)
    && budget)

  updateHasSetUpProfile(hasSetUpProfile)

  return {
    hasSetUpProfile,
    isLoading: artistLoading || controlsLoading || (artistId && !settingsReady) || postsLoading,
    objective,
    platform,
    defaultLink,
    posts,
    defaultPromotionEnabled,
    adAccountId,
    facebookPixelId,
    locations,
    budget,
  }
}

export default useGetStartedWizard
