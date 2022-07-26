import React from 'react'
// import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useBillingStore from '@/app/stores/billingStore'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import BillingOrganisationSelect from '@/app/BillingOrganisationSelect'
import BillingInvoiceSummary from '@/app/BillingInvoiceSummary'
import BillingPaymentMethodsSummary from '@/app/BillingPaymentMethodsSummary'
import BillingProfilesSummary from '@/app/BillingProfilesSummary'
import BillingUsersSummary from '@/app/BillingUsersSummary'
import BillingReferralsSummary from '@/app/BillingReferralsSummary'
import BillingOrganisationInviteList from '@/app/BillingOrganisationInviteList'

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
  return (
    <>
      {/* LEFT COL */}
      <div className="col-span-1 mb-12 sm:mb-0">
        {/* ERRORS */}
        {loadingErrors.map((error, index) => <Error key={index} error={error} />)}
        {/* INVOICES */}
        <BillingInvoiceSummary
          className="mb-12"
          latestInvoice={latestInvoice}
          upcomingInvoice={upcomingInvoice}
        />
        {/* PAYMENT METHOD */}
        <BillingPaymentMethodsSummary defaultPaymentMethod={defaultPaymentMethod} />
      </div>
      {/* RIGHT COL */}
      <div className="col-span-1 mb-12 sm:mb-0">
        {/* REFERRALS */}
        <BillingReferralsSummary />
        {/* PROFILES */}
        <BillingProfilesSummary />
        {/* USERS */}
        <BillingUsersSummary className="mt-10" />
      </div>
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
    <div
      className={[
        'sm:grid grid-cols-2 gap-12 md:gap-16',
        'pb-12',
      ].join(' ')}
    >
      {/* ACCEPT / REJECT ORGANISATION INVITES */}
      {organisationInvites.length > 0 && (
        <BillingOrganisationInviteList
          className="col-span-1 mb-12 sm:mb-0 rounded-dialogue border-solid border-2 border-redLight"
        />
      )}
      {/* SELECT ORG */}
      {allOrgs.length >= 2 && (
        <BillingOrganisationSelect
          className="col-span-1 mb-12 sm:mb-0"
          organisation={organisation}
          allOrgs={allOrgs}
        />
      )}
      <BILLING_CONTENT_SECTIONS
        loadingErrors={loadingErrors}
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
