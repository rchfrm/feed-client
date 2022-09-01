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
  const hasMultipleProfiles = organisationArtists.length > 1

  React.useEffect(() => {
    if (!invoice.profileAmounts || Object.keys(invoice.profileAmounts) === 0) {
      return
    }

    setprofileAmounts(formatProfileAmounts(organisationArtists, invoice.profileAmounts))
  }, [invoice.profileAmounts, organisationArtists])

  return (
    <div>
      {Object.entries(profileAmounts).map(([plan, profiles]) => {
        if (plan === 'legacy') return

        return profiles.length > 1 ? (
          <div key={plan} className="mb-4">
            <p className="mb-2">{capitalise(plan)}:</p>
            {profiles.map((profile) => (
              <div key={profile.name} className="flex justify-between pl-3 mb-2">
                <p className="mb-0">{profile.name}</p>
                <p className="mb-0">{formatCurrency(profile.amount, currency)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div
            key={plan}
            className={[
              'flex justify-between',
              hasMultipleProfiles ? 'mb-3' : 'mb-0',
            ].join(' ')}
          >
            <p className="mb-0">{profiles[0].name} ({capitalise(plan)})</p>
            <p className={[hasMultipleProfiles ? null : 'font-bold', 'mb-0'].join(' ')}>{formatCurrency(profiles[0].amount, currency)}</p>
          </div>
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
  currency: PropTypes.string,
  organisationArtists: PropTypes.array.isRequired,
}

BillingInvoiceSummaryPreviewProfileAmounts.defaultProps = {
  currency: '',
}

export default BillingInvoiceSummaryPreviewProfileAmounts
