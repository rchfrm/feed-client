import create from 'zustand'
import produce from 'immer'

import * as billingHelpers from '@/app/helpers/billingHelpers'
import { fetchUpcomingInvoice } from '@/app/helpers/invoiceHelpers'

const initialState = {
  artistOrg: {},
  loading: true,
  loadingErrors: [],
  organisationUsers: [],
  organisationArtists: [],
  billingDetails: {},
  upcomingInvoice: null,
  artistCurrency: {},
  defaultPaymentMethod: null,
  organisationInvites: [],
  transferRequests: [],
}

// FETCH BILLING DETAILS
const fetchOrganisationDetails = async (organisation) => {
  const billingDetails = billingHelpers.getbillingDetails(organisation)
  const defaultPaymentMethod = billingHelpers.getDefaultPaymentMethod(billingDetails.allPaymentMethods)

  let organisationArtists = []
  const organisationArtistsResponse = await billingHelpers.getOrganisationArtists(organisation.id)

  if (!organisationArtistsResponse.error) {
    organisationArtists = organisationArtistsResponse.res.artists
  } else {
    organisationArtists = Object.values((organisation || {}).artists || {})
  }

  return {
    billingDetails,
    defaultPaymentMethod,
    organisationArtists,
  }
}

const fetchInvoices = async (organisation) => {
  const errors = []

  // Fetch next invoice
  const { res: upcomingInvoice, error: upcomingInvoiceError } = await fetchUpcomingInvoice(organisation.id)
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
const setupBilling = (set, get) => async (user, artist, shouldFetchOrganisationDetailsOnly = false) => {
  if (!user.id || !artist.id || typeof get !== 'function') return
  // Check user has access to the artist's org or is sysadmin
  const userOrgIds = Object.values(user.organizations).map(org => org.id)
  const artistOrgId = artist.organization.id
  const userHasAccessToArtistOrg = userOrgIds.includes(artistOrgId)
  // const userIsAdmin = user.role === 'admin'
  const userIsAdmin = false

  if (!userHasAccessToArtistOrg && !userIsAdmin) {
    resetStore(set)()
    return
  }

  // If changing artist, check it's org is actually different first
  const currentOrg = get().artistOrg
  const orgHasChanged = currentOrg.id !== artistOrgId
  if (!orgHasChanged) return

  const artistOrg = await billingHelpers.fetchOrgById(artistOrgId)
  const {
    billingDetails,
    defaultPaymentMethod,
    organisationArtists,
  } = await fetchOrganisationDetails(artistOrg)

  const artistCurrency = artist.min_daily_budget_info.currency

  if (shouldFetchOrganisationDetailsOnly) {
    set({
      artistOrg,
      organisationArtists,
      billingDetails,
      defaultPaymentMethod,
      artistCurrency,
    })
    return
  }

  const {
    upcomingInvoice,
    errors,
  } = await fetchInvoices(artistOrg)

  let organisationUsers = []
  const organisationUsersResponse = await billingHelpers.getOrganisationUsers(artistOrg.id)
  // TODO: 3 Is this needed in the store, or just on the billing page
  if (!organisationUsersResponse.error) {
    organisationUsers = organisationUsersResponse.res.users
  } else {
    organisationUsers = Object.values((artistOrg || {}).users || {})
  }

  let organisationInvites = []
  const organisationInvitesResponse = await billingHelpers.getOrganisationInvites()
  // TODO: 3 Is this needed in the store, or just on the billing page
  if (!organisationInvitesResponse.error) {
    organisationInvites = organisationInvitesResponse.res.invites
  }

  let transferRequests = []
  const transferRequestsResponse = await billingHelpers.getTransferRequests()
  // TODO: 3 Is this needed in the store, or just on the billing page
  if (!transferRequestsResponse.error) {
    transferRequests = transferRequestsResponse.res.transferRequests
  }

  // SET
  set({
    artistOrg,
    loading: false,
    loadingErrors: errors,
    organisationUsers,
    organisationArtists,
    billingDetails,
    upcomingInvoice,
    artistCurrency,
    defaultPaymentMethod,
    organisationInvites,
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

// * SELECT ACTIVE ORGANISATION
const selectOrganisation = (set) => async (user, artist) => {
  set({ loading: true })
  await setupBilling(set)(user, artist)
}

export const removeOrganisationUser = (set, get) => (user) => {
  const { organisation, organisationUsers } = get()

  const organisationUsersUpdated = produce(organisationUsers, draftState => {
    return draftState.filter((u) => u.id !== user.id)
  })

  const organisationUpdated = produce(organisation, draftState => {
    delete draftState.users[user.id]
    return draftState
  })

  set({ organisationUsers: organisationUsersUpdated, organisation: organisationUpdated })
}

export const removeOrganisationInvite = (set, get) => async (organisationInvite) => {
  const { organisationInvites } = get()

  const organisationInvitesUpdated = produce(organisationInvites, draftState => {
    return draftState.filter((oi) => oi.token !== organisationInvite.token)
  })

  set({ organisationInvites: organisationInvitesUpdated })
}

export const removeTransferRequest = (set, get) => async (transferRequest) => {
  const { transferRequests } = get()

  const transferRequestsUpdated = produce(transferRequests, draftState => {
    return draftState.filter((tr) => tr.token !== transferRequest.token)
  })

  set({ transferRequests: transferRequestsUpdated })
}

export const updateOrganisationArtists = (set) => async (organisationArtists) => {
  set({ organisationArtists })
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
  selectOrganisation: selectOrganisation(set, get),
  removeOrganisationUser: removeOrganisationUser(set, get),
  removeOrganisationInvite: removeOrganisationInvite(set, get),
  removeTransferRequest: removeTransferRequest(set, get),
  updateOrganisationArtists: updateOrganisationArtists(set, get),
  updateUpcomingInvoice: updateUpcomingInvoice(set, get),
}))

export default useBillingStore
