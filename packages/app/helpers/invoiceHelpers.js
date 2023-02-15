import { requestWithCatch } from '@/helpers/api'

// * ARCHIVED INVOICES
// -------------------
export const fetchArchivedInvoices = (organizationId) => {
  const payload = null
  const endpoint = `/organizations/${organizationId}/billing/invoices`
  const errorTracking = {
    category: 'Billing',
    action: 'Fetch invoices',
  }
  return requestWithCatch('get', endpoint, payload, errorTracking)
}

// * UPCOMING INVOICE
// ------------------
export const fetchUpcomingInvoice = async (organizationId) => {
  const payload = null
  const endpoint = `/organizations/${organizationId}/billing/invoices/upcoming`
  const errorTracking = {
    category: 'Billing',
    action: 'Fetch latest invoice',
  }
  const { res, error } = await requestWithCatch('get', endpoint, payload, errorTracking)

  if (error) return { error }

  return { res }
}

// * REFRESHED INVOICE
// ------------------
export const fetchRefreshedInvoice = (organizationId, invoiceId) => {
  const payload = null
  const endpoint = `/organizations/${organizationId}/billing/invoices/${invoiceId}/refresh`
  const errorTracking = {
    category: 'Billing',
    action: 'Fetch refreshed invoice',
  }

  return requestWithCatch('get', endpoint, payload, errorTracking)
}
