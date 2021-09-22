import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useBillingStore from '@/app/stores/billingStore'

import MarkdownText from '@/elements/MarkdownText'

import BillingCopyReferralsCode from '@/app/BillingCopyReferralsCode'

import { formatCurrency } from '@/helpers/utils'

import copy from '@/app/copy/billingCopy'

const getReferralsDetails = state => state.referralsDetails

const metrics = [
  {
    title: 'Total credits earnt',
    slug: 'earned',
  },
  {
    title: 'Credits spent',
    slug: 'spent',
  },
  {
    title: 'Credits expired',
    slug: 'expired',
  },
  {
    title: 'Credits remaining',
    slug: 'balance',
  },
]

const BillingReferralsSummary = ({
  className,
}) => {
  const referralsDetails = useBillingStore(getReferralsDetails)
  const { earned, referrals_number } = referralsDetails
  const { artist: { min_daily_budget_info } } = React.useContext(ArtistContext)
  const { currency:
    { code: currency, offset: currencyOffset },
  } = min_daily_budget_info || {}
  const totalEarnedStringValue = formatCurrency((earned / currencyOffset), currency)
  return (
    <div
      className={[
        'mb-12',
        className,
      ].join(' ')}
    >
      {/* INTRO */}
      <h3 className="font-body font-bold mb-6">Referrals and Credits</h3>
      <MarkdownText markdown={copy.referralsCopy(referrals_number, totalEarnedStringValue)} />
      {/* SUMMARY */}
      {referralsDetails.referrals_number > 0 && (
        <div className="bg-grey-1 rounded-dialogue p-5 mb-6">
          <ul className="mb-0">
            {metrics.map(({ title, slug }, index) => {
              const value = referralsDetails[slug] / currencyOffset
              const valueString = formatCurrency(value, currency)
              const lastItem = index === metrics.length - 1
              const isSpentOrExpired = slug === 'expired' || slug === 'spent'
              const TextEl = lastItem ? 'strong' : 'span'
              return (
                <React.Fragment key={slug}>
                  {lastItem && (
                    <div className="w-full bg-black my-4" style={{ height: 1 }} />
                  )}
                  <li className="flex justify-between mb-3 last:mb-0">
                    <TextEl>{title}</TextEl>
                    <TextEl>{isSpentOrExpired && '-'} {valueString}</TextEl>
                  </li>
                </React.Fragment>
              )
            })}
          </ul>
        </div>
      )}
      {/* MOVE CREDITS */}
      {referralsDetails.referrals_number === 0 && (
        <BillingCopyReferralsCode />
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

export default React.memo(BillingReferralsSummary)
