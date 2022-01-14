import React from 'react'
import useAsyncEffect from 'use-async-effect'

import useBillingStore from '@/app/stores/billingStore'
import useControlsStore from '@/app/stores/controlsStore'
import useFbRedirect from '@/app/hooks/useFbRedirect'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import { getArtistIntegrationByPlatform, getMissingScopes } from '@/app/helpers/artistHelpers'
import { fetchTargetingState } from '@/app/helpers/targetingHelpers'

import * as ROUTES from '@/app/constants/routes'

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
  const [errors, setErrors] = React.useState([])
  const { hasCheckedFbRedirect } = useFbRedirect(ROUTES.CONTROLS, errors, setErrors)
  const {
    targetingState,
    initPage,
    currencyOffset,
    locationOptions: locations,
    settingsReady,
  } = React.useContext(TargetingContext)
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const adAccountId = facebookIntegration?.adaccount_id
  const isArtistOwnedByUser = Object.keys(artist.users).includes(user.id) && artist.users[user.id].role === 'owner'
  const { ads: missingScopes = [] } = isArtistOwnedByUser ? getMissingScopes({ artist }) : {}

  const currentUserOrganisation = allOrgs.find(organisation => organisation.role === 'owner')
  const isProfilePartOfOrganisation = Object.keys(currentUserOrganisation?.artists || {}).includes(artistId)

  // Initialise targeting context state
  useAsyncEffect(async (isMounted) => {
    if (!isMounted() || !artistId || controlsLoading || Object.keys(targetingState).length > 0) return

    const state = await fetchTargetingState(artistId, currencyOffset)
    const { error } = state
    initPage(state, error)
  }, [artistId, controlsLoading])

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
    isLoading: billingLoading || artistLoading || controlsLoading || !hasCheckedFbRedirect || !settingsReady,
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
