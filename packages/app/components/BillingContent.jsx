import React from 'react'

import shallow from 'zustand/shallow'

import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useBillingStore from '@/app/stores/billingStore'

import Spinner from '@/elements/Spinner'

import SplitView from '@/app/SplitView'
import BillingInvoiceSummary from '@/app/BillingInvoiceSummary'
import BillingPaymentMethodsSummary from '@/app/BillingPaymentMethodsSummary'
import BillingProfilesSummary from '@/app/BillingProfilesSummary'
import BillingUsersSummary from '@/app/BillingUsersSummary'

// READING FROM STORE
const getBillingStoreState = (state) => ({
  loading: state.loading,
  loadingErrors: state.loadingErrors,
  defaultPaymentMethod: state.defaultPaymentMethod,
  setupBilling: state.setupBilling,
  upcomingInvoice: state.upcomingInvoice,
  latestInvoice: state.latestInvoice,
  organisation: state.organisation,
  organisationInvites: state.organisationInvites,
  organisationArtists: state.organisationArtists,
  transferRequests: state.transferRequests,
  allOrgs: state.allOrgs,
  updateLatestInvoice: state.updateLatestInvoice,
  billingEnabled: state.billingEnabled,
})

const BILLING_CONTENT_SECTIONS = ({
  latestInvoice,
  upcomingInvoice,
  defaultPaymentMethod,
}) => {
  const billingOptions = [
    {
      name: 'invoices',
      title: 'Invoices',
      hasDescription: true,
    },
    {
      name: 'profiles',
      title: 'Profiles',
      hasDescription: true,
    },
    {
      name: 'paymentMethod',
      title: 'Payment methods',
      hasDescription: true,
    },
    {
      name: 'users',
      title: 'Team',
      hasDescription: true,
    },
  ]

  const billingComponents = {
    invoices: <BillingInvoiceSummary latestInvoice={latestInvoice} upcomingInvoice={upcomingInvoice} />,
    paymentMethod: <BillingPaymentMethodsSummary defaultPaymentMethod={defaultPaymentMethod} />,
    profiles: <BillingProfilesSummary />,
    users: <BillingUsersSummary />,
  }

  return (
    <SplitView
      contentComponents={billingComponents}
      options={billingOptions}
      className="sm:grid grid-cols-12 gap-8"
      hasEvenColumns
    />
  )
}

const BillingContent = () => {
  const { user } = React.useContext(UserContext)
  const { artistLoading, artist: { min_daily_budget_info } } = React.useContext(ArtistContext)

  // Read from BILLING STORE
  const {
    loading: billingLoading,
    setupBilling,
    defaultPaymentMethod,
    upcomingInvoice,
    latestInvoice,
    organisation,
    updateLatestInvoice,
  } = useBillingStore(getBillingStoreState, shallow)

  // Load billing info
  React.useEffect(() => {
    if (artistLoading) return

    const { currency: artistCurrency } = min_daily_budget_info || {}

    setupBilling({ user, artistCurrency })
  // eslint-disable-next-line
  }, [artistLoading, user, setupBilling])

  if (billingLoading) return <Spinner />

  return (
    <div>
      <BILLING_CONTENT_SECTIONS
        latestInvoice={latestInvoice}
        upcomingInvoice={upcomingInvoice}
        organisation={organisation}
        updateLatestInvoice={updateLatestInvoice}
        defaultPaymentMethod={defaultPaymentMethod}
      />
    </div>
  )
}

BillingContent.propTypes = {
}

BillingContent.defaultProps = {
}

export default BillingContent
