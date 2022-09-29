import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import { formatCurrency } from '@/helpers/utils'

import copy from '@/app/copy/global'

const PricingProrations = ({
  prorationsPreview,
  plan,
}) => {
  const { artist: { hasSetUpProfile } } = React.useContext(ArtistContext)
  const [, planPeriod] = plan.split('_')

  const {
    currency,
    prorations: {
      amount: prorationsAmount,
    } = {},
    nextInvoice: {
      amount: nextInvoiceAmount,
      usageAmounts: {
        fee,
      },
    } = {},
    period: {
      isFirstDayOfPeriod,
      daysRemainingInPeriod,
    } = {},
  } = prorationsPreview || {}

  const subsequentMonthlyAmount = fee ? nextInvoiceAmount - fee : nextInvoiceAmount

  return (
    <>
      <div className="mb-8">
        <MarkdownText markdown={copy.pricingUpgradeCurrentPaymentList(prorationsPreview, currency, hasSetUpProfile)} className="mb-6" />
        {!isFirstDayOfPeriod && prorationsAmount > 0 && <p className="text-xs">^Covering the remaining {daysRemainingInPeriod} {daysRemainingInPeriod > 1 ? 'days' : 'day'} of the current billing period.</p>}
      </div>
      {nextInvoiceAmount > 0 && (
        <>
          <MarkdownText markdown={copy.pricingUpgradeNextPaymentList(prorationsPreview, currency)} />
          <p className="text-xs">*Covering the next billing period.</p>
          <p>Each subsequent {planPeriod} invoice will be for {formatCurrency(subsequentMonthlyAmount, currency)}.</p>
        </>
      )}
    </>
  )
}

PricingProrations.propTypes = {
  prorationsPreview: PropTypes.object.isRequired,
  plan: PropTypes.string.isRequired,
}

PricingProrations.defaultProps = {
}

export default PricingProrations
