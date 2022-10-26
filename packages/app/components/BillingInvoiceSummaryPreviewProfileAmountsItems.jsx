import React from 'react'
import PropTypes from 'prop-types'

import { formatCurrency, capitalise } from '@/helpers/utils'

const BillingInvoiceSummaryPreviewProfileAmountsItems = ({
  plan,
  profiles,
  currency,
}) => {
  return (
    <div className="mb-4">
      <p className="mb-2">{capitalise(plan)}:</p>
      {profiles.map((profile) => (
        <div key={profile.name} className="flex justify-between pl-3 mb-2">
          <p className="mb-0">{profile.name}</p>
          <p className="mb-0">{formatCurrency(profile.amount, currency)}</p>
        </div>
      ))}
    </div>
  )
}

BillingInvoiceSummaryPreviewProfileAmountsItems.propTypes = {
  plan: PropTypes.string.isRequired,
  profiles: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
}

export default BillingInvoiceSummaryPreviewProfileAmountsItems
