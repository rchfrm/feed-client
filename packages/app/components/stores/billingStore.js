import create from 'zustand'
import produce from 'immer'
import * as billingHelpers from '@/app/helpers/billingHelpers'

const initialState = {
  organization: {},
  loading: true,
  organizationArtists: [],
  billingDetails: {},
  artistCurrency: {},
  defaultPaymentMethod: null,
  organizationInvites: [],
  canChooseFree: false,
}

const canChooseFree = (organizationArtists) => {
  const hasActiveBudget = (artist) => artist.preferences.targeting.status === 1
  const hasActiveGrowthOrProPlan = (artist) => {
    if (! artist.plan) return false
    const planPrefix = artist.plan.split('_')[0]
    return (planPrefix === 'growth' || planPrefix === 'pro') && artist.status !== 'active'
  }
  return ! organizationArtists.some((artist) => hasActiveGrowthOrProPlan(artist) || hasActiveBudget(artist))
}

// FETCH BILLING DETAILS
const fetchOrganizationDetails = async (organization) => {
  const billingDetails = billingHelpers.getBillingDetails(organization)
  const defaultPaymentMethod = billingHelpers.getDefaultPaymentMethod(billingDetails.allPaymentMethods)

  let organizationArtists
  const organizationArtistsResponse = await billingHelpers.getOrganizationArtists(organization.id)

  if (! organizationArtistsResponse.error) {
    organizationArtists = organizationArtistsResponse.res.artists
  } else {
    organizationArtists = Object.values((organization || {}).artists || {})
  }

  return {
    billingDetails,
    defaultPaymentMethod,
    organizationArtists,
  }
}

const resetStore = (set) => () => {
  set({
    ...initialState,
    loading: false,
  })
}

// * INITIAL SETUP
const setupBilling = (set, get) => async (user, artist) => {
  if (typeof get !== 'function') return
  if (user.id && ! user.artists.length) {
    resetStore(set)()
    return
  }
  if (! user.id || ! artist.id) return
  // Check user has access to the artist's org or is sysadmin
  const userOrgIds = Object.values(user.organizations).map((org) => org.id)
  const artistOrgId = artist.organization.id
  const userHasAccessToArtistOrg = userOrgIds.includes(artistOrgId)
  const userIsAdmin = user.role === 'admin'

  if (! userHasAccessToArtistOrg && ! userIsAdmin) {
    resetStore(set)()
    return
  }

  // If changing artist, check it's org is actually different first
  const currentOrg = get().organization
  const orgHasChanged = currentOrg.id !== artistOrgId
  if (! orgHasChanged) {
    set({ loading: false })
    return
  }

  set({ loading: true })

  const { res: organization } = await billingHelpers.fetchOrgById(artistOrgId)
  const {
    billingDetails,
    defaultPaymentMethod,
    organizationArtists,
  } = await fetchOrganizationDetails(organization)

  const artistCurrency = artist?.currency || 'GBP'

  set({
    loading: false,
    organization,
    organizationArtists,
    billingDetails,
    defaultPaymentMethod,
    artistCurrency,
    canChooseFree: canChooseFree(organizationArtists),
  })
}

// * ADD PAYMENT METHOD
const addPaymentMethod = (set, get) => (paymentMethod) => {
  const setAsDefault = paymentMethod.is_default
  const { billingDetails } = get()
  const paymentMethodsUpdated = produce(billingDetails?.allPaymentMethods || [], (draftState) => {
    draftState.push(paymentMethod)
  })
  const billingDetailsUpdated = produce(billingDetails, (draftState) => {
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
  const billingDetailsUpdated = produce(billingDetails, (draftState) => {
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
  const billingDetailsUpdated = produce(billingDetails, (draftState) => {
    draftState.allPaymentMethods.forEach((method) => {
      method.is_default = method.id === newPaymentMethodId
    })
  })
  // Update state
  set({
    defaultPaymentMethod,
    billingDetails: billingDetailsUpdated,
  })
}

// * SELECT ACTIVE ORGANIZATION
const selectOrganization = (set) => async (user, artist) => {
  set({ loading: true })
  await setupBilling(set)(user, artist)
}

export const addOrganizationArtist = (set, get) => (artist) => {
  const { organizationArtists } = get()
  const organizationArtistsUpdated = produce(organizationArtists || [], (draftState) => {
    draftState.push(artist)
  })

  set({
    organizationArtists: organizationArtistsUpdated,
    canChooseFree: canChooseFree(organizationArtistsUpdated),
  })
}

export const updateOrganizationArtists = (set) => async (organizationArtists) => {
  set({
    organizationArtists,
    canChooseFree: canChooseFree(organizationArtists),
  })
}

const updateUpcomingInvoice = (set) => (upcomingInvoice) => {
  set({ upcomingInvoice })
}

const useBillingStore = create((set, get) => ({
  ...initialState,
  resetStore: resetStore(set),
  setupBilling: setupBilling(set, get),
  addPaymentMethod: addPaymentMethod(set, get),
  deletePaymentMethod: deletePaymentMethod(set, get),
  updateDefaultPayment: updateDefaultPayment(set, get),
  selectOrganization: selectOrganization(set, get),
  updateOrganizationArtists: updateOrganizationArtists(set, get),
  addOrganizationArtist: addOrganizationArtist(set, get),
  updateUpcomingInvoice: updateUpcomingInvoice(set, get),
}))

export default useBillingStore
