import React from 'react'
import PropTypes from 'prop-types'

import { formatProfileAmounts } from '@/app/helpers/billingHelpers'
import { formatCurrency, capitalise } from '@/helpers/utils'

const BillingInvoiceSummaryPreviewProfileAmounts = ({
  invoice,
  currency,
  organisationArtists,
}) => {
  const [profileAmounts, setprofileAmounts] = React.useState({})

  React.useEffect(() => {
    if (!invoice.profileAmounts || Object.keys(invoice.profileAmounts) === 0) {
      return
    }

    setprofileAmounts(formatProfileAmounts(organisationArtists, invoice.profileAmounts))
  }, [invoice.profileAmounts, organisationArtists])

  return (
    <div>
      {Object.entries(profileAmounts).map(([plan, profiles]) => (
        profiles.length > 1 ? (
          <div key={plan} className="mb-3">
            <p className="mb-2">{capitalise(plan)}:</p>
            {profiles.map((profile) => (
              <div key={profile.name} className="flex justify-between pl-2">
                <p className="mb-0">{profile.name}</p>
                <p className="mb-0">{formatCurrency(profile.amount, currency)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div key={plan} className="flex justify-between">
            <p className="mb-0">{profiles[0].name} ({capitalise(plan)})</p>
            <p className="mb-0">{formatCurrency(profiles[0].amount, currency)}</p>
          </div>
        )
      ))}
      <div className="flex justify-between font-bold">
        <p className="mb-0">Total</p>
        <p className="mb-0">{formatCurrency(invoice.total, currency)}</p>
      </div>
    </div>
  )
}

BillingInvoiceSummaryPreviewProfileAmounts.propTypes = {
  invoice: PropTypes.object.isRequired,
  currency: PropTypes.string,
  organisationArtists: PropTypes.array.isRequired,
}

BillingInvoiceSummaryPreviewProfileAmounts.defaultProps = {
  currency: '',
}

export default BillingInvoiceSummaryPreviewProfileAmounts
