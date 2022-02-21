import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'
import useBillingStore from '@/app/stores/billingStore'
import MarkdownText from '@/elements/MarkdownText'
import BillingCopyReferralsCode from '@/app/BillingCopyReferralsCode'
import copy from '@/app/copy/billingCopy'
import referralCopy from '@/app/copy/referralCodeCopy'
import { getUpcomingReferralAward } from '@/app/ReferralCodeProgress'

const getBillingStoreState = (state) => ({
  referralsDetails: state.referralsDetails,
  defaultPaymentMethod: state.defaultPaymentMethod,
})

const BillingReferralsSummary = ({
  className,
}) => {
  const { referralsDetails } = useBillingStore(getBillingStoreState, shallow)
  const { referrals_number, qualifying_referrals_number } = referralsDetails
  // Get tiers
  const tiers = [...referralCopy.tiers()].reverse()
  // Get upcoming benefit
  const upcomingBenefit = getUpcomingReferralAward(tiers, qualifying_referrals_number)
  // Intro copy
  const introCopy = referralCopy.introToProgress(referrals_number, qualifying_referrals_number, upcomingBenefit)
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
      <div>
        <MarkdownText markdown={introCopy} />
        <MarkdownText markdown={copy.noReferralsTitle} />
        <MarkdownText markdown={copy.noReferralsDescription} className="text-center italic" />
      </div>
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
