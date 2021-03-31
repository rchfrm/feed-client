import create from 'zustand'

import * as paymentHelpers from '@/app/helpers/paymentHelpers'

const initialState = {
  loading: true,
  organisation: {},
  billingDetails: {},
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
  // SET
  set({ organisation, billingDetails, loading: false })
}


const useBillingStore = create((set, get) => ({
  ...initialState,
  // GETTERS
  setupBilling: setupBilling(set, get),
}))

export default useBillingStore
