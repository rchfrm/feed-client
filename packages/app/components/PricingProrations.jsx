import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import MarkdownText from '@/elements/MarkdownText'

import { formatCurrency } from '@/helpers/utils'

import copy from '@/app/copy/global'
import { doProrationsMatch } from '@/app/helpers/billingHelpers'

const PricingProrations = ({
  prorationsPreview,
  isAnnualPricing,
}) => {
  const { artist: { hasSetUpProfile } } = React.useContext(ArtistContext)
  const planPeriod = isAnnualPricing ? 'annual' : 'monthly'
  console.log('prorationsPreview', prorationsPreview)

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
  const prorationsMatchNextInvoice = doProrationsMatch(prorationsPreview.upgradedProfiles)

  return (
    <>
      <div className="mb-8">
        <MarkdownText markdown={copy.pricingUpgradeCurrentPaymentList(prorationsPreview, currency, hasSetUpProfile)} className="mb-6" />
        {!isFirstDayOfPeriod && prorationsAmount > 0 && <p className="text-xs">^Covering the remaining {daysRemainingInPeriod} {daysRemainingInPeriod > 1 ? 'days' : 'day'} of the current billing period.</p>}
      </div>
      {nextInvoiceAmount > 0 && !prorationsMatchNextInvoice && (
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
  isAnnualPricing: PropTypes.bool,
}

PricingProrations.defaultProps = {
  isAnnualPricing: false,
}

export default PricingProrations
