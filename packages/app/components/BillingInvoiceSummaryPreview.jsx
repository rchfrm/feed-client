import React from 'react'
import PropTypes from 'prop-types'

import BillingInvoiceSummaryPreviewUsageAmount from '@/app/BillingInvoiceSummaryPreviewUsageAmount'
import BillingInvoiceSummaryPreviewProfileAmounts from '@/app/BillingInvoiceSummaryPreviewProfileAmounts'

import { hasAProfileOnGrowthOrPro } from '@/app/helpers/artistHelpers'

const BillingInvoiceSummaryPreview = ({
  invoice,
  currency,
  organisationArtists,
}) => {
  const shouldShowProfileAmounts = hasAProfileOnGrowthOrPro(organisationArtists)

  return (
    <div className="border-solid border-2 mb-10 p-5 border-green rounded-dialogue">
      {shouldShowProfileAmounts ? (
        <BillingInvoiceSummaryPreviewProfileAmounts
          invoice={invoice}
          currency={currency}
          organisationArtists={organisationArtists}
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
  organisationArtists: PropTypes.array.isRequired,
}

BillingInvoiceSummaryPreview.defaultProps = {
}

export default BillingInvoiceSummaryPreview
