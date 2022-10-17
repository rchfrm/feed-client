import create from 'zustand'
import produce from 'immer'

import * as billingHelpers from '@/app/helpers/billingHelpers'
import { fetchUpcomingInvoice } from '@/app/helpers/invoiceHelpers'

const initialState = {
  allOrgs: [],
  loading: true,
  loadingErrors: [],
  organisation: {},
  organisationUsers: [],
  organisationArtists: [],
  billingEnabled: false,
  billingDetails: {},
  upcomingInvoice: null,
  artistCurrency: {},
  defaultPaymentMethod: null,
  organisationInvites: [],
  transferRequests: [],
}

// FETCH ALL ORGS the user has access to
const fetchAllOrgs = async (user) => {
  const allOrgs = await billingHelpers.getAllOrgsInfo({ user })
  return allOrgs
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

// * INITIAL SETUP
const setupBilling = (set) => async ({ user, artist, shouldFetchOrganisationDetailsOnly = false }) => {
  const {
    min_daily_budget_info: {
      currency: artistCurrency,
    },
  } = artist
  const userOrgIds = Object.values(user.organizations).map(org => org.id)
  const artistOrgId = artist.organization.id
  const userHasAccessToArtistOrg = userOrgIds.includes(artistOrgId)
  const userIsAdmin = user.role === 'admin'

  if (!userHasAccessToArtistOrg && !userIsAdmin) {
    // TODO: Handle this situation
    return
  }

  const artistOrg = await billingHelpers.fetchOrgById(artistOrgId)
  // TODO: Make sure everything below this point populates the store correctly
  const {
    billingDetails,
    defaultPaymentMethod,
    organisationArtists,
  } = await fetchOrganisationDetails(artistOrg)

  if (shouldFetchOrganisationDetailsOnly) {
    set({
      artistOrg,
      organisationArtists,
      billingDetails,
      defaultPaymentMethod,
      ...(artistCurrency && { artistCurrency }),
    })
    return
  }

  const {
    upcomingInvoice,
    errors,
    referralsDetails,
  } = await fetchInvoices(artistOrg)

  const billingEnabled = artistOrg.billing_enabled

  let organisationUsers = []
  const organisationUsersResponse = await billingHelpers.getOrganisationUsers(artistOrg.id)
  if (!organisationUsersResponse.error) {
    organisationUsers = organisationUsersResponse.res.users
  } else {
    organisationUsers = Object.values((artistOrg || {}).users || {})
  }

  let organisationInvites = []
  const organisationInvitesResponse = await billingHelpers.getOrganisationInvites()
  if (!organisationInvitesResponse.error) {
    organisationInvites = organisationInvitesResponse.res.invites
  }

  let transferRequests = []
  const transferRequestsResponse = await billingHelpers.getTransferRequests()
  if (!transferRequestsResponse.error) {
    transferRequests = transferRequestsResponse.res.transferRequests
  }

  // SET
  set({
    artistOrg,
    organisationUsers,
    organisationArtists,
    billingEnabled,
    billingDetails,
    referralsDetails,
    defaultPaymentMethod,
    upcomingInvoice,
    loadingErrors: errors,
    ...(artistCurrency && { artistCurrency }),
    loading: false,
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
const selectOrganisation = (set, get) => async (organisationId) => {
  set({ loading: true })
  const { allOrgs } = get()
  const organisation = allOrgs.find(({ id }) => id === organisationId)
  await setupBilling(set)({ activeOrganisation: organisation })
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
  // GETTERS
  setupBilling: setupBilling(set),
  // SETTERS,
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
