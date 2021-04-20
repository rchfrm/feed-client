import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import ReferralCodeProgressBar from '@/app/ReferralCodeProgressBar'

import copy from '@/app/copy/referralCodeCopy'

const tiers = [...copy.tiers].reverse()

const ReferralCodeProgress = ({
  referrals,
  className,
}) => {
  // TODO fetch this from API
  console.log('referrals', referrals)
  const referralsAchieved = Object

  // Calc percent complete
  const totalTiers = tiers.length
  const percentComplete = tiers.reduce((percent, { referrals: referralsRequired }) => {
    if (referralsAchieved < referralsRequired) return percent
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

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* INTRO */}
      <MarkdownText markdown={copy.introToProgress(referralsAchieved)} className="h3--text mb-8" />
      {/* TIERS */}
      <div className="relative mb-10">
        <ReferralCodeProgressBar
          percentComplete={percentComplete}
          className="hidden iphone8:block absolute top-0 left-0 h-full w-10"
        />
        <ol className="relative" style={{ zIndex: 2 }}>
          {tiers.map((tier) => {
            const { referrals, award, footnoteSymbol } = tier
            const isAchieved = referralsAchieved >= referrals

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
                    {award}
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
  referrals: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ReferralCodeProgress.defaultProps = {
  className: null,
}

export default React.memo(ReferralCodeProgress)
