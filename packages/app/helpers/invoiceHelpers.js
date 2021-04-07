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

export const fetchArchivedInvoices = () => {
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
  date: '2021-04-02T14:54:21.000Z',
  ad_spend: 3450,
  ad_spend_fee: 345,
  conversion_sales: 5800,
  conversion_sales_fee: 580,
  currency: 'GBP',
  currencyOffset: 100,
}

const formatUpcomingInvoice = (invoice) => {
  const { currency, currencyOffset } = invoice
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
    invoiceSections,
    totalFee: formatCurrency(totalFee / currencyOffset, currency),
    date: moment(invoice.date).format('DD MMM YYYY'),
  }
}

export const fetchUpcomingInvoice = (orgId) => {
  console.log('fetch invoice for org', orgId)
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = formatUpcomingInvoice(dummyUpcomingInvoice)
      resolve({ res, error: null })
    }, 800)
  })
}
