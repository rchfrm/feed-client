import React from 'react'

import useBillingStore from '@/app/stores/billingStore'
import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'

import { getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'

const getBillingStoreState = (state) => ({
  setupBilling: state.setupBilling,
  defaultPaymentMethod: state.defaultPaymentMethod,
  loading: state.loading,
  allOrgs: state.allOrgs,
})

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
  budget: state.budget,
})

const useControlsWizard = () => {
  const {
    setupBilling,
    defaultPaymentMethod,
    loading: billingLoading,
    allOrgs,
  } = useBillingStore(getBillingStoreState)
  const { postsPreferences, budget } = useControlsStore(getControlsStoreState)
  const { defaultLinkId, defaultPromotionEnabled } = postsPreferences
  const { artistId, artistLoading, artist } = React.useContext(ArtistContext)
  const { min_daily_budget_info } = artist
  const { user } = React.useContext(UserContext)
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const adAccountId = facebookIntegration?.adaccount_id

  const currentUserOrganisation = allOrgs.find(organisation => organisation.role === 'owner')
  const isProfilePartOfOrganisation = Object.keys(currentUserOrganisation?.artists || {}).includes(artistId)

  // Set-up organisation part of billing store
  React.useEffect(() => {
    if (artistLoading) return
    const { currency: artistCurrency } = min_daily_budget_info || {}
    setupBilling({ user, artistCurrency, shouldFetchOrganisationDetailsOnly: true })
  // eslint-disable-next-line
  }, [artistLoading, user, setupBilling])

  const hasSetUpControls = Boolean(defaultLinkId
    && budget
    && (!isProfilePartOfOrganisation || defaultPaymentMethod))

  return {
    isLoading: billingLoading || artistLoading,
    hasSetUpControls,
    adAccountId,
    defaultLinkId,
    defaultPromotionEnabled,
    budget,
    defaultPaymentMethod,
    isProfilePartOfOrganisation,
  }
}

export default useControlsWizard
