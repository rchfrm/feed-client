import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import { formatCurrency } from '@/helpers/utils'

import copy from '@/app/copy/billingCopy'

const BillingInvoicePreviewSummaryUsageAmount = ({
  invoice,
  currency,
}) => {
  const { usageAmounts } = invoice

  return (
    <>
      <div className="flex justify-between mb-3">
        <p className="mb-0">Ad Spend</p>
        <p className="mb-0">{formatCurrency(usageAmounts.adSpend, currency)}</p>
      </div>
      <div className="flex justify-between mb-3 font-bold">
        <p className="mb-0">10% Service Fee</p>
        <p className="mb-0">{formatCurrency(usageAmounts.fee, currency)}</p>
      </div>
      <div className="flex justify-between mb-5">
        <p className="mb-0">Overall</p>
        <p className="mb-0">{formatCurrency(usageAmounts.total, currency)}</p>
      </div>
      <MarkdownText className="text-[10px] mb-0" markdown={copy.facebookInvoice} />
    </>
  )
}

BillingInvoicePreviewSummaryUsageAmount.propTypes = {
  invoice: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
}

BillingInvoicePreviewSummaryUsageAmount.defaultProps = {
}

export default BillingInvoicePreviewSummaryUsageAmount
