import get from 'lodash/get'

import * as api from '@/helpers/api'

// * PAYMENT
// * --------------------

// SUBMIT PAYMENT
/**
 * @param {string} organisationId
 * @param {string} paymentMethodId
 * @returns {Promise<any>}
 */
export const submitPaymentMethod = async (organisationId, paymentMethodId) => {
  const payload = { token: paymentMethodId }
  const endpoint = `/organizations/${organisationId}/billing/payments`
  const errorTracking = {
    category: 'Billing',
    action: 'Submit payment method',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}

// SET PAYMENT AS DEFAULT
/**
 * @param {string} organisationId
 * @param {string} paymentId
 * @returns {Promise<any>}
 */
export const setPaymentAsDefault = async (organisationId, paymentMethodId) => {
  const payload = null
  const endpoint = `/organizations/${organisationId}/billing/payments/${paymentMethodId}/default`
  const errorTracking = {
    category: 'Billing',
    action: 'Set payment as default',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}


// DELETE PAYMENT
/**
 * @param {string} organisationId
 * @param {string} paymentId
 * @returns {Promise<any>}
 */
export const deletePaymentMethod = async (organisationId, paymentMethodId) => {
  // const payload = null
  // const endpoint = `/organizations/${organisationId}/billing/payments/${paymentMethodId}/default`
  // const errorTracking = {
  //   category: 'Billing',
  //   action: 'Set payment as default',
  // }
  // return api.requestWithCatch('post', endpoint, payload, errorTracking)
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = { organisationId, paymentMethodId }
      resolve({ res, error: { message: 'nonon' } })
    }, 800)
  })
}


// * BILLING
// * --------------------

const getOrganizationDetails = (user) => {
  const { organizations = [] } = user
  const organizationsArray = Object.values(organizations)
  return organizationsArray.map(({ id, name, role, _links = {} }) => {
    const link = get(_links, ['self', 'href'], null)
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
  const { link } = org
  if (!link) return {}
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

// GET ALL BILLING DETAILS
export const getbillingDetails = ({ name, payment_status = 'none', billing_details: billingDetails, role }) => {
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

// GET DEFAULT PAYMENT METHOD
export const getDefaultPaymentMethod = (allPaymentMethods = []) => {
  if (!allPaymentMethods.length) return null
  return allPaymentMethods.find(({ is_default }) => is_default)
}

// GET ALL INFO ABOUT ALL ORGS
export const getAllOrgsInfo = async ({ user }) => {
  const orgDetails = getOrganizationDetails(user)
  const fetchOrgPromises = orgDetails.map((org) => fetchOrg(org))
  const allOrgsInfo = await Promise.all(fetchOrgPromises)
  return allOrgsInfo
}


// * REFERRALS
// * --------------------
export const getReferralsData = () => {
  const data = {
    total_referrals: 3,
    total_referrals_complete: 2,
    total_credits: 1000,
    currency: 'GBP',
    currency_offset: 100,
    total_credits_spent: 555,
  }
  const dataFormatted = {
    ...data,
    total_credits_remaining: data.total_credits - data.total_credits_spent,
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ res: dataFormatted, error: null })
    }, 800)
  })
}

export const transferReferralCredits = (sourceOrgId, destOrIg) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ res: 'success', error: null })
    }, 800)
  })
}
