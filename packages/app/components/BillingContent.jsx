import React from 'react'

import shallow from 'zustand/shallow'

import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useBillingStore from '@/app/stores/billingStore'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import SplitView from '@/app/SplitView'
import BillingOrganisationSelect from '@/app/BillingOrganisationSelect'
import BillingOrganisationInviteList from '@/app/BillingOrganisationInviteList'
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
  loadingErrors,
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
    <>
      {loadingErrors.map((error, index) => <Error key={index} error={error} />)}
      <SplitView
        contentComponents={billingComponents}
        options={billingOptions}
        className="sm:grid grid-cols-12 gap-8"
        optionsHeader
        hasEvenColumns
      />
    </>
  )
}

const BillingContent = () => {
  const { user } = React.useContext(UserContext)
  const { artistLoading, artist: { min_daily_budget_info } } = React.useContext(ArtistContext)

  // Read from BILLING STORE
  const {
    loading: billingLoading,
    loadingErrors,
    setupBilling,
    defaultPaymentMethod,
    upcomingInvoice,
    latestInvoice,
    organisation,
    allOrgs,
    organisationInvites,
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
    <>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-6">
          {/* ACCEPT / REJECT ORGANISATION INVITES */}
          {organisationInvites.length > 0 && (
            <BillingOrganisationInviteList
              className="mb-12 sm:mb-0 rounded-dialogue border-solid border-2 border-redLight"
            />
          )}
          {/* SELECT ORG */}
          {allOrgs.length >= 2 && (
            <BillingOrganisationSelect
              className="mb-12 sm:mb-0"
              organisation={organisation}
              allOrgs={allOrgs}
            />
          )}
        </div>
      </div>
      <BILLING_CONTENT_SECTIONS
        loadingErrors={loadingErrors}
        latestInvoice={latestInvoice}
        upcomingInvoice={upcomingInvoice}
        organisation={organisation}
        updateLatestInvoice={updateLatestInvoice}
        defaultPaymentMethod={defaultPaymentMethod}
      />
    </>
  )
}

BillingContent.propTypes = {
}

BillingContent.defaultProps = {
}

export default BillingContent
