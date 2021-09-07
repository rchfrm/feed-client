import React from 'react'

import useBillingStore from '@/app/stores/billingStore'
import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'

const getBillingStoreState = (state) => ({
  setupBilling: state.setupBilling,
  defaultPaymentMethod: state.defaultPaymentMethod,
  loading: state.loading,
})

const getControlsStoreState = (state) => ({
  postsPreferences: state.postsPreferences,
  budget: state.budget,
})

const useControlsWizard = () => {
  const { setupBilling, defaultPaymentMethod, loading: billingLoading } = useBillingStore(getBillingStoreState)
  const { postsPreferences, budget } = useControlsStore(getControlsStoreState)
  const { defaultLinkId, defaultPromotionEnabled } = postsPreferences

  const { artistLoading, artist: { min_daily_budget_info } } = React.useContext(ArtistContext)
  const { user } = React.useContext(UserContext)

  // Set-up organisation part of billing store
  React.useEffect(() => {
    if (artistLoading) return
    const { currency: artistCurrency } = min_daily_budget_info || {}
    setupBilling({ user, artistCurrency, shouldFetchOrganisationDetailsOnly: true })
  // eslint-disable-next-line
  }, [artistLoading, user, setupBilling])

  const hasSetUpControls = Boolean(defaultLinkId
    && budget
    && defaultPaymentMethod)

  return {
    isLoading: billingLoading || artistLoading,
    hasSetUpControls,
    defaultLinkId,
    defaultPromotionEnabled,
    budget,
    defaultPaymentMethod,
  }
}

export default useControlsWizard
