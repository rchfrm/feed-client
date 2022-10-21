import Spinner from '@/elements/Spinner'
import BillingInvoiceSummaryPeriodOptions from '@/app/BillingInvoiceSummaryPeriodOptions'
import BillingInvoiceSummaryPreview from '@/app/BillingInvoiceSummaryPreview'
import React from 'react'

const BillingInvoiceSummary = ({
  loading,
  upcomingInvoice,
  organizationArtists,
}) => {
  if (loading) {
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

export default BillingInvoiceSummary
