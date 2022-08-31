import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import { formatCurrency } from '@/helpers/utils'

import copy from '@/app/copy/billingCopy'

const BillingInvoiceSummarySelectedInvoice = ({
  invoice,
  currency,
}) => {
  return (
    <>
      <div className="border-solid border-2 mb-10 p-5 border-green rounded-dialogue">
        <div className="flex justify-between mb-3">
          <p className="mb-0">Ad spend</p>
          <p className="mb-0">{formatCurrency(invoice.adSpend, currency)}</p>
        </div>
        <div className="flex justify-between mb-3 font-bold">
          <p className="mb-0">10% service fee</p>
          <p className="mb-0">{formatCurrency(invoice.adSpendFee, currency)}</p>
        </div>
        <div className="flex justify-between mb-5">
          <p className="mb-0">Overall</p>
          <p className="mb-0">{formatCurrency(invoice.adSpendTotal, currency)}</p>
        </div>
        <MarkdownText className="text-[10px] mb-0" markdown={copy.facebookInvoice} />
      </div>
    </>
  )
}

BillingInvoiceSummarySelectedInvoice.propTypes = {
  invoice: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
}

BillingInvoiceSummarySelectedInvoice.defaultProps = {
}

export default BillingInvoiceSummarySelectedInvoice
