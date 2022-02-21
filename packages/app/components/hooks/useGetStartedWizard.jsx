import React from 'react'
import useAsyncEffect from 'use-async-effect'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import { getLocalStorage } from '@/helpers/utils'
import { getArtistIntegrationByPlatform, getMissingScopes } from '@/app/helpers/artistHelpers'
import { fetchTargetingState } from '@/app/helpers/targetingHelpers'
import { getLinkById } from '@/app/helpers/linksHelpers'
import { formatRecentPosts } from '@/app/helpers/resultsHelpers'
import { requiredScopesAds } from '@/helpers/firebaseHelpers'

import * as server from '@/app/helpers/appServer'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  postsPreferences: state.postsPreferences,
  optimizationPreferences: state.optimizationPreferences,
  budget: state.budget,
  controlsLoading: state.isControlsLoading,
})

const useControlsWizard = () => {
  const [posts, setPosts] = React.useState([])
  const [postsLoading, setPostsLoading] = React.useState(true)
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const {
    nestedLinks,
    postsPreferences,
    optimizationPreferences,
    budget,
    controlsLoading,
  } = useControlsStore(getControlsStoreState)

  const objective = optimizationPreferences?.objective || wizardState?.objective
  const platform = optimizationPreferences?.platform || wizardState?.platform
  const defaultLink = getLinkById(nestedLinks, postsPreferences?.defaultLinkId) || wizardState?.defaultLink
  const { defaultPromotionEnabled } = postsPreferences
  const { artistId, artistLoading, artist } = React.useContext(ArtistContext)
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
  const isArtistOwnedByUser = Object.keys(artist.users).includes(user.id) && artist.users[user.id].role === 'owner'
  const { ads: missingScopes = [] } = isArtistOwnedByUser ? getMissingScopes({ artist }) : {}
  const scopes = artistId ? missingScopes : requiredScopesAds

  // Initialise targeting context state
  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !artistId || controlsLoading || Object.keys(targetingState).length > 0) return

    const state = await fetchTargetingState(artistId, currencyOffset)
    const { error } = state
    initPage(state, error)
  }, [artistId, controlsLoading])

  // Fetch posts with a status of active or in review
  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !artistId) {
      setPostsLoading(false)
      return
    }

    const res = await server.getPosts({
      artistId,
      filterBy: {
        promotion_status: ['in_review', 'active'],
      },
    })

    const formattedRecentPosts = formatRecentPosts(res)

    setPosts(formattedRecentPosts)
    setPostsLoading(false)
  }, [artistId])

  return {
    isLoading: artistLoading || controlsLoading || (artistId && !settingsReady) || postsLoading,
    objective,
    platform,
    defaultLink,
    scopes,
    posts,
    defaultPromotionEnabled,
    adAccountId,
    facebookPixelId,
    locations,
    budget,
  }
}

export default useControlsWizard
