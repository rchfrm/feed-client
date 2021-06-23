import moment from 'moment'

import { formatCurrency } from '@/helpers/utils'
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
// Invoices are not finalised until 2 days after the end of the billing period to allow for
// correction in the Facebook ad spend data. See feed-api/config/stripe.ts:9
const formatUpcomingInvoice = (invoice) => {
  const { currency, exponent, hosted_invoice_url: invoiceUrl } = invoice
  const currencyOffset = 10 ** exponent
  let invoiceSections = []
  let totalFee = 0
  // Handle ad spend
  const adSpendSlug = 'ad_spend_total'
  const adSpendFeedSlug = 'ad_spend_fee'
  invoiceSections = [
    ...invoiceSections,
    {
      slug: adSpendFeedSlug,
      value: formatCurrency(invoice[adSpendFeedSlug] / currencyOffset, currency),
      valueRaw: invoice[adSpendFeedSlug],
      title: 'Feed service fee',
    },
    {
      slug: adSpendSlug,
      value: formatCurrency(invoice[adSpendSlug] / currencyOffset, currency),
      valueRaw: invoice[adSpendSlug],
      title: 'Facebook ad spend',
    },
  ]
  // Update fee
  totalFee += invoice[adSpendFeedSlug]
  // Handle conversion spend
  const conversionSaleSlug = 'conversions_total'
  const conversionFeeSlug = 'conversions_fee'
  if (invoice[conversionSaleSlug] > 0) {
    invoiceSections = [
      ...invoiceSections,
      {
        slug: conversionSaleSlug,
        value: formatCurrency(invoice[conversionSaleSlug] / currencyOffset, currency),
        valueRaw: invoice[conversionSaleSlug],
        title: 'Conversion sales',
      },
      {
        slug: conversionFeeSlug,
        value: formatCurrency(invoice[conversionFeeSlug] / currencyOffset, currency),
        valueRaw: invoice[conversionFeeSlug],
        title: 'Feed fee on conversions',
      },
    ]
    // Update fee
    totalFee += invoice[conversionFeeSlug]
  }

  const serviceFeePlusAdSpend = invoice[adSpendFeedSlug] + invoice[adSpendSlug]

  const today = moment()
  let paymentStatus
  if (moment(invoice.date_due).isSameOrAfter(today, 'day')) {
    paymentStatus = 'upcoming'
  } else if (invoice.status === 'draft' && !invoice.attempted && !invoice.paid) {
    paymentStatus = 'draft'
  } else if (invoice.paid) {
    paymentStatus = 'paid'
  } else {
    paymentStatus = 'failed'
  }

  // Return data
  return {
    ...invoice,
    invoiceUrl,
    paymentStatus,
    invoiceSections,
    serviceFeePlusAdSpend,
    formattedServiceFeePlusAdSpend: formatCurrency(serviceFeePlusAdSpend / currencyOffset, currency),
    totalFee: formatCurrency(totalFee / currencyOffset, currency),
    date: moment(invoice.date_due).format('DD MMM YYYY'),
  }
}

export const fetchUpcomingInvoice = async (organizationId) => {
  const payload = null
  const endpoint = `/organizations/${organizationId}/billing/invoices/upcoming`
  const errorTracking = {
    category: 'Billing',
    action: 'Fetch latest invoice',
  }
  const { res: invoice, error } = await requestWithCatch('get', endpoint, payload, errorTracking)
  if (error) return { error }
  // Format invoice
  const res = formatUpcomingInvoice(invoice)
  return { res }
}

export const fetchLatestInvoice = async (organizationId) => {
  const payload = null
  const endpoint = `/organizations/${organizationId}/billing/invoices`
  const errorTracking = {
    category: 'Billing',
    action: 'Fetch latest invoice',
  }

  const { res: invoices, error } = await requestWithCatch('get', endpoint, payload, errorTracking)
  if (error) return { error }
  // Format invoice
  const res = invoices[0] ? formatUpcomingInvoice(invoices[0]) : {}
  return { res }
}
