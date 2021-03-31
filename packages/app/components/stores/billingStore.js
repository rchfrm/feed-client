import create from 'zustand'
import produce from 'immer'

import * as paymentHelpers from '@/app/helpers/paymentHelpers'

const initialState = {
  loading: true,
  organisation: {},
  billingDetails: {},
  defaultPaymentMethod: null,
}

// FETCH ALL ORGS the user has access to
const fetchAllOrgs = async (user) => {
  const allOrgs = await paymentHelpers.getAllOrgsInfo({ user })
  return allOrgs
}

// * INITIAL SETUP
// FETCH the first organisation and set it
const setupBilling = (set) => async (user) => {
  const allOrgs = await fetchAllOrgs(user)
  const organisation = allOrgs.find(({ role }) => role === 'owner')
  const billingDetails = paymentHelpers.getbillingDetails(organisation)
  const defaultPaymentMethod = paymentHelpers.getDefaultPaymentMethod(billingDetails.allPaymentMethods)
  // SET
  set({
    organisation,
    billingDetails,
    defaultPaymentMethod,
    loading: false,
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
  updateDefaultPayment: updateDefaultPayment(set, get),
}))

export default useBillingStore
