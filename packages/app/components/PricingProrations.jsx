import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import { formatCurrency } from '@/helpers/utils'

import copy from '@/app/copy/global'

const PricingPlanUpgradePaymentProrations = ({ prorationsPreview }) => {
  const {
    currency,
    prorations: {
      amount: prorationsAmount,
    } = {},
    nextInvoice: {
      amount: nextInvoiceAmount,
      usageAmount,
    } = {},
    period: {
      isFirstDayOfPeriod,
      daysRemainingInPeriod,
    } = {},
  } = prorationsPreview || {}

  const subsequentMonthlyAmount = usageAmount ? nextInvoiceAmount - usageAmount : nextInvoiceAmount

  return (
    <>
      <div className="mb-8">
        <MarkdownText markdown={copy.pricingUpgradeCurrentPaymentList(prorationsPreview, currency)} className="mb-6" />
        {!isFirstDayOfPeriod && prorationsAmount > 0 && <p className="text-xs">^Covering the remaining {daysRemainingInPeriod} {daysRemainingInPeriod > 1 ? 'days' : 'day'} of the current billing period.</p>}
      </div>
      {nextInvoiceAmount > 0 && (
        <>
          <MarkdownText markdown={copy.pricingUpgradeNextPaymentList(prorationsPreview, currency)} />
          <p className="text-xs">*Covering the next billing period.</p>
          <p>Each subsequent monthly invoice will be for {formatCurrency(subsequentMonthlyAmount, currency)}.</p>
        </>
      )}
    </>
  )
}

PricingPlanUpgradePaymentProrations.propTypes = {
  prorationsPreview: PropTypes.object.isRequired,
}

PricingPlanUpgradePaymentProrations.defaultProps = {
}

export default PricingPlanUpgradePaymentProrations
