import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useBillingStore from '@/app/stores/billingStore'

import MarkdownText from '@/elements/MarkdownText'

import BillingCopyReferralsCode from '@/app/BillingCopyReferralsCode'

import { formatCurrency } from '@/helpers/utils'

import copy from '@/app/copy/billingCopy'

const getBillingStoreState = (state) => ({
  referralsDetails: state.referralsDetails,
  defaultPaymentMethod: state.defaultPaymentMethod,
})

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
  const { referralsDetails, defaultPaymentMethod } = useBillingStore(getBillingStoreState, shallow)
  const currency = defaultPaymentMethod?.currency || 'GBP'
  const { earned, referrals_number } = referralsDetails
  const { artist: { min_daily_budget_info } } = React.useContext(ArtistContext)
  const { currency: { offset: currencyOffset } } = min_daily_budget_info || {}
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
      {/* SUMMARY */}
      {referralsDetails.referrals_number > 0 ? (
        <>
          <MarkdownText markdown={copy.referralsTitle(referrals_number, totalEarnedStringValue)} />
          <div className="bg-grey-1 rounded-dialogue p-5 mb-6">
            <ul className="mb-0">
              {metrics.map(({ title, slug }, index) => {
                const value = referralsDetails[slug] / currencyOffset
                const valueString = formatCurrency(value, currency)
                const lastItem = index === metrics.length - 1
                const isSpentOrExpired = slug === 'expired' || slug === 'spent'
                const TextEl = lastItem ? 'strong' : 'span'
                if (!value && isSpentOrExpired) return
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
        </>
      ) : (
        <div>
          <MarkdownText markdown={copy.noReferralsTitle} />
          <MarkdownText markdown={copy.noReferralsDescription} className="text-center italic" />
        </div>
      )}
      <BillingCopyReferralsCode />
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
