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
const formatUpcomingInvoice = (invoice) => {
  const { currency, exponent } = invoice
  const currencyOffset = 10 ** exponent
  const invoiceSections = []
  let totalFee = 0
  // Handle ad spend
  const adSpendSlug = 'ad_spend_total'
  const adSpendFeedSlug = 'ad_spend_fee'
  invoiceSections.push(
    [
      {
        slug: adSpendSlug,
        value: formatCurrency(invoice[adSpendSlug] / currencyOffset, currency),
        valueRaw: invoice[adSpendSlug],
        title: 'Total ad spend',
      },
      {
        slug: adSpendFeedSlug,
        value: formatCurrency(invoice[adSpendFeedSlug] / currencyOffset, currency),
        valueRaw: invoice[adSpendFeedSlug],
        title: 'Feed fee on ad spend',
      },
    ],
  )
  // Update fee
  totalFee += invoice[adSpendFeedSlug]
  // Handle conversion spend
  const conversionSaleSlug = 'conversions_total'
  const conversionFeeSlug = 'conversions_fee'
  if (typeof invoice[conversionSaleSlug] === 'number') {
    invoiceSections.push(
      [
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
      ],
    )
    // Update fee
    totalFee += invoice[conversionFeeSlug]
  }
  // Return data
  return {
    invoiceSections,
    totalFee: formatCurrency(totalFee / currencyOffset, currency),
    date: moment(invoice.date).format('DD MMM YYYY'),
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
  console.log('invoice', invoice)
  const res = formatUpcomingInvoice(invoice)
  return { res }
}
