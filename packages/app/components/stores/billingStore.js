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
  billingDetails: {},
  nextInvoice: {},
  artistCurrency: {},
  defaultPaymentMethod: null,
  referralsDetails: {},
  organisationInvites: [],
}

// FETCH ALL ORGS the user has access to
const fetchAllOrgs = async (user) => {
  const allOrgs = await billingHelpers.getAllOrgsInfo({ user })
  return allOrgs
}


// FETCH BILLING DETAILS
const fetchOrganisationDetails = async (organisation) => {
  const errors = []
  const billingDetails = billingHelpers.getbillingDetails(organisation)
  const defaultPaymentMethod = billingHelpers.getDefaultPaymentMethod(billingDetails.allPaymentMethods)
  // Fetch next invoice
  const { res: nextInvoice, error: invoiceError } = await fetchUpcomingInvoice(organisation.id)
  if (invoiceError) errors.push(invoiceError)
  // Referrals data
  const { res: referralsDetails, error: referralsError = null } = await billingHelpers.getReferralsData()
  if (referralsError) errors.push(referralsError)
  return {
    nextInvoice,
    billingDetails,
    referralsDetails,
    defaultPaymentMethod,
    errors,
  }
}

// * INITIAL SETUP
const setupBilling = (set) => async ({ user, artistCurrency, activeOrganisation }) => {
  // FETCH the first organisation and set it
  const allOrgs = activeOrganisation ? null : await fetchAllOrgs(user)
  // TODO improve selecting the org
  const organisation = activeOrganisation || allOrgs[0]
  const {
    nextInvoice,
    billingDetails,
    referralsDetails,
    defaultPaymentMethod,
    errors,
  } = await fetchOrganisationDetails(organisation)

  let organisationUsers = []
  const organisationUsersResponse = await billingHelpers.getOrganisationUsers(organisation.id)
  if (!organisationUsersResponse.error) {
    organisationUsers = organisationUsersResponse.res.users
  } else {
    organisationUsers = Object.values((organisation || {}).users || {})
  }

  let organisationInvites = []
  const organisationInvitesResponse = await billingHelpers.getOrganisationInvites()
  if (!organisationInvitesResponse.error) {
    organisationInvites = organisationInvitesResponse.res.invites
  }

  // SET
  set({
    ...(allOrgs && { allOrgs }),
    organisation,
    organisationUsers,
    billingDetails,
    referralsDetails,
    defaultPaymentMethod,
    nextInvoice,
    artistCurrency,
    loading: false,
    loadingErrors: errors,
    organisationInvites,
  })
}

// * ADD PAYMENT METHOD
const addPaymentMethod = (set, get) => (paymentMethod) => {
  const setAsDefault = paymentMethod.is_default
  const { billingDetails } = get()
  const paymentMethodsUpdated = produce(billingDetails.allPaymentMethods, draftState => {
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
      const isDefault = method.id === newPaymentMethodId
      method.is_default = isDefault
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
    return draftState.filter((i) => i.token !== organisationInvite.token)
  })

  set({ organisationInvites: organisationInvitesUpdated })
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
}))

export default useBillingStore
