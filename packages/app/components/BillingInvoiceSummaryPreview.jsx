import React from 'react'
import PropTypes from 'prop-types'

import BillingInvoiceSummaryPreviewUsageAmount from '@/app/BillingInvoiceSummaryPreviewUsageAmount'
import BillingInvoiceSummaryPreviewProfileAmounts from '@/app/BillingInvoiceSummaryPreviewProfileAmounts'

import { hasAProfileOnGrowthOrPro } from '@/app/helpers/artistHelpers'

const BillingInvoiceSummaryPreview = ({
  invoice,
  currency,
  organizationArtists,
}) => {
  const shouldShowProfileAmounts = hasAProfileOnGrowthOrPro(organizationArtists)

  return (
    <div className="border-solid border-2 mb-10 p-5 border-green rounded-dialogue">
      {shouldShowProfileAmounts ? (
        <BillingInvoiceSummaryPreviewProfileAmounts
          invoice={invoice}
          currency={currency}
          organizationArtists={organizationArtists}
        />
      ) : (
        <BillingInvoiceSummaryPreviewUsageAmount
          invoice={invoice}
          currency={currency}
        />
      )}
    </div>
  )
}

BillingInvoiceSummaryPreview.propTypes = {
  invoice: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  organizationArtists: PropTypes.array.isRequired,
}

export default BillingInvoiceSummaryPreview
