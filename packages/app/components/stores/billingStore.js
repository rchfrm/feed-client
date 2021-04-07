import create from 'zustand'
import produce from 'immer'

import * as billingHelpers from '@/app/helpers/billingHelpers'
<<<<<<< HEAD
import { fetchUpcomingInvoice } from '@/app/helpers/invoiceHelpers'

const initialState = {
  allOrgs: [],
  loading: true,
  loadingErrors: [],
  organisation: {},
  billingDetails: {},
  nextInvoice: {},
  artistCurrency: {},
  defaultPaymentMethod: null,
  referralsDetails: {},
=======

const initialState = {
  loading: true,
  organisation: {},
  billingDetails: {},
  defaultPaymentMethod: null,
>>>>>>> 8c17e6e (FD-402 Create Billing components (#337))
}

// FETCH ALL ORGS the user has access to
const fetchAllOrgs = async (user) => {
  const allOrgs = await billingHelpers.getAllOrgsInfo({ user })
  return allOrgs
}

// * INITIAL SETUP
// FETCH the first organisation and set it
<<<<<<< HEAD
const setupBilling = (set) => async (user, artistCurrency) => {
=======
const setupBilling = (set) => async (user) => {
>>>>>>> 8c17e6e (FD-402 Create Billing components (#337))
  const allOrgs = await fetchAllOrgs(user)
  const organisation = allOrgs.find(({ role }) => role === 'owner')
  const billingDetails = billingHelpers.getbillingDetails(organisation)
  const defaultPaymentMethod = billingHelpers.getDefaultPaymentMethod(billingDetails.allPaymentMethods)
<<<<<<< HEAD
  const errors = []
  // Fetch next invoice
  const { res: nextInvoice, error: fetchInvoiceError } = await fetchUpcomingInvoice(organisation.id)
  if (fetchInvoiceError) errors.push(fetchInvoiceError)
  // Referrals data
  const { res: referralsDetails, error: fetchReferralsError = null } = await billingHelpers.getReferralsData()
  if (fetchReferralsError) errors.push(fetchReferralsError)
  // SET
  set({
    allOrgs,
    organisation,
    billingDetails,
    referralsDetails,
    defaultPaymentMethod,
    nextInvoice,
    artistCurrency,
    loading: false,
    loadingErrors: errors,
=======
  // SET
  set({
    organisation,
    billingDetails,
    defaultPaymentMethod,
    loading: false,
>>>>>>> 8c17e6e (FD-402 Create Billing components (#337))
  })
}

// * ADD PAYMENT METHOD
const addPaymentMethod = (set, get) => (paymentMethod) => {
  const { billingDetails } = get()
  const paymentMethodsUpdated = produce(billingDetails.allPaymentMethods, draftState => {
    draftState.push(paymentMethod)
  })
  const billingDetailsUpdated = produce(billingDetails, draftState => {
    draftState.allPaymentMethods = paymentMethodsUpdated
  })
  set({ billingDetails: billingDetailsUpdated })
}

<<<<<<< HEAD
// * DELETE PAYMENT METHOD
const deletePaymentMethod = (set, get) => (paymentMethodId) => {
  const { billingDetails } = get()
  const billingDetailsUpdated = produce(billingDetails, draftState => {
    const index = draftState.allPaymentMethods.findIndex(({ id }) => id === paymentMethodId)
    if (index !== -1) draftState.allPaymentMethods.splice(index, 1)
  })
  set({ billingDetails: billingDetailsUpdated })
}

=======
>>>>>>> 8c17e6e (FD-402 Create Billing components (#337))
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


const useBillingStore = create((set, get) => ({
  ...initialState,
  // GETTERS
  setupBilling: setupBilling(set),
  // SETTERS,
  addPaymentMethod: addPaymentMethod(set, get),
<<<<<<< HEAD
  deletePaymentMethod: deletePaymentMethod(set, get),
=======
>>>>>>> 8c17e6e (FD-402 Create Billing components (#337))
  updateDefaultPayment: updateDefaultPayment(set, get),
}))

export default useBillingStore
