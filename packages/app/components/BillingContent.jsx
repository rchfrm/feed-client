import React from 'react'

import shallow from 'zustand/shallow'

import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useBillingStore from '@/app/stores/billingStore'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import SplitView from '@/app/SplitView'
import BillingOrganizationHeader from '@/app/BillingOrganizationHeader'
import BillingInvoiceSummary from '@/app/BillingInvoiceSummary'
import BillingPaymentMethodsSummary from '@/app/BillingPaymentMethodsSummary'
import BillingProfilesSummary from '@/app/BillingProfilesSummary'
import BillingUsersSummary from '@/app/BillingUsersSummary'

import { billingOptions } from '@/app/helpers/billingHelpers'

// READING FROM STORE
const getBillingStoreState = (state) => ({
  loading: state.loading,
  loadingErrors: state.loadingErrors,
  setupBilling: state.setupBilling,
  defaultPaymentMethod: state.defaultPaymentMethod,
  upcomingInvoice: state.upcomingInvoice,
  organizationArtists: state.organizationArtists,
})

const BillingContent = () => {
  // TODO: 2 Wean this off billing store (unless the selected org is in the billing store)
  const { user, userLoading } = React.useContext(UserContext)
  const { artist, artistLoading } = React.useContext(ArtistContext)
  const { min_daily_budget_info } = artist

  // Read from BILLING STORE
  const {
    loading: billingLoading,
    loadingErrors,
    setupBilling,
    defaultPaymentMethod,
    upcomingInvoice,
    organizationArtists,
  } = useBillingStore(getBillingStoreState, shallow)

  const billingComponents = {
    invoices: <BillingInvoiceSummary upcomingInvoice={upcomingInvoice} organizationArtists={organizationArtists} />,
    paymentMethod: <BillingPaymentMethodsSummary defaultPaymentMethod={defaultPaymentMethod} />,
    profiles: <BillingProfilesSummary />,
    users: <BillingUsersSummary />,
  }

  // Load billing info
  React.useEffect(() => {
    if (!artist.id || artistLoading || !user.id || userLoading) return
    console.log('BillingContent.jsx')
    setupBilling(user, artist)
  }, [artistLoading, user, setupBilling, artist, userLoading])

  if (billingLoading) return <Spinner />

  return (
    <>
      <BillingOrganizationHeader />
      {loadingErrors.map((error, index) => <Error key={index} error={error} />)}
      <SplitView
        contentComponents={billingComponents}
        options={billingOptions}
        className="sm:grid grid-cols-12 gap-8"
        hasEvenColumns
      />
    </>
  )
}

BillingContent.propTypes = {
}

BillingContent.defaultProps = {
}

export default BillingContent
