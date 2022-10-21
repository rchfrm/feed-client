import React, {useEffect} from 'react'
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
import {billingOptions, fetchOrgById} from '@/app/helpers/billingHelpers'
import useAsyncEffect from 'use-async-effect'

// READING FROM STORE
const getBillingStoreState = (state) => ({
  artistOrg: state.organization,
  billingStoreLoading: state.loading,
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
  const [selectedBillingOrgID, setSelectedBillingOrgID] = React.useState(undefined)
  const [billingOrgLoading, setBillingOrgLoading] = React.useState(false)
  const [billingOrg, setBillingOrg] = React.useState(undefined)
  const { min_daily_budget_info } = artist

  // Read from BILLING STORE
  const {
    artistOrg,
    billingStoreLoading,
    loadingErrors,
    defaultPaymentMethod,
    upcomingInvoice,
    organizationArtists,
  } = useBillingStore(getBillingStoreState, shallow)

  // Set initial selected organization
  useEffect(() => {
    // Stop here if user or artist is still loading
    if (userLoading || artistLoading || billingStoreLoading) return

    // Don't run if an organization is selected
    if (selectedBillingOrgID) return

    const userOrgsIds = Object.keys(user.organizations)
    const hasAccessToBillingStoreOrg = userOrgsIds.includes(artistOrg.id)
    if (hasAccessToBillingStoreOrg) {
      setSelectedBillingOrgID(artistOrg.id)
      setBillingOrg(artistOrg)
      setBillingOrgLoading(false)
    }
    setSelectedBillingOrgID(userOrgsIds[0])
  }, [artistLoading, artistOrg, billingStoreLoading, selectedBillingOrgID, user.organizations, userLoading])


  // Get organisation details
  useAsyncEffect(async () => {
    // Stop here if user or artist is still loading
    if (userLoading || artistLoading || billingStoreLoading) return

    // Check if information needs to be loaded, ie. it's not already
    // loading or the selected org is the same as the one in state
    if (
      !selectedBillingOrgID // No org has been selected
      || billingOrgLoading // The org is already being fetched
      || (selectedBillingOrgID && selectedBillingOrgID === billingOrg?.id) // The selected org isn't different to the one in state
    ) {
      return
    }

    setBillingOrgLoading(true)

    // Check if selected org is already in billing store
    if (selectedBillingOrgID === artistOrg.id) {
      setBillingOrg(artistOrg)
      setBillingOrgLoading(false)
      return
    }

    const organization = await fetchOrgById(selectedBillingOrgID)
    setBillingOrg(organization)
    setBillingOrgLoading(false)
  }, [userLoading, artistLoading, billingStoreLoading, selectedBillingOrgID, billingOrgLoading, billingOrg, setBillingOrgLoading, artistOrg, setBillingOrg])

  const billingComponents = {
    invoices: <BillingInvoiceSummary upcomingInvoice={upcomingInvoice} organizationArtists={organizationArtists} />,
    paymentMethod: <BillingPaymentMethodsSummary defaultPaymentMethod={defaultPaymentMethod} />,
    profiles: <BillingProfilesSummary />,
    users: <BillingUsersSummary />,
  }

  if (!billingOrg || billingOrgLoading) return <Spinner />

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
