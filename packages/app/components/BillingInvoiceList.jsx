import React from 'react'
import moment from 'moment'
import useAsyncEffect from 'use-async-effect'
import LinkIcon from '@/icons/LinkIcon'
import Error from '@/elements/Error'

import { fetchArchivedInvoices } from '@/app/helpers/invoiceHelpers'
import PropTypes from 'prop-types'
import Spinner from '@/elements/Spinner'

const formatDate = (date) => moment(date).format('DD MMMM YYYY')

const BillingInvoiceList = ({
  organization,
  invoicesLoading,
}) => {
  // LOAD INVOICES
  const [loading, setLoading] = React.useState(true)
  const [invoices, setInvoices] = React.useState([])
  const [error, setError] = React.useState(null)
  useAsyncEffect(async () => {
    const { res: invoices, error } = await fetchArchivedInvoices(organization.id)

    setError(error)

    if (!error) {
      setInvoices(invoices)
    }
    setLoading(false)
  }, [organization])

  if (invoicesLoading) return null

  return (
    <div>
      <h3 className="font-bold">Past invoices</h3>
      {loading ? (
        <Spinner width={25} className="text-left justify-start" />
      ) : (
        <>
          <Error error={error} />
          <ul className="text-lg">
            {invoices.map(({ id, created_at: date, invoice_pdf: link }) => {
              return (
                <li key={id} className="flex mb-3 last:mb-0">
                  <a href={link} className="flex items-baseline" target="_blank" rel="noreferrer noopener">
                    <LinkIcon className="h-4 w-auto" style={{ transform: 'translateY(0.1rem)' }} />
                    <p className="ml-2 mb-0">{formatDate(date)}</p>
                  </a>
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

BillingInvoiceList.defaultProps = {

}

export default React.memo(BillingInvoiceList)
