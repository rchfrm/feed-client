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
export const submitPaymentMethod = async ({ organisationId, paymentMethodId, currency, shouldBeDefault = false }) => {
  const payload = {
    token: paymentMethodId,
    currency,
    is_default: shouldBeDefault,
  }
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
export const setPaymentAsDefault = async ({ organisationId, paymentMethodId }) => {
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
  const payload = null
  const endpoint = `/organizations/${organisationId}/billing/payments/${paymentMethodId}`
  const errorTracking = {
    category: 'Billing',
    action: 'Delete payment method',
  }
  return api.requestWithCatch('delete', endpoint, payload, errorTracking)
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
export const getbillingDetails = ({ name, payment_status = 'none', customer, role }) => {
  // If no payment status setup
  if (payment_status === 'none' || !customer) {
    return {
      name,
      role,
      defaultMethod: false,
      allPaymentMethods: [],
    }
  }

  // Get default payment method
  const { payment_methods: paymentMethods } = customer
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

export const transferReferralCredits = (sourceOrgId, destOrgId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ res: 'success', error: null })
    }, 800)
  })
}

// * PROFILE TRANSFER
// * --------------------
export const getOrganisationArtists = async (organisationId) => {
  const payload = {}
  const endpoint = `/organizations/${organisationId}/artists`
  const errorTracking = {
    category: 'Billing',
    action: 'Get organization artists',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

export const createTransferRequest = async (artistId, email) => {
  const payload = { email }
  const endpoint = `/artists/${artistId}/transfer`
  const errorTracking = {
    category: 'Billing',
    action: 'Create transfer request',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}

export const getTransferRequests = async () => {
  const payload = {}
  const endpoint = '/artist_transfers'
  const errorTracking = {
    category: 'Billing',
    action: 'Get artist transfers',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

export const acceptTransferRequest = async (token, organisationId) => {
  const payload = { organization_id: organisationId }
  const endpoint = `/artist_transfers/${token}/accept`
  const errorTracking = {
    category: 'Billing',
    action: 'Accept artist transfer',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}

export const rejectTransferRequest = async (token) => {
  const payload = {}
  const endpoint = `/artist_transfers/${token}/reject`
  const errorTracking = {
    category: 'Billing',
    action: 'Reject artist transfer',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}

// * USERS AND ORGANISATION INVITES
// * --------------------
export const getOrganisationUsers = async (organisationId) => {
  const payload = {}
  const endpoint = `/organizations/${organisationId}/users`
  const errorTracking = {
    category: 'Billing',
    action: 'Get organization users',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

export const createOrganizationInvite = async (organisationId, email) => {
  const payload = { email }
  const endpoint = `/organizations/${organisationId}/invite`
  const errorTracking = {
    category: 'Billing',
    action: 'Create organization invite',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}

export const deleteOrganisationUser = async (organisationId, userId) => {
  const payload = {}
  const endpoint = `/organizations/${organisationId}/users/${userId}`
  const errorTracking = {
    category: 'Billing',
    action: 'Delete organisation user',
  }
  return api.requestWithCatch('delete', endpoint, payload, errorTracking)
}

export const getOrganisationInvites = async () => {
  const payload = {}
  const endpoint = '/organization_invites'
  const errorTracking = {
    category: 'Billing',
    action: 'Get organisation invites',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

export const acceptOrganisationInvite = async (token) => {
  const payload = {}
  const endpoint = `/organization_invites/${token}/accept`
  const errorTracking = {
    category: 'Billing',
    action: 'Accept organisation invite',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}

export const rejectOrganisationInvite = async (token) => {
  const payload = {}
  const endpoint = `/organization_invites/${token}/reject`
  const errorTracking = {
    category: 'Billing',
    action: 'Reject organisation invite',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}
