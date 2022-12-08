import moment from 'moment'
import * as api from '@/helpers/api'
import { fetchUpcomingInvoice } from '@/app/helpers/invoiceHelpers'

// * PAYMENT
// * --------------------

// SUBMIT PAYMENT
/**
 * @param {string} organizationId
 * @param {string} paymentMethodId
 * @param {string} currency
 * @param {boolean} shouldBeDefault
 * @param {string} promoCode
 * @returns {Promise<any>}
 */
export const submitPaymentMethod = async ({ organizationId, paymentMethodId, currency, shouldBeDefault = false, promoCode }) => {
  const payload = {
    token: paymentMethodId,
    currency,
    is_default: shouldBeDefault,
    promoCode,
  }
  const endpoint = `/organizations/${organizationId}/billing/payments`
  const errorTracking = {
    category: 'Billing',
    action: 'Submit payment method',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}

// SET PAYMENT AS DEFAULT
/**
 * @param {string} organizationId
 * @param {string} paymentMethodId
 * @returns {Promise<any>}
 */
export const setPaymentAsDefault = async (organizationId, paymentMethodId) => {
  const payload = null
  const endpoint = `/organizations/${organizationId}/billing/payments/${paymentMethodId}/default`
  const errorTracking = {
    category: 'Billing',
    action: 'Set payment as default',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}

// DELETE PAYMENT
/**
 * @param {string} organizationId
 * @param {string} paymentMethodId
 * @returns {Promise<any>}
 */
export const deletePaymentMethod = async (organizationId, paymentMethodId) => {
  const payload = null
  const endpoint = `/organizations/${organizationId}/billing/payments/${paymentMethodId}`
  const errorTracking = {
    category: 'Billing',
    action: 'Delete payment method',
  }
  return api.requestWithCatch('delete', endpoint, payload, errorTracking)
}

// GET STRIPE CLIENT SECRETS
/**
 * @param {string} organizationId
 * @param {string} type
 * @returns {Promise<any>}
 */
export const getStripeClientSecret = async (organizationId, type) => {
  const validTypes = ['setup', 'payment']
  const isValidType = validTypes.includes(type)
  if (!isValidType) {
    throw new Error(`Provide valid type, one of: ${validTypes.join(', ')}`)
  }
  const payload = null
  const endpoint = `/organizations/${organizationId}/billing/payments/${type}_intent/secret`
  const errorTracking = {
    category: 'Billing',
    action: 'Get Stripe client secret',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

// GET PRORATIONS PREVIEW
/**
 * @param {string} organizationId
 * @param {object} profilesToUpgrade
 * @returns {Promise<any>}
 */
export const getProrationsPreview = async (organizationId, profilesToUpgrade, promoCode) => {
  const payload = {
    profilePlans: profilesToUpgrade,
    promoCode,
  }
  const endpoint = `/organizations/${organizationId}/billing/preview_prorations`
  const errorTracking = {
    category: 'Billing',
    action: 'Get prorations preview',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}

export const isValidPromoCode = (promoCode) => {
  const regexp = new RegExp(/^[A-Z]{4}[0-9]{2}$/)

  return regexp.test(promoCode)
}

// UPGRADE PRICING PLANS
/**
 * @param {string} organizationId
 * @param {object} profilesToUpgrade
 * @param {string} promoCode
 * @returns {Promise<any>}
 */
export const upgradeProfiles = async (organizationId, profilesToUpgrade, promoCode = '') => {
  // TODO FD-1523 : If this returns a clientSecret, use confirmCardPayment
  const payload = {
    profilePlans: profilesToUpgrade,
  }
  if (promoCode) {
    payload.promoCode = promoCode
  }
  const endpoint = `/organizations/${organizationId}/billing/upgrade_profiles`
  const errorTracking = {
    category: 'Billing',
    action: 'Upgrade pricing plans',
  }
  return api.requestWithCatch('patch', endpoint, payload, errorTracking)
}

// * BILLING
// * --------------------

/**
 * @param {string} orgId
 * @returns {Promise<object>}
 */
export const fetchOrgById = async (orgId) => {
  const endpoint = `organizations/${orgId}`
  const errorTracking = {
    category: 'Billing',
    action: 'Get organization by ID',
  }
  return api.requestWithCatch('get', endpoint, null, errorTracking)
}

// Sort payment methods, putting the default payment first
const sortPaymentMethods = (paymentMethodsArray, defaultMethod) => {
  if (paymentMethodsArray.length === 1) return paymentMethodsArray
  const methodsWithoutDefault = paymentMethodsArray.filter(({ is_default }) => !is_default)
  return [defaultMethod, ...methodsWithoutDefault]
}

// Manage profiles to upgrade state
export const handleInitialize = (draftState, payload) => {
  const {
    orgArtists,
    selectedArtistID,
    selectedArtistPlan,
  } = payload

  if (!orgArtists || !selectedArtistID || !selectedArtistPlan) return draftState

  return orgArtists.reduce((acc, orgArtist) => {
    if (orgArtist.id === selectedArtistID) {
      acc[orgArtist.id] = selectedArtistPlan
    } else if (orgArtist.plan.includes('basic')) {
      acc[orgArtist.id] = 'growth'
    } else {
      const [planPrefix] = orgArtist.plan?.split('_') || 'growth'
      acc[orgArtist.id] = planPrefix
    }

    return acc
  }, {})
}

export const handleUpdateProfilePlan = (draftState, payload) => {
  const { profileId, plan } = payload

  if (!profileId || !plan || !Object.hasOwn(draftState, profileId)) return draftState

  if (plan === 'basic') {
    return Object.keys(draftState).reduce((acc, id) => {
      if (id === profileId) {
        acc[id] = plan
      } else {
        acc[id] = 'none'
      }
      return acc
    }, draftState)
  }

  draftState[profileId] = plan
  return draftState
}

// GET ALL BILLING DETAILS
export const getBillingDetails = ({ name, payment_status = 'none', customer, role }) => {
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

// GET PRICING PLAN STRING
export const getPricingPlanString = (planPrefix, isAnnualPricing) => {
  const planPeriod = isAnnualPricing && planPrefix !== 'basic' ? 'annual' : 'monthly'

  return `${planPrefix}_${planPeriod}`
}

// SET INITIAL VALUE FOR PRICING PLAN
/**
 * @param {string} artistPlan
 * @param {boolean} canChooseBasic
 * @param {boolean} isUpgradeToPro
 * @returns {string}
 */
export const setInitialPlan = (artistPlan, canChooseBasic, isUpgradeToPro) => {
  if (canChooseBasic) {
    const [planPrefix] = artistPlan?.split('_')
    return planPrefix || 'growth'
  }
  return isUpgradeToPro ? 'pro' : 'growth'
}

// FORMAT PRORATIONS DATA
export const formatProrationsPreview = ({ profilesToUpgrade, organizationArtists, prorationsPreview }) => {
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
  const isFirstDayOfPeriod = (!currentPeriodStart && !currentPeriodEnd) || daysRemainingInPeriod === daysInPeriod

  const upgradedProfiles = Object.keys(profilesToUpgrade).reduce((array, id) => {
    const profile = organizationArtists.find((profile) => profile.id === id)
    const [planPrefix] = profilesToUpgrade[id]?.split('_') || []
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

export const doProrationsMatch = (upgradedProfiles) => {
  return upgradedProfiles.every(({ currentPayment, nextPayment }) => currentPayment === nextPayment)
}

// * PROFILE TRANSFER
// * --------------------
export const getOrganizationArtists = async (organizationId) => {
  const payload = {}
  const endpoint = `/organizations/${organizationId}/artists`
  const errorTracking = {
    category: 'Billing',
    action: 'Get organization artists',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
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

// * USERS AND ORGANIZATION INVITES
// * --------------------
export const getOrganizationUsers = async (organizationId) => {
  const payload = {}
  const endpoint = `/organizations/${organizationId}/users`
  const errorTracking = {
    category: 'Billing',
    action: 'Get organization users',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

export const createOrganizationInvite = async (organizationId, email) => {
  const payload = { email }
  const endpoint = `/organizations/${organizationId}/invite`
  const errorTracking = {
    category: 'Billing',
    action: 'Create organization invite',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}

export const deleteOrganizationUser = async (organizationId, userId) => {
  const payload = {}
  const endpoint = `/organizations/${organizationId}/users/${userId}`
  const errorTracking = {
    category: 'Billing',
    action: 'Delete organization user',
  }
  return api.requestWithCatch('delete', endpoint, payload, errorTracking)
}

export const getOrganizationInvites = async () => {
  const payload = {}
  const endpoint = '/organization_invites'
  const errorTracking = {
    category: 'Billing',
    action: 'Get organization invites',
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

export const acceptOrganizationInvite = async (token) => {
  const payload = {}
  const endpoint = `/organization_invites/${token}/accept`
  const errorTracking = {
    category: 'Billing',
    action: 'Accept organization invite',
  }
  return api.requestWithCatch('post', endpoint, payload, errorTracking)
}

export const rejectOrganizationInvite = async (token) => {
  const payload = {}
  const endpoint = `/organization_invites/${token}/reject`
  const errorTracking = {
    category: 'Billing',
    action: 'Reject organization invite',
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

export const formatProfileAmounts = (organizationArtists, profileAmounts) => {
  const formattedProfileAmounts = Object.keys(profileAmounts).reduce((result, id) => {
    const profile = organizationArtists.find((profile) => profile.id === id)
    const [planPrefix] = profile?.plan.split('_') || []

    const value = {
      name: profile.name,
      amount: profileAmounts[id],
    }

    if (!result[planPrefix]) {
      result[planPrefix] = [value]

      return result
    }

    result[planPrefix].push(value)

    return result
  }, {})

  return Object.fromEntries(Object.entries(formattedProfileAmounts).sort())
}

export const formatProfilesToUpgrade = (profilesToUpgrade, isAnnualPricing) => {
  return Object.keys(profilesToUpgrade).reduce((acc, cur) => {
    const [planPrefix] = profilesToUpgrade[cur]?.split('_') || []

    if (planPrefix === 'none') {
      acc[cur] = undefined
    } else {
      acc[cur] = getPricingPlanString(profilesToUpgrade[cur], isAnnualPricing)
    }

    return acc
  }, {})
}

export const fetchInvoices = async (organization) => {
  const errors = []

  // Fetch next invoice
  const { res: upcomingInvoice, error: upcomingInvoiceError } = await fetchUpcomingInvoice(organization.id)
  if (upcomingInvoiceError && upcomingInvoiceError.message !== 'Not Found') errors.push(upcomingInvoiceError)

  return {
    upcomingInvoice,
    errors,
  }
}
