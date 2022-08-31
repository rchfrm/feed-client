import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import { formatProfileAmounts } from '@/app/helpers/billingHelpers'
import { formatCurrency, capitalise } from '@/helpers/utils'

import copy from '@/app/copy/billingCopy'

const BillingInvoiceSummarySelectedInvoice = ({
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
    <>
      <div className="border-solid border-2 mb-10 p-5 border-green rounded-dialogue">
        <div className="flex justify-between mb-3">
          <p className="mb-0">Ad Spend</p>
          <p className="mb-0">{formatCurrency(invoice.adSpend, currency)}</p>
        </div>
        <div className="flex justify-between mb-3">
          <p className="mb-0">10% Service Fee</p>
          <p className="mb-0">{formatCurrency(invoice.adSpendFee, currency)}</p>
        </div>
        <div className="flex justify-between mb-5">
          <p className="mb-0">Overall</p>
          <p className="mb-0">{formatCurrency(invoice.adSpendTotal, currency)}</p>
        </div>
        <ul>
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
                <p className="mb-2">{profiles[0].name} ({capitalise(plan)})</p>
                <p className="mb-0">{formatCurrency(profiles[0].amount, currency)}</p>
              </div>
            )
          ))}
        </ul>
        <div className="flex justify-between mb-3 font-bold">
          <p className="mb-0">Total</p>
          <p className="mb-0">{formatCurrency(invoice.total, currency)}</p>
        </div>
        <MarkdownText className="text-[10px] mb-0" markdown={copy.facebookInvoice} />
      </div>
    </>
  )
}

BillingInvoiceSummarySelectedInvoice.propTypes = {
  invoice: PropTypes.object.isRequired,
  currency: PropTypes.string,
}

BillingInvoiceSummarySelectedInvoice.defaultProps = {
  currency: '',
}

export default BillingInvoiceSummarySelectedInvoice
