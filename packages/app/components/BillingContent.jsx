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
import {
  billingOptions,
  fetchOrgById,
  getOrganizationArtists,
  getOrganizationInvites,
} from '@/app/helpers/billingHelpers'
import useAsyncEffect from 'use-async-effect'
import Error from '@/elements/Error'

// READING FROM STORE
const getBillingStoreState = (state) => ({
  billingStoreOrg: state.organization,
  billingStoreLoading: state.loading,
  billingStoreOrgArtists: state.organizationArtists,
  setupBilling: state.setupBilling,
})

const BillingContent = () => {
  const { user, userLoading } = React.useContext(UserContext)
  const { artistLoading } = React.useContext(ArtistContext)
  const [error, setError] = React.useState(null)
  const [selectedOrgId, setSelectedOrgId] = React.useState(undefined)
  const [orgLoading, setOrgLoading] = React.useState(false)
  const [organization, setOrganization] = React.useState(undefined)
  const [orgArtists, setOrgArtists] = React.useState([])
  const [orgInvites, setOrgInvites] = React.useState([])

  // Read from BILLING STORE
  const {
    billingStoreOrg,
    billingStoreLoading,
    billingStoreOrgArtists,
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
      setOrgArtists(billingStoreOrgArtists)
      const { error, res } = await getOrganizationInvites()
      if (error) {
        setError(error)
      }
      setOrgInvites(res.invites)
      setOrgLoading(false)
      return
    }

    console.log('Promise.all')
    Promise.all([
      fetchOrgById(selectedOrgId),
      getOrganizationArtists(selectedOrgId),
      getOrganizationInvites(),
    ]).then(res => {
      const errors = res.reduce((errors, res) => {
        if (res.error) {
          errors.push(res.error)
        }
        return errors
      }, [])
      if (errors.length > 0) {
        setError(errors[0])
        return
      }
      const orgResponse = res[0]
      const orgArtistsResponse = res[1]
      const orgInvitesResponse = res[2]
      setOrganization(orgResponse.res)
      setOrgArtists(orgArtistsResponse.res.artists)
      setOrgInvites(orgInvitesResponse.res.invites)
    })
    setOrgLoading(false)
  }, [selectedOrgId, billingStoreOrg.id])

  if (!organization || !organization.id || orgLoading) return <Spinner />

  const billingComponents = {
    invoices: <BillingInvoiceSection organization={organization} organizationArtists={orgArtists} />,
    profiles: <BillingProfilesSummary organization={organization} organizationArtists={orgArtists} setOrgArtists={setOrgArtists} />,
    paymentMethod: <BillingPaymentMethodsSummary organization={organization} defaultPaymentMethod={defaultPaymentMethod} />,
    users: <BillingUsersSummary organization={organization} orgLoading={orgLoading} />,
  }

  return (
    <>
      <BillingOrganizationHeader
        organizationInvites={orgInvites}
        setOrgInvites={setOrgInvites}
        selectedOrgId={selectedOrgId}
        setSelectedOrgId={setSelectedOrgId}
      />
      <Error error={error} />
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
