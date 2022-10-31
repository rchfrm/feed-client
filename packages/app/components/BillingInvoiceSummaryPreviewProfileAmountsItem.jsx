import React from 'react'
import PropTypes from 'prop-types'

import { formatCurrency, capitalise } from '@/helpers/utils'

const BillingInvoiceSummaryPreviewProfileAmountsItem = ({
  plan,
  profiles,
  hasMultipleProfiles,
  currency,
}) => {
  return (
    <div
      className={[
        'flex justify-between',
        hasMultipleProfiles ? 'mb-3' : 'mb-0',
      ].join(' ')}
    >
      <p className="mb-0">{profiles[0].name} ({capitalise(plan)})</p>
      <p className={[hasMultipleProfiles ? null : 'font-bold', 'mb-0'].join(' ')}>{formatCurrency(profiles[0].amount, currency)}</p>
    </div>
  )
}

BillingInvoiceSummaryPreviewProfileAmountsItem.propTypes = {
  plan: PropTypes.string.isRequired,
  profiles: PropTypes.array.isRequired,
  hasMultipleProfiles: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
}

export default BillingInvoiceSummaryPreviewProfileAmountsItem
