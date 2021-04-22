import moment from 'moment'

import { formatCurrency } from '@/helpers/utils'

// * ARCHIVED INVOICES
// -------------------
const dummyArchivedInvoices = [
  {
    date: '2020-04-02T14:54:21.000Z',
    link: '#',
  },
  {
    date: '2020-02-01T14:54:21.000Z',
    link: '#',
  },
  {
    date: '2019-03-02T14:54:21.000Z',
    link: '#',
  },
]

export const fetchArchivedInvoices = (orgId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = dummyArchivedInvoices
      resolve({ res, error: null })
    }, 800)
  })
}


// * UPCOMING INVOICE
// ------------------
const dummyUpcomingInvoice = {
  id: '12345',
  date: '2021-04-02T14:54:21.000Z',
  ad_spend: 3450,
  ad_spend_fee: 345,
  conversion_sales: 5800,
  conversion_sales_fee: 580,
  currency: 'GBP',
  currencyOffset: 100,
}

const dummyFailedInvoice = {
  ...dummyUpcomingInvoice,
  failed: true,
  payment_method: { customer_id: 'cus_JDS4kPZF6VOflU', id: 'pm_1IihBFJstcmwltEQp2x2AysM', type: 'card', is_default: false, billing_details: { address: { city: null, country: null, line1: null, line2: null, postal_code: '42424', state: null }, email: null, name: 'sdfsd', phone: null }, card: { brand: 'visa', funding: 'credit', last4: '4242', exp_month: 4, exp_year: 2024, country: 'US', checks: { address_line1_check: null, address_postal_code_check: 'pass', cvc_check: 'pass' }, three_d_secure_usage: { supported: true } }, setup_intent: { customer_id: 'cus_JDS4kPZF6VOflU', payment_method_id: 'pm_1IihBFJstcmwltEQp2x2AysM', id: 'seti_1IihBHJstcmwltEQy2oGQBQP', client_secret: 'seti_1IihBHJstcmwltEQy2oGQBQP_secret_JLNxvAgAXGAwHNbRZoshi7r9EgyFT0k', status: 'succeeded' } },
}

const formatUpcomingInvoice = (invoice) => {
  const { currency, currencyOffset, payment_method } = invoice
  const invoiceSections = []
  let totalFee = 0
  // Handle ad spend
  const adSpendSlug = 'ad_spend'
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
  const conversionSaleSlug = 'conversion_sales'
  const conversionFeeSlug = 'conversion_sales_fee'
  if (invoice[conversionSaleSlug]) {
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
    ...invoice,
    paymentMethod: payment_method,
    invoiceSections,
    totalFee: formatCurrency(totalFee / currencyOffset, currency),
    date: moment(invoice.date).format('DD MMM YYYY'),
  }
}

export const fetchUpcomingInvoice = (orgId, forceFail) => {
  const invoice = forceFail ? dummyFailedInvoice : dummyUpcomingInvoice
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = formatUpcomingInvoice(invoice)
      resolve({ res, error: null })
    }, 800)
  })
}
