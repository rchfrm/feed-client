import React from 'react'
import PropTypes from 'prop-types'

import useBillingStore from '@/app/stores/billingStore'

import MarkdownText from '@/elements/MarkdownText'

import { formatCurrency } from '@/helpers/utils'

import copy from '@/app/copy/billingCopy'

const getReferralsDetails = state => state.referralsDetails

const metrics = [
  {
    title: 'Total credits earnt',
    slug: 'total_credits',
  },
  {
    title: 'Credits spent',
    slug: 'total_credits_spent',
  },
  {
    title: 'Credits remaining',
    slug: 'total_credits_remaining',
  },
]

const BillingReferralsSummary = ({
  className,
}) => {
  const referralsDetails = useBillingStore(getReferralsDetails)
  const { currency, currency_offset } = referralsDetails
  console.log('referralsDetails', referralsDetails)
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h3>Referrals and Credits</h3>
      <MarkdownText markdown={copy.referralsCopy(referralsDetails)} />
      {referralsDetails.total_referrals > 0 && (
        <div className="bg-grey-1 rounded-dialogue p-5">
          <ul className="mb-0">
            {metrics.map(({ title, slug }, index) => {
              const value = referralsDetails[slug] / currency_offset
              const valueString = formatCurrency(value, currency)
              const lastItem = index === metrics.length - 1
              return (
                <React.Fragment key={slug}>
                  {lastItem && (
                    <div className="w-full bg-black my-3" style={{ height: 1 }} />
                  )}
                  <li className="flex justify-between mb-2 last:mb-0">
                    <span>{title}</span>
                    <strong>{valueString}</strong>
                  </li>
                </React.Fragment>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

BillingReferralsSummary.propTypes = {
  className: PropTypes.string,
}

BillingReferralsSummary.defaultProps = {
  className: null,
}

export default BillingReferralsSummary
