import create from 'zustand'
import produce from 'immer'

import * as billingHelpers from '@/app/helpers/billingHelpers'
import { fetchUpcomingInvoice } from '@/app/helpers/invoiceHelpers'

const initialState = {
  organization: {},
  loading: true,
  loadingErrors: [],
  organizationUsers: [],
  organizationArtists: [],
  billingDetails: {},
  upcomingInvoice: null,
  artistCurrency: {},
  defaultPaymentMethod: null,
  organizationInvites: [],
  transferRequests: [],
}

// FETCH BILLING DETAILS
const fetchOrganizationDetails = async (organization) => {
  const billingDetails = billingHelpers.getBillingDetails(organization)
  const defaultPaymentMethod = billingHelpers.getDefaultPaymentMethod(billingDetails.allPaymentMethods)

  let organizationArtists = []
  const organizationArtistsResponse = await billingHelpers.getOrganizationArtists(organization.id)

  if (!organizationArtistsResponse.error) {
    organizationArtists = organizationArtistsResponse.res.artists
  } else {
    organizationArtists = Object.values((organization || {}).artists || {})
  }

  return {
    billingDetails,
    defaultPaymentMethod,
    organizationArtists,
  }
}

const fetchInvoices = async (organization) => {
  const errors = []

  // Fetch next invoice
  const { res: upcomingInvoice, error: upcomingInvoiceError } = await fetchUpcomingInvoice(organization.id)
  if (upcomingInvoiceError && upcomingInvoiceError.message !== 'Not Found') errors.push(upcomingInvoiceError)

  return {
    upcomingInvoice,
    errors,
  }
}

const resetStore = (set) => () => {
  set({
    ...initialState,
    loading: false,
  })
}

// * INITIAL SETUP
const setupBilling = (set, get) => async (user, artist, shouldFetchOrganizationDetailsOnly = false) => {
  if (!user.id || !artist.id || typeof get !== 'function') return
  // Check user has access to the artist's org or is sysadmin
  const userOrgIds = Object.values(user.organizations).map(org => org.id)
  const artistOrgId = artist.organization.id
  const userHasAccessToArtistOrg = userOrgIds.includes(artistOrgId)
  const userIsAdmin = user.role === 'admin'

  if (!userHasAccessToArtistOrg && !userIsAdmin) {
    resetStore(set)()
    return
  }

  // If changing artist, check it's org is actually different first
  const currentOrg = get().organization
  const orgHasChanged = currentOrg.id !== artistOrgId
  if (!orgHasChanged) return

  const organization = await billingHelpers.fetchOrgById(artistOrgId)
  const {
    billingDetails,
    defaultPaymentMethod,
    organizationArtists,
  } = await fetchOrganizationDetails(organization)

  const artistCurrency = artist.min_daily_budget_info.currency

  if (shouldFetchOrganizationDetailsOnly) {
    set({
      loading: false,
      organization,
      organizationArtists,
      billingDetails,
      defaultPaymentMethod,
      artistCurrency,
    })
    return
  }

  const {
    upcomingInvoice,
    errors,
  } = await fetchInvoices(organization)

  let organizationUsers = []
  const organizationUsersResponse = await billingHelpers.getOrganizationUsers(organization.id)
  // TODO: 3 Is this needed in the store, or just on the billing page
  if (!organizationUsersResponse.error) {
    organizationUsers = organizationUsersResponse.res.users
  } else {
    organizationUsers = Object.values((organization || {}).users || {})
  }

  let organizationInvites = []
  const organizationInvitesResponse = await billingHelpers.getOrganizationInvites()
  // TODO: 3 Is this needed in the store, or just on the billing page
  if (!organizationInvitesResponse.error) {
    organizationInvites = organizationInvitesResponse.res.invites
  }

  let transferRequests = []
  const transferRequestsResponse = await billingHelpers.getTransferRequests()
  // TODO: 3 Is this needed in the store, or just on the billing page
  if (!transferRequestsResponse.error) {
    transferRequests = transferRequestsResponse.res.transferRequests
  }

  // SET
  set({
    organization,
    loading: false,
    loadingErrors: errors,
    organizationUsers,
    organizationArtists,
    billingDetails,
    upcomingInvoice,
    artistCurrency,
    defaultPaymentMethod,
    organizationInvites,
    transferRequests,
  })
}

