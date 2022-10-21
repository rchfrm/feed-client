import React, { useEffect } from 'react'
import shallow from 'zustand/shallow'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import useBillingStore from '@/app/stores/billingStore'
import Spinner from '@/elements/Spinner'
import SplitView from '@/app/SplitView'
import BillingOrganizationHeader from '@/app/BillingOrganizationHeader'
import BillingInvoiceSection from '@/app/BillingInvoiceSection'
import BillingPaymentMethodsSummary from '@/app/BillingPaymentMethodsSummary'
import BillingProfilesSummary from '@/app/BillingProfilesSummary'
import BillingUsersSummary from '@/app/BillingUsersSummary'
import { billingOptions, fetchOrgById, getOrganizationArtists } from '@/app/helpers/billingHelpers'
import useAsyncEffect from 'use-async-effect'

// READING FROM STORE
const getBillingStoreState = (state) => ({
  billingStoreOrg: state.organization,
  billingStoreLoading: state.loading,
  setupBilling: state.setupBilling,
  defaultPaymentMethod: state.defaultPaymentMethod,
  upcomingInvoice: state.upcomingInvoice,
  organizationArtists: state.organizationArtists,
})

const BillingContent = () => {
  // TODO: 2 Wean this off billing store (unless the selected org is in the billing store)
  const { user, userLoading } = React.useContext(UserContext)
  const { artistLoading } = React.useContext(ArtistContext)
  const [selectedOrgId, setSelectedOrgId] = React.useState(undefined)
  const [orgLoading, setOrgLoading] = React.useState(false)
  const [organization, setOrganization] = React.useState(undefined)
  const [orgArtists, setOrgArtists] = React.useState([])

  // Read from BILLING STORE
  const {
    billingStoreOrg,
    billingStoreLoading,
    defaultPaymentMethod,
  } = useBillingStore(getBillingStoreState, shallow)

  // Set initial selected organization
  useEffect(() => {
    // Stop here if user or artist is still loading
    if (userLoading || artistLoading || billingStoreLoading) return

    // Don't run if an organization is selected
    if (selectedOrgId) return

    const userOrgIds = Object.keys(user.organizations)
    const hasAccessToBillingStoreOrg = userOrgIds.includes(billingStoreOrg.id)
    if (hasAccessToBillingStoreOrg) {
      setSelectedOrgId(billingStoreOrg.id)
      setOrganization(billingStoreOrg)
      setOrgLoading(false)
    }
    setSelectedOrgId(userOrgIds[0])
  }, [artistLoading, billingStoreOrg, billingStoreLoading, selectedOrgId, user.organizations, userLoading])

  // Get organisation details
  useAsyncEffect(async () => {
    // Stop here if user or artist is still loading
    if (userLoading || artistLoading || billingStoreLoading) return

    // Check if information needs to be loaded, ie. it's not already
    // loading or the selected org is the same as the one in state
    if (
      !selectedOrgId // No org has been selected
      || orgLoading // The org is already being fetched
      || (selectedOrgId && selectedOrgId === organization?.id) // The selected org isn't different to the one in state
    ) {
      return
    }

    setOrgLoading(true)

    // Check if selected org is already in billing store
    if (selectedOrgId === billingStoreOrg.id) {
      setOrganization(billingStoreOrg)
      setOrgLoading(false)
      return
    }

    const orgResponse = await fetchOrgById(selectedOrgId)
    const { res } = await getOrganizationArtists(orgResponse.id)
    const { artists } = res
    setOrganization(orgResponse)
    setOrgArtists(Object.values(artists))
    setOrgLoading(false)
  }, [userLoading, artistLoading, billingStoreLoading, selectedOrgId, orgLoading, organization, setOrgLoading, billingStoreOrg, setOrganization])

  if (!organization || !organization.id || orgLoading) return <Spinner />

  const billingComponents = {
    invoices: <BillingInvoiceSection organization={organization} organizationArtists={orgArtists} />,
    profiles: <BillingProfilesSummary organization={organization} organizationArtists={orgArtists} setOrgArtists={setOrgArtists} />,
    // TODO: Continue removing billing store from here:
    paymentMethod: <BillingPaymentMethodsSummary defaultPaymentMethod={defaultPaymentMethod} />,
    users: <BillingUsersSummary />,
  }

  return (
    <>
      <BillingOrganizationHeader />
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
