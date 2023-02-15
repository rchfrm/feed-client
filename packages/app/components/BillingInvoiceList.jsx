import React from 'react'
import moment from 'moment'
import useAsyncEffect from 'use-async-effect'
import LinkIcon from '@/icons/LinkIcon'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import { fetchArchivedInvoices, fetchRefreshedInvoice } from '@/app/helpers/invoiceHelpers'
import PropTypes from 'prop-types'
import Spinner from '@/elements/Spinner'

const formatDate = (date) => moment(date).format('DD MMMM YYYY')

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

  return (
    <div>
      <h3 className="font-bold">Past invoices</h3>
      {isLoading ? (
        <Spinner width={25} className="text-left justify-start" />
      ) : (
        <>
          <Error error={error} />
          <ul className="text-lg">
            {invoices.map(({ id, created_at: createdAt, invoice_pdf: link, updated_at: updatedAt }) => {
              const daysSinceInvoiceUpdated = moment().diff(moment(updatedAt), 'days')
              const shouldUpdateInvoice = daysSinceInvoiceUpdated >= 60

              return (
                <li key={id} className={['flex last:mb-0', shouldUpdateInvoice ? 'mb-2' : 'mb-3'].join(' ')}>
                  {shouldUpdateInvoice ? (
                    <Button
                      version="text"
                      onClick={() => handleClick(id)}
                      trackComponentName="BillingInvoiceList"
                    >
                      <LinkIcon className="w-5 h-auto mr-1" style={{ transform: 'translateY(0.1rem)' }} />
                      {formatDate(createdAt)}
                    </Button>
                  ) : (
                    <a href={link} className="flex items-center" target="_blank" rel="noreferrer noopener">
                      <LinkIcon className="w-5 h-auto" style={{ transform: 'translateY(0.1rem)' }} />
                      <p className="ml-1 mb-0">{formatDate(createdAt)}</p>
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}

BillingInvoiceList.propTypes = {
  organization: PropTypes.object.isRequired,
  invoicesLoading: PropTypes.bool.isRequired,
}

export default React.memo(BillingInvoiceList)
