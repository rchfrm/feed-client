import Spinner from '@/elements/Spinner'
import BillingInvoiceSummaryPeriodOptions from '@/app/BillingInvoiceSummaryPeriodOptions'
import BillingInvoiceSummaryPreview from '@/app/BillingInvoiceSummaryPreview'
import React from 'react'
import PropTypes from 'prop-types'

const BillingInvoiceSummary = ({
  isLoading,
  upcomingInvoice,
  organizationArtists,
}) => {
  if (isLoading) {
    return <Spinner width={25} className="text-left justify-start mb-10" />
  }

  if (upcomingInvoice) {
    return (
      <>
        <BillingInvoiceSummaryPeriodOptions
          periodStart={upcomingInvoice.periodStart}
          periodEnd={upcomingInvoice.periodEnd}
        />
        <BillingInvoiceSummaryPreview
          invoice={upcomingInvoice}
          total={upcomingInvoice.total}
          currency={upcomingInvoice.currency}
          organizationArtists={organizationArtists}
        />
      </>
    )
  }
}

BillingInvoiceSummary.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  upcomingInvoice: PropTypes.object,
  organizationArtists: PropTypes.array.isRequired,
}

BillingInvoiceSummary.propTypes = {
  upcomingInvoice: null,
}

export default BillingInvoiceSummary
