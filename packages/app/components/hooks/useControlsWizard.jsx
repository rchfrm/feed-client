import React from 'react'
import useAsyncEffect from 'use-async-effect'

import useBillingStore from '@/app/stores/billingStore'
import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import { getArtistIntegrationByPlatform, getMissingScopes } from '@/app/helpers/artistHelpers'
import { fetchPopularLocations, fetchTargetingState } from '@/app/helpers/targetingHelpers'

const getBillingStoreState = (state) => ({
  setupBilling: state.setupBilling,
  defaultPaymentMethod: state.defaultPaymentMethod,
  loading: state.loading,
  allOrgs: state.allOrgs,
})

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
  budget: state.budget,
  controlsLoading: state.isControlsLoading,
})

const useControlsWizard = () => {
  const {
    setupBilling,
    defaultPaymentMethod,
    loading: billingLoading,
    allOrgs,
  } = useBillingStore(getBillingStoreState)
  const { postsPreferences, budget, controlsLoading } = useControlsStore(getControlsStoreState)
  const { defaultLinkId } = postsPreferences
  const { artistId, artistLoading, artist } = React.useContext(ArtistContext)
  const { min_daily_budget_info } = artist
  const { user } = React.useContext(UserContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  const {
    targetingState,
    initPage,
    currencyOffset,
    createLocationOptions,
    locationOptions: locations,
    settingsReady,
    setSettingsReady,
  } = React.useContext(TargetingContext)
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const adAccountId = facebookIntegration?.adaccount_id
  const { ads: missingScopes } = getMissingScopes({ artist })

  const currentUserOrganisation = allOrgs.find(organisation => organisation.role === 'owner')
  const isProfilePartOfOrganisation = Object.keys(currentUserOrganisation?.artists || {}).includes(artistId)

  // Initialise targeting context state
  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !artistId) return

    const state = await fetchTargetingState(artistId, currencyOffset)
    const { error } = state
    initPage(state, error)
  }, [artistId])

  // Fetch popular locations and store them in targeting context
  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !Object.keys(targetingState).length > 0 || settingsReady) return

    const { popularLocations } = await fetchPopularLocations(artistId)
    createLocationOptions(targetingState, popularLocations)
    setSettingsReady(true)
    toggleGlobalLoading(false)
  }, [targetingState])

  // Set-up organisation part of billing store
  React.useEffect(() => {
    if (artistLoading) return
    const { currency: artistCurrency } = min_daily_budget_info || {}
    setupBilling({ user, artistCurrency, shouldFetchOrganisationDetailsOnly: true })
  // eslint-disable-next-line
  }, [artistLoading, user, setupBilling])

  const hasSetUpControls = Boolean(defaultLinkId
    && !missingScopes.length
    && adAccountId
    && Object.keys(locations).length
    && budget
    && (!isProfilePartOfOrganisation || defaultPaymentMethod))

  return {
    isLoading: billingLoading || artistLoading || controlsLoading,
    hasSetUpControls,
    missingScopes,
    adAccountId,
    locations,
    defaultLinkId,
    budget,
    defaultPaymentMethod,
    isProfilePartOfOrganisation,
  }
}

export default useControlsWizard
