import React from 'react'
import PropTypes from 'prop-types'

import BillingInvoiceSummaryHeader from '@/app/BillingInvoiceSummaryHeader'
import BillingInvoiceSummaryPeriodOptions from '@/app/BillingInvoiceSummaryPeriodOptions'
import BillingInvoiceSummarySelectedInvoice from '@/app/BillingInvoiceSummarySelectedInvoice'
import BillingInvoiceList from '@/app/BillingInvoiceList'

const BillingInvoiceSummary = ({
  upcomingInvoice,
  organisationArtists,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <BillingInvoiceSummaryHeader
        dueDate={upcomingInvoice.periodEnd}
        total={upcomingInvoice.total}
      />
      <BillingInvoiceSummaryPeriodOptions
        periodStart={upcomingInvoice.periodStart}
        periodEnd={upcomingInvoice.periodEnd}
      />
      <BillingInvoiceSummarySelectedInvoice
        invoice={upcomingInvoice}
        total={upcomingInvoice.total}
        currency={upcomingInvoice.currency}
        organisationArtists={organisationArtists}
      />
      <BillingInvoiceList
        trackComponentName="BillingOpenInvoices"
      />
    </div>
  )
}

BillingInvoiceSummary.propTypes = {
  upcomingInvoice: PropTypes.object.isRequired,
  className: PropTypes.string,
}

BillingInvoiceSummary.defaultProps = {
  className: null,
}

export default BillingInvoiceSummary
