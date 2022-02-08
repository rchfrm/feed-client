import React from 'react'
import useAsyncEffect from 'use-async-effect'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import { getArtistIntegrationByPlatform, getMissingScopes } from '@/app/helpers/artistHelpers'
import { fetchTargetingState } from '@/app/helpers/targetingHelpers'

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
  optimizationPreferences: state.optimizationPreferences,
  budget: state.budget,
  controlsLoading: state.isControlsLoading,
})

const useControlsWizard = () => {
  const { postsPreferences, optimizationPreferences, budget, controlsLoading } = useControlsStore(getControlsStoreState)
  const { defaultLinkId } = postsPreferences
  const { objective, platform } = optimizationPreferences
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

  const posts = ['post', 'post']

  // Initialise targeting context state
  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !artistId || controlsLoading || Object.keys(targetingState).length > 0) return

    const state = await fetchTargetingState(artistId, currencyOffset)
    const { error } = state
    initPage(state, error)
  }, [artistId, controlsLoading])

  return {
    isLoading: artistLoading || controlsLoading || !settingsReady,
    objective,
    platform,
    defaultLinkId,
    missingScopes,
    posts,
    adAccountId,
    facebookPixelId,
    locations,
    budget,
  }
}

export default useControlsWizard
