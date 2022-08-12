import get from 'lodash/get'
import moment from 'moment'

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

// GET STRIPE CLIENT SECRET
/**
 * @param {string} organisationId
 * @returns {Promise<any>}
 */
export const getStripeClientSecret = async (organisationId) => {
  const payload = null
  const endpoint = `/organizations/${organisationId}/billing/payments/client_secret`
  const errorTracking = {
    category: 'Billing',
    action: 'Get Stripe client secret',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

// GET PRORATIONS PREVIEW
/**
 * @param {string} organisationId
 * @param {object} profilesToUpgrade
 * @returns {Promise<any>}
 */
export const getProrationsPreview = async (organisationId, profilesToUpgrade) => {
  const payload = profilesToUpgrade
  const endpoint = `/organizations/${organisationId}/billing/preview_prorations`
  const errorTracking = {
    category: 'Billing',
    action: 'Get prorations preview',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}

// UPGRADE PRICING PLANS
/**
 * @param {string} organisationId
 * @param {object} profilesToUpgrade
 * @returns {Promise<any>}
 */
export const upgradePricingPlan = async (organisationId, profilesToUpgrade) => {
  const payload = profilesToUpgrade
  const endpoint = `/organizations/${organisationId}/billing/upgrade_profiles`
  const errorTracking = {
    category: 'Billing',
    action: 'Upgrade pricing plans',
  }
  return api.requestWithCatch('patch', endpoint, payload, errorTracking)
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

// GET PRICING PLAN STRING
export const getPricingPlanString = (planPrefix, isAnnualPricing) => {
  const planPeriod = isAnnualPricing && planPrefix !== 'basic' ? 'annual' : 'monthly'

  return `${planPrefix}_${planPeriod}`
}

// FORMAT PRORATIONS DATA
export const formatProrationsPreview = ({ profilesToUpgrade, organisationArtists, prorationsPreview }) => {
  const {
    currency,
    currentPeriodStart,
    currentPeriodEnd,
    prorations,
    nextInvoice,
  } = prorationsPreview

  const { profileAmounts: nextInvoiceProfileAmounts } = nextInvoice
  const { profileAmounts } = prorations

  const periodStart = moment(currentPeriodStart)
  const periodEnd = moment(currentPeriodEnd)
  const daysInPeriod = periodEnd.diff(periodStart, 'days')
  const today = moment()
  const daysRemainingInPeriod = periodEnd.startOf('day').diff(today.startOf('day'), 'days')
  const isFirstDayOfPeriod = daysRemainingInPeriod === daysInPeriod

  const upgradedProfiles = Object.keys(profilesToUpgrade).reduce((array, id) => {
    const profile = organisationArtists.find((profile) => profile.id === id)
    const [planPrefix] = profilesToUpgrade[id].split('_')
    const currentPayment = profileAmounts[id] || 0
    const nextPayment = nextInvoiceProfileAmounts[id] || 0

    array.push({
      name: profile.name,
      plan: planPrefix,
      currentPayment,
      nextPayment,
    })

    return array
  }, [])

  return {
    currency,
    upgradedProfiles,
    prorations,
    nextInvoice,
    period: {
      daysInPeriod,
      daysRemainingInPeriod,
      isFirstDayOfPeriod,
    },
  }
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

export const billingOptions = [
  {
    name: 'invoices',
    title: 'Invoices',
    hasDescription: true,
  },
  {
    name: 'profiles',
    title: 'Profiles',
    hasDescription: true,
  },
  {
    name: 'paymentMethod',
    title: 'Payment methods',
    hasDescription: true,
  },
  {
    name: 'users',
    title: 'Team',
    hasDescription: true,
  },
]
