import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import ReferralCodeProgressBar from '@/app/ReferralCodeProgressBar'

import copy from '@/app/copy/referralCodeCopy'

const tiers = [...copy.tiers].reverse()

const ReferralCodeProgress = ({
  className,
}) => {
  // TODO fetch this from API
  const referralsAchieved = 3
  const totalTiers = tiers.length
  const percentComplete = tiers.reduce((percent, { referrals: referralsRequired }) => {
    if (referralsAchieved < referralsRequired) return percent
    percent += ((1 / totalTiers) * 100)
    return percent
  }, 0)

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* INTRO */}
      <MarkdownText markdown={copy.introToProgress(referralsAchieved)} className="h3--text mb-8" />
      {/* TIERS */}
      <div className="relative">
        <ReferralCodeProgressBar
          percentComplete={percentComplete}
          className="hidden iphone8:block absolute top-0 left-0 h-full w-10"
        />
        <ol className="relative" style={{ zIndex: 2 }}>
          {tiers.map((tier) => {
            const { referrals, award } = tier
            const isAchieved = referralsAchieved >= referrals

            return (
              <li
                key={referrals}
                className="relative flex items-center mb-6 last:mb-0 iphone8:ml-12 xxs:ml-16"
              >
                <p
                  className={[
                    'mb-0 w-12 xxs:w-16 text-2xl font-bold',
                    isAchieved ? 'text-green' : null,
                  ].join(' ')}
                >
                  {referrals}
                </p>
                <p className="flex mb-0">
                  {isAchieved && (
                    <span
                      role="img"
                      aria-label={`celebrating ${award}`}
                      className="-ml-1 xxs:ml-0 pr-4"
                    >
                      🥳
                    </span>
                  )}
                  <span className={isAchieved ? 'font-bold' : null}>{award}</span>
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

ReferralCodeProgress.propTypes = {
  className: PropTypes.string,
}

ReferralCodeProgress.defaultProps = {
  className: null,
}

export default ReferralCodeProgress
