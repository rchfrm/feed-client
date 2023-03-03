import React from 'react'
import useAsyncEffect from 'use-async-effect'
import Error from '@/elements/Error'
import { fetchArchivedInvoices, fetchRefreshedInvoice } from '@/app/helpers/invoiceHelpers'
import PropTypes from 'prop-types'
import Spinner from '@/elements/Spinner'
import BillingInvoiceListItem from '@/app/BillingInvoiceListItem'

const BillingInvoiceList = ({
  organization,
  invoicesLoading,
}) => {
  // LOAD INVOICES
  const [isLoading, setIsLoading] = React.useState(true)
  const [invoices, setInvoices] = React.useState([])
  const [error, setError] = React.useState(null)

  useAsyncEffect(async () => {
    setIsLoading(true)
    const { res: invoices, error } = await fetchArchivedInvoices(organization.id)

    setError(error)

    if (! error) {
      setInvoices(invoices)
    }
    setIsLoading(false)
  }, [organization])

  if (invoicesLoading) return null

  const handleClick = async (invoiceId) => {
    const { res: invoice, error } = await fetchRefreshedInvoice(organization.id, invoiceId)

    if (error) {
      setError(error)
      return
    }

    window.open(invoice.invoice_pdf, '_blank')
  }

  if (isLoading) {
    return <Spinner width={25} className="text-left justify-start" />
  }

  return (
    <div>
      <h3 className="font-bold">Past invoices</h3>
      <Error error={error} />
      <ul className="text-lg">
        {invoices.map((invoice) => {
          return (
            <BillingInvoiceListItem
              key={invoice.id}
              invoice={invoice}
              handleClick={handleClick}
            />
          )
        })}
      </ul>
    </div>
  )
}

BillingInvoiceList.propTypes = {
  organization: PropTypes.object.isRequired,
  invoicesLoading: PropTypes.bool.isRequired,
}

export default React.memo(BillingInvoiceList)
