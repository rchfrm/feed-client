import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import BillingInvoiceSummaryHeader from '@/app/BillingInvoiceSummaryHeader'
import BillingInvoiceSummaryPeriodOptions from '@/app/BillingInvoiceSummaryPeriodOptions'
import BillingInvoiceSummarySelectedInvoice from '@/app/BillingInvoiceSummarySelectedInvoice'
import BillingInvoiceSummaryButton from '@/app/BillingInvoiceSummaryButton'

const BillingInvoiceSummary = ({
  latestInvoice,
  upcomingInvoice,
  className,
}) => {
  const initSelectedInvoiceName = upcomingInvoice.paymentStatus && upcomingInvoice.paymentStatus !== 'paid' ? 'upcoming' : 'latest'
  const [selectedInvoiceName, setSelectedInvoiceName] = React.useState(initSelectedInvoiceName)
  console.log('latestInvoice', latestInvoice)
  console.log('upcomingInvoice', upcomingInvoice)
  const noLatestInvoiceOrIsPaid = !latestInvoice.paymentStatus || latestInvoice.paymentStatus === 'paid'
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >

      <BillingInvoiceSummaryHeader
        latestInvoicePaymentStatus={latestInvoice.paymentStatus}
        latestInvoiceDueDate={latestInvoice.date_due && moment(latestInvoice.date_due)}
        upcomingInvoiceDueDate={upcomingInvoice.date_due && moment(upcomingInvoice.date_due)}
        upcomingInvoiceSpendAndFee={upcomingInvoice.serviceFeePlusAdSpend}
      />

      <BillingInvoiceSummaryPeriodOptions
        noLatestInvoiceOrIsPaid={noLatestInvoiceOrIsPaid}
        latestInvoicePeriod={{ start: latestInvoice.period_start, end: latestInvoice.period_end }}
        upcomingInvoicePeriod={{ start: upcomingInvoice.period_start, end: upcomingInvoice.period_end }}
        upcomingInvoiceSpendAndFee={upcomingInvoice.serviceFeePlusAdSpend}
        selectedInvoiceName={selectedInvoiceName}
        setSelectedInvoiceName={setSelectedInvoiceName}
      />

      <BillingInvoiceSummarySelectedInvoice
        invoice={selectedInvoiceName === 'upcoming' ? upcomingInvoice : latestInvoice}
        noLatestInvoiceOrIsPaid={noLatestInvoiceOrIsPaid}
        upcomingInvoiceSpendAndFee={upcomingInvoice.serviceFeePlusAdSpend}
      />

      <BillingInvoiceSummaryButton
        latestInvoice={latestInvoice}
        latestInvoiceSelected={selectedInvoiceName === 'latest'}
        outstandingAmount={latestInvoice.paymentStatus === 'failed' && latestInvoice.totalFee}
        invoiceUrl={latestInvoice.invoiceUrl}
        spending={upcomingInvoice.serviceFeePlusAdSpend > 0}
      />
    </div>
  )
}

BillingInvoiceSummary.propTypes = {
  upcomingInvoice: PropTypes.object,
  latestInvoice: PropTypes.object,
  className: PropTypes.string,
}

BillingInvoiceSummary.defaultProps = {
  upcomingInvoice: {},
  latestInvoice: {},
  className: null,
}

export default BillingInvoiceSummary
