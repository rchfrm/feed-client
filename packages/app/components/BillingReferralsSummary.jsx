import React from 'react'
import PropTypes from 'prop-types'

import useBillingStore from '@/app/stores/billingStore'

import MarkdownText from '@/elements/MarkdownText'
import BillingReferralsTransfer from '@/app/BillingReferralsTransfer'

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
  canTransferCredits,
  className,
}) => {
  const referralsDetails = useBillingStore(getReferralsDetails)
  const { currency, currency_offset, total_credits_remaining } = referralsDetails
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* INTRO */}
      <h3 className="font-body font-bold mb-6">Referrals and Credits</h3>
      <MarkdownText markdown={copy.referralsCopy(referralsDetails)} />
      {/* SUMMARY */}
      {referralsDetails.total_referrals > 0 && (
        <div className="bg-grey-1 rounded-dialogue p-5">
          <ul className="mb-0">
            {metrics.map(({ title, slug }, index) => {
              const value = referralsDetails[slug] / currency_offset
              const valueString = formatCurrency(value, currency)
              const lastItem = index === metrics.length - 1
              const TitleEl = lastItem ? 'strong' : 'span'
              return (
                <React.Fragment key={slug}>
                  {lastItem && (
                    <div className="w-full bg-black my-4" style={{ height: 1 }} />
                  )}
                  <li className="flex justify-between mb-3 last:mb-0">
                    <TitleEl>{title}</TitleEl>
                    <strong>{valueString}</strong>
                  </li>
                </React.Fragment>
              )
            })}
          </ul>
        </div>
      )}
      {/* MOVE CREDITS */}
      {canTransferCredits && total_credits_remaining > 0 && (
        <BillingReferralsTransfer className="pt-5" />
      )}
    </div>
  )
}

BillingReferralsSummary.propTypes = {
  canTransferCredits: PropTypes.bool,
  className: PropTypes.string,
}

BillingReferralsSummary.defaultProps = {
  canTransferCredits: false,
  className: null,
}

export default React.memo(BillingReferralsSummary)
