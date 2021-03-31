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
      resolve(dummyArchivedInvoices)
    }, 800)
  })
}


// * UPCOMING INVOICE
// ------------------
const dummyUpcomingInvoice = {
  ad_spend: 3450,
  ad_spend_fee: 345,
  conversion_sales: 5800,
  conversion_sales_fee: 580,
}

export const fetchUpcomingInvoice = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyUpcomingInvoice)
    }, 800)
  })
}
