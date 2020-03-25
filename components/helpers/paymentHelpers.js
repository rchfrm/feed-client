import server from './server'
import * as api from './api'

// PAYMENTS
/**
 * @param {string} organisationId
 * @param {string} paymentMethodId
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
const submitPaymentMethod = async (organisationId, paymentMethodId, verifyIdToken) => {
  return api.post(`/organizations/${organisationId}/billing/payments`, { token: paymentMethodId }, verifyIdToken)
}

/**
 * @param {string} organisationId
 * @param {string} paymentId
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
const setPaymentAsDefault = async (organisationId, paymentId, verifyIdToken) => {
  return api.post(`/organizations/${organisationId}/billing/payments/${paymentId}/default`, verifyIdToken)
    .catch(server.catchAxiosError)
}


const getOrganizationDetails = (user) => {
  const { organizations = [] } = user
  const organizationsArray = Object.values(organizations)
  return organizationsArray.map(({ id, name, role, _links: { self: { href: link } } }) => {
    return {
      id,
      name,
      link,
      role,
    }
  })
}

/**
 * @param {object} org
 * @returns {Promise<any>}
 */
const fetchOrg = async (org) => {
  return {
    ...await api.get(org.link),
    role: org.role,
  }
}


// Sort payment methods, putting the default payment first
const sortPaymentMethods = (paymentMethodsArray, defaultMethod) => {
  if (paymentMethodsArray.length === 1) return paymentMethodsArray
  const methodsWithoutDefault = paymentMethodsArray.filter(({ is_default }) => !is_default)
  return [defaultMethod, ...methodsWithoutDefault]
}


const getbillingDetails = ({ name, payment_status = 'none', billing_details: billingDetails, role }) => {
  // If no payment status setup
  if (payment_status === 'none' || !billingDetails) {
    return {
      name,
      role,
      defaultMethod: false,
      allPaymentMethods: [],
    }
  }

  // Get default payment method
  const { payment_methods: paymentMethods } = billingDetails
  const paymentMethodsArray = Object.values(paymentMethods)
  // Method is the only method, or the one marked as default
  const defaultMethod = paymentMethodsArray.length === 1
    ? paymentMethodsArray[0]
    : paymentMethodsArray.find(({ is_default }) => is_default)
  // Sort payment methods, putting default method on top
  const sortedPaymentMethods = sortPaymentMethods(paymentMethodsArray, defaultMethod)
  // Return data
  return {
    name,
    role,
    allPaymentMethods: sortedPaymentMethods,
    defaultMethod,
  }
}

// Run this to test if there is no active payment method
// returns true if no payment
const testNoPayment = (billingDetails) => {
  return billingDetails.some(({ defaultMethod, role }) => {
    return !defaultMethod && role === 'owner'
  })
}

const getAllOrgsInfo = async ({ user }) => {
  const orgDetails = getOrganizationDetails(user)
  const fetchOrgPromises = orgDetails.map((org) => fetchOrg(org))
  const allOrgsInfo = await Promise.all(fetchOrgPromises)
  return allOrgsInfo
}


export default {
  submitPaymentMethod,
  setPaymentAsDefault,
  getOrganizationDetails,
  fetchOrg,
  getbillingDetails,
  getAllOrgsInfo,
  testNoPayment,
}
