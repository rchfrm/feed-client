import React from 'react'
import PropTypes from 'prop-types'
import BillingInvoiceList from '@/app/BillingInvoiceList'
import BillingInvoiceSummary from '@/app/BillingInvoiceSummary'
import useAsyncEffect from 'use-async-effect'
import { fetchInvoices } from '@/app/helpers/billingHelpers'
import Error from '@/elements/Error'

const BillingInvoiceSection = ({
  organization,
  organizationArtists,
  className,
}) => {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [upcomingInvoice, setUpcomingInvoice] = React.useState(undefined)

  // Fetch invoices for the organization
  useAsyncEffect(async () => {
    const { errors, upcomingInvoice } = await fetchInvoices(organization)

    if (errors.length) {
      setError(errors[0])
      setLoading(false)
      return
    }
    setError(null)
    setUpcomingInvoice(upcomingInvoice)
    setLoading(false)
  }, [organization])

  return (
    <div className={[className].join(' ')}>
      <h2 className="font-body font-bold mb-10">Invoices</h2>
      <Error error={error} />
      <BillingInvoiceSummary
        loading={loading}
        upcomingInvoice={upcomingInvoice}
        organizationArtists={organizationArtists}
      />
      <BillingInvoiceList
        organization={organization}
        invoicesLoading={loading}
      />
    </div>
  )
}

BillingInvoiceSection.propTypes = {
  organization: PropTypes.object.isRequired,
  organizationArtists: PropTypes.array.isRequired,
  className: PropTypes.string,
}

BillingInvoiceSection.defaultProps = {
  className: '',
}

export default BillingInvoiceSection
