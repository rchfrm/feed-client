import React from 'react'
import PropTypes from 'prop-types'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

import { formatCurrency } from '@/helpers/utils'

import copy from '@/app/copy/global'

const PricingPlanUpgradePaymentProrations = ({
  prorationsPreview,
  isLoading,
}) => {
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

  if (isLoading) return <Spinner className="h-40 flex items-center" width={28} />

  if (!prorationsPreview) return

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
  isLoading: PropTypes.bool.isRequired,
}

PricingPlanUpgradePaymentProrations.defaultProps = {
}

export default PricingPlanUpgradePaymentProrations
