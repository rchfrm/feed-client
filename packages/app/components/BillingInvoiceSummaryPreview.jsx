import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import BillingInvoiceSummaryPreviewUsageAmount from '@/app/BillingInvoiceSummaryPreviewUsageAmount'
import BillingInvoiceSummaryPreviewProfileAmounts from '@/app/BillingInvoiceSummaryPreviewProfileAmounts'

const BillingInvoiceSummaryPreview = ({
  invoice,
  currency,
  organisationArtists,
}) => {
  const { artist } = React.useContext(ArtistContext)
  const { hasGrowthPlan, hasLegacyPlan } = artist

  return (
    <div className="border-solid border-2 mb-10 p-5 border-green rounded-dialogue">
      {hasGrowthPlan && !hasLegacyPlan ? (
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
  currency: PropTypes.string,
  organisationArtists: PropTypes.array.isRequired,
}

BillingInvoiceSummaryPreview.defaultProps = {
  currency: '',
}

export default BillingInvoiceSummaryPreview
