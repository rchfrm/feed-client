import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'

import useBillingStore from '@/app/stores/billingStore'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

import { formatProrationsPreview } from '@/app/helpers/billingHelpers'
import { formatCurrency } from '@/helpers/utils'

import copy from '@/app/copy/global'

const getBillingStoreState = (state) => ({
  organisationArtists: state.organisationArtists,
})

const PricingPlanUpgradePaymentProrations = ({
  prorationsPreview,
  profilesToUpgrade,
  isLoading,
}) => {
  const [formattedProrationsPreview, setFormattedProrationsPreview] = React.useState(null)
  const { organisationArtists } = useBillingStore(getBillingStoreState, shallow)
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
  } = formattedProrationsPreview || {}

  React.useEffect(() => {
    const formattedProrations = formatProrationsPreview({ profilesToUpgrade, organisationArtists, prorationsPreview })

    setFormattedProrationsPreview(formattedProrations)
  }, [organisationArtists, profilesToUpgrade, prorationsPreview])

  if (isLoading) return <Spinner className="h-32 flex items-center" width={28} />

  if (!formattedProrationsPreview) return

  return (
    <>
      <div className="mb-8">
        <MarkdownText markdown={copy.pricingUpgradeCurrentPaymentList(formattedProrationsPreview, currency)} className="mb-6" />
        {!isFirstDayOfPeriod && prorationsAmount > 0 && <p className="text-xs">^Covering the remaining {daysRemainingInPeriod} {daysRemainingInPeriod > 1 ? 'days' : 'day'} of the current billing period.</p>}
      </div>
      {nextInvoiceAmount > 0 && (
        <>
          <MarkdownText markdown={copy.pricingUpgradeNextPaymentList(formattedProrationsPreview, currency)} />
          <p className="text-xs">*Covering the next billing period.</p>
          <p>Each subsequent monthly invoice will be for {formatCurrency(usageAmount ? nextInvoiceAmount - usageAmount : nextInvoiceAmount, currency)}.</p>
        </>
      )}
    </>
  )
}

PricingPlanUpgradePaymentProrations.propTypes = {
  prorationsPreview: PropTypes.object.isRequired,
  profilesToUpgrade: PropTypes.objectOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
}

PricingPlanUpgradePaymentProrations.defaultProps = {
}

export default PricingPlanUpgradePaymentProrations
