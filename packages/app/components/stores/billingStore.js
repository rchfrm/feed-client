import create from 'zustand'
import produce from 'immer'

import * as billingHelpers from '@/app/helpers/billingHelpers'
import { fetchUpcomingInvoice } from '@/app/helpers/invoiceHelpers'

const initialState = {
  allOrgs: [],
  loading: true,
  loadingErrors: [],
  organisation: {},
  billingDetails: {},
  nextInvoice: {},
  defaultPaymentMethod: null,
  referralsDetails: {},
}

// FETCH ALL ORGS the user has access to
const fetchAllOrgs = async (user) => {
  const allOrgs = await billingHelpers.getAllOrgsInfo({ user })
  return allOrgs
}

// * INITIAL SETUP
const setupBilling = (set) => async (user) => {
  // FETCH the first organisation and set it
  const allOrgs = await fetchAllOrgs(user)
  const organisation = allOrgs.find(({ role }) => role === 'owner')
  const billingDetails = billingHelpers.getbillingDetails(organisation)
  const defaultPaymentMethod = billingHelpers.getDefaultPaymentMethod(billingDetails.allPaymentMethods)
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
    loading: false,
    loadingErrors: errors,
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


const useBillingStore = create((set, get) => ({
  ...initialState,
  // GETTERS
  setupBilling: setupBilling(set),
  // SETTERS,
  addPaymentMethod: addPaymentMethod(set, get),
  deletePaymentMethod: deletePaymentMethod(set, get),
  updateDefaultPayment: updateDefaultPayment(set, get),
}))

export default useBillingStore
