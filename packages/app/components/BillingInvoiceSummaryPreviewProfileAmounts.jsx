import React from 'react'
import PropTypes from 'prop-types'

import BillingInvoiceSummaryPreviewProfileAmountsItem from '@/app/BillingInvoiceSummaryPreviewProfileAmountsItem'
import BillingInvoiceSummaryPreviewProfileAmountsItems from '@/app/BillingInvoiceSummaryPreviewProfileAmountsItems'

import { formatProfileAmounts } from '@/app/helpers/billingHelpers'
import { formatCurrency } from '@/helpers/utils'

const BillingInvoiceSummaryPreviewProfileAmounts = ({
  invoice,
  currency,
  organizationArtists,
}) => {
  const [profileAmounts, setprofileAmounts] = React.useState({})
  const hasMultipleProfiles = organizationArtists.length > 1

  React.useEffect(() => {
    if (! invoice.profileAmounts || Object.keys(invoice.profileAmounts) === 0) {
      return
    }

    setprofileAmounts(formatProfileAmounts(organizationArtists, invoice.profileAmounts))
  }, [invoice.profileAmounts, organizationArtists])

  return (
    <div>
      {Object.entries(profileAmounts).map(([plan, profiles]) => {
        if (plan === 'legacy') return

        return profiles.length > 1 ? (
          <BillingInvoiceSummaryPreviewProfileAmountsItems
            key={plan}
            plan={plan}
            currency={currency}
            profiles={profiles}
          />
        ) : (
          <BillingInvoiceSummaryPreviewProfileAmountsItem
            key={plan}
            plan={plan}
            profiles={profiles}
            hasMultipleProfiles={hasMultipleProfiles}
            currency={currency}
          />
        )
      })}
      {hasMultipleProfiles && (
        <div className="flex justify-between font-bold">
          <p className="mb-0">Total</p>
          <p className="mb-0">{formatCurrency(invoice.total, currency)}</p>
        </div>
      )}
    </div>
  )
}

BillingInvoiceSummaryPreviewProfileAmounts.propTypes = {
  invoice: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  organizationArtists: PropTypes.array.isRequired,
}

export default BillingInvoiceSummaryPreviewProfileAmounts