// * ADD PAYMENT METHOD
const addPaymentMethod = (set, get) => (paymentMethod) => {
  const setAsDefault = paymentMethod.is_default
  const { billingDetails } = get()
  const paymentMethodsUpdated = produce(billingDetails?.allPaymentMethods || [], draftState => {
    draftState.push(paymentMethod)
  })
  const billingDetailsUpdated = produce(billingDetails, draftState => {
    draftState.allPaymentMethods = paymentMethodsUpdated
  })
  set({
    billingDetails: billingDetailsUpdated,
    ...(setAsDefault && {
      defaultPaymentMethod: paymentMethod,
    }),
  })
}

// * DELETE PAYMENT METHOD
const deletePaymentMethod = (set, get) => (paymentMethodId) => {
  const { billingDetails } = get()
  const billingDetailsUpdated = produce(billingDetails, draftState => {
    const index = draftState.allPaymentMethods.findIndex(({ id }) => id === paymentMethodId)
    if (index !== -1) draftState.allPaymentMethods.splice(index, 1)
  })
  set({ billingDetails: billingDetailsUpdated })
}

// * UPDATE DEFAULT PAYMENT
const updateDefaultPayment = (set, get) => (defaultPaymentMethod) => {
  const { id: newPaymentMethodId } = defaultPaymentMethod
  // Get updated payment methods
  const { billingDetails } = get()
  const billingDetailsUpdated = produce(billingDetails, draftState => {
    draftState.allPaymentMethods.forEach((method) => {
      method.is_default = method.id === newPaymentMethodId
    })
  })
  // Update state
  set({
    defaultPaymentMethod,
    billingDetails: billingDetailsUpdated,
  })
}

// * SELECT ACTIVE ORGANIZATION
const selectOrganization = (set) => async (user, artist) => {
  set({ loading: true })
  await setupBilling(set)(user, artist)
}

export const removeOrganizationUser = (set, get) => (user) => {
  const { organization, organizationUsers } = get()

  const organizationUsersUpdated = produce(organizationUsers, draftState => {
    return draftState.filter((u) => u.id !== user.id)
  })

  const organizationUpdated = produce(organization, draftState => {
    delete draftState.users[user.id]
    return draftState
  })

  set({ organizationUsers: organizationUsersUpdated, organization: organizationUpdated })
}

export const removeOrganizationInvite = (set, get) => async (organizationInvite) => {
  const { organizationInvites } = get()

  const organizationInvitesUpdated = produce(organizationInvites, draftState => {
    return draftState.filter((oi) => oi.token !== organizationInvite.token)
  })

  set({ organizationInvites: organizationInvitesUpdated })
}

export const removeTransferRequest = (set, get) => async (transferRequest) => {
  const { transferRequests } = get()

  const transferRequestsUpdated = produce(transferRequests, draftState => {
    return draftState.filter((tr) => tr.token !== transferRequest.token)
  })

  set({ transferRequests: transferRequestsUpdated })
}

export const updateOrganizationArtists = (set) => async (organizationArtists) => {
  set({ organizationArtists })
}

const updateUpcomingInvoice = (set) => (upcomingInvoice) => {
  set({ upcomingInvoice })
}

const useBillingStore = create((set, get) => ({
  ...initialState,
  resetStore: resetStore(set),
  setupBilling: setupBilling(set, get),
  addPaymentMethod: addPaymentMethod(set, get),
  deletePaymentMethod: deletePaymentMethod(set, get),
  updateDefaultPayment: updateDefaultPayment(set, get),
  selectOrganization: selectOrganization(set, get),
  removeOrganizationUser: removeOrganizationUser(set, get),
  removeOrganizationInvite: removeOrganizationInvite(set, get),
  removeTransferRequest: removeTransferRequest(set, get),
  updateOrganizationArtists: updateOrganizationArtists(set, get),
  updateUpcomingInvoice: updateUpcomingInvoice(set, get),
}))

export default useBillingStore
