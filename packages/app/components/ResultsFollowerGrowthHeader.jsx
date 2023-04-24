import React from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import { getSpendingPeriodIndexes, sumAddedFollowers } from '@/app/helpers/resultsHelpers'
import { formatCurrency, abbreviateNumber } from '@/helpers/utils'
import copy from '@/app/copy/ResultsPageCopy'

const ResultsFollowerGrowthHeader = ({
  dataSources,
  period,
  currency,
  platform,
  breakdownBy,
}) => {
  const { adSpend, followerGrowth } = dataSources
  const dateKeys = Object.keys(Object.values(dataSources)[0])
  const startDate = dateKeys[0]
  const endDate = dateKeys[dateKeys.length - 1]

  const spendingPeriodIndexes = getSpendingPeriodIndexes(adSpend, 1)
  const totalFollowersAddedInPeriod = sumAddedFollowers(followerGrowth, spendingPeriodIndexes)
  const totalSpendInPeriod = Object.values(adSpend).reduce((a, b) => a + b, 0)
  const costPerFollower = Math.abs(totalSpendInPeriod / totalFollowersAddedInPeriod)
  const shouldShowCostPerFollower = totalFollowersAddedInPeriod > 0 && ! breakdownBy && Number.isFinite(costPerFollower)

  return (
    <div className="w-full rounded-dialogue mb-4 p-5 bg-green-bg-light text-xl sm:text-2xl">
      {totalSpendInPeriod ? (
        <>
          <div className="mb-2">
            <span className="font-bold bg-green-bg-dark rounded-dialogue mr-1 px-1.5 py-0.5">{abbreviateNumber(Math.abs(totalFollowersAddedInPeriod))}</span>
            <span className="mb-2">{copy.followerGrowthHeaderTitle(totalFollowersAddedInPeriod, platform, shouldShowCostPerFollower)}</span>
            {shouldShowCostPerFollower && <><span className="font-bold bg-green-bg-dark rounded-dialogue mx-1 py-0.5"> {formatCurrency(costPerFollower, currency)} </span>each.</>}
          </div>
          <MarkdownText markdown={copy.followerGrowthHeaderSubtitle({ period, startDate, endDate })} className="mb-0 text-xs text-green-dark" />
        </>
      ) : (
        <MarkdownText markdown={copy.noCampaigns} className="mb-0" />
      )}
    </div>
  )
}

ResultsFollowerGrowthHeader.propTypes = {
  dataSources: PropTypes.object.isRequired,
  period: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  breakdownBy: PropTypes.string.isRequired,
}

export default ResultsFollowerGrowthHeader
