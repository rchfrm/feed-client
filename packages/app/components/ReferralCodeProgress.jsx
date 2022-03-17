import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import MarkdownText from '@/elements/MarkdownText'
import ReferralCodeProgressBar from '@/app/ReferralCodeProgressBar'
import copy from '@/app/copy/referralCodeCopy'

// Use this to get the next upcoming referral award
export const getUpcomingReferralAward = (tiers, totalCompleteReferrals, minSpendString) => {
  const nextTierIndex = tiers.findIndex(({ referrals: requiredReferrals }) => totalCompleteReferrals >= requiredReferrals)
  // If reached the max
  if (nextTierIndex === 0) {
    return `another ${minSpendString} in credit`
  }
  // return award copy with first word in lowercase
  const { upcoming } = nextTierIndex === -1 ? tiers[tiers.length - 1] : tiers[nextTierIndex - 1]
  return upcoming
}

const ReferralCodeProgress = ({
  totalReferrals,
  totalCompleteReferrals,
  className,
}) => {
  // Get referral credit monthlyBudget
  const { artist: { feedMinBudgetInfo } } = React.useContext(ArtistContext)

  // Get tiers
  const tiers = [...copy.tiers(feedMinBudgetInfo.currencyCode)].reverse()

  // Calc percent complete
  const totalTiers = tiers.length
  const percentComplete = tiers.reduce((percent, { referrals: referralsRequired }) => {
    if (totalCompleteReferrals < referralsRequired) return percent
    percent += ((1 / totalTiers) * 100)
    return percent
  }, 0)

  // Get footnotes
  const footnotes = tiers.reduce((obj, { footnoteSymbol, footnote }) => {
    if (!footnoteSymbol || obj[footnoteSymbol]) return obj
    obj[footnoteSymbol] = {
      symbol: footnoteSymbol,
      footnote,
    }
    return obj
  }, {})

  // Get upcoming benefit
  const upcomingBenefit = getUpcomingReferralAward(tiers, totalCompleteReferrals)

  // Intro copy
  const introCopy = copy.introToProgress(totalReferrals, totalCompleteReferrals, upcomingBenefit)

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* INTRO */}
      <MarkdownText markdown={introCopy} className="h3--text mb-8" />
      {/* TIERS */}
      <div className="relative mb-10">
        <ReferralCodeProgressBar
          percentComplete={percentComplete}
          className="hidden iphone8:block absolute top-0 left-0 h-full w-10"
        />
        <ol className="relative" style={{ zIndex: 2 }}>
          {tiers.map((tier) => {
            const { referrals, award, footnoteSymbol } = tier
            const isAchieved = totalCompleteReferrals >= referrals

            return (
              <li
                key={referrals}
                className="relative flex items-center mb-6 last:mb-0 iphone8:ml-12 xxs:ml-16"
              >
                <p
                  className={[
                    'flex-shrink-0',
                    'mb-0 w-12 xxs:w-16 text-2xl font-bold',
                    isAchieved ? 'text-green' : null,
                  ].join(' ')}
                >
                  {referrals}
                </p>
                <p className={`mb-0 ${isAchieved ? 'leading-loose' : null}`}>
                  {isAchieved && (
                    <span
                      role="img"
                      aria-label={`celebrating ${award}`}
                      className="-ml-1 xxs:ml-0 pr-4"
                    >
                      🥳
                    </span>
                  )}
                  <span className={isAchieved ? 'font-bold' : null}>
                    {award}.
                    {footnoteSymbol}
                  </span>
                </p>
              </li>
            )
          })}
        </ol>
      </div>
      {/* FOOTNOTES */}
      <ul className="text-sm">
        {Object.values(footnotes).map(({ symbol, footnote }) => {
          return (
            <li key={symbol} className="flex pl-4">
              <p className="mb-0 w-6 flex-shrink-0">{symbol}</p>
              <p className="mb-0">{footnote}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

ReferralCodeProgress.propTypes = {
  totalReferrals: PropTypes.number,
  totalCompleteReferrals: PropTypes.number,
  className: PropTypes.string,
}

ReferralCodeProgress.defaultProps = {
  totalReferrals: 0,
  totalCompleteReferrals: 0,
  className: null,
}

export default React.memo(ReferralCodeProgress)
