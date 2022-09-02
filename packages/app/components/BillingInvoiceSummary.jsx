import React from 'react'
import PropTypes from 'prop-types'

import BillingInvoiceSummaryHeader from '@/app/BillingInvoiceSummaryHeader'
import BillingInvoiceSummaryPeriodOptions from '@/app/BillingInvoiceSummaryPeriodOptions'
import BillingInvoiceSummaryPreview from '@/app/BillingInvoiceSummaryPreview'
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
        upcomingInvoice={upcomingInvoice}
      />
      {upcomingInvoice && (
        <>
          <BillingInvoiceSummaryPeriodOptions
            periodStart={upcomingInvoice.periodStart}
            periodEnd={upcomingInvoice.periodEnd}
          />
          <BillingInvoiceSummaryPreview
            invoice={upcomingInvoice}
            total={upcomingInvoice.total}
            currency={upcomingInvoice.currency}
            organisationArtists={organisationArtists}
          />
        </>
      )}
      <BillingInvoiceList
        trackComponentName="BillingOpenInvoices"
      />
    </div>
  )
}

BillingInvoiceSummary.propTypes = {
  upcomingInvoice: PropTypes.object,
  className: PropTypes.string,
}

BillingInvoiceSummary.defaultProps = {
  upcomingInvoice: null,
  className: null,
}

export default BillingInvoiceSummary
