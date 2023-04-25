import React from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import { getSpendingPeriodIndexes, sumAddedFollowers, getCostPerFollower } from '@/app/helpers/resultsHelpers'
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

  const amountSpentInCampaign = Object.values(adSpend).reduce((a, b) => a + b, 0)
  const { estimatedTotalFollowersAddedByFeed, costPerFollower } = getCostPerFollower(dataSources, amountSpentInCampaign) || {}
  const spendingPeriodIndexes = getSpendingPeriodIndexes(adSpend, 1)
  const totalFollowersAddedInGeneral = sumAddedFollowers(followerGrowth, spendingPeriodIndexes)
  const shouldShowCostPerFollower = (estimatedTotalFollowersAddedByFeed > 0 && totalFollowersAddedInGeneral > 0) && ! breakdownBy && Number.isFinite(costPerFollower)
  const totalFollowersAddedByFeed = estimatedTotalFollowersAddedByFeed < totalFollowersAddedInGeneral ? estimatedTotalFollowersAddedByFeed : totalFollowersAddedInGeneral

  return (
    <div className="w-full rounded-dialogue mb-4 p-5 bg-green-bg-light text-xl sm:text-2xl">
      {amountSpentInCampaign ? (
        <>
          <div className="mb-2">
            <span className="font-bold bg-green-bg-dark rounded-dialogue mr-1 px-1.5 py-0.5">{abbreviateNumber(Math.abs(Math.round(totalFollowersAddedByFeed)))}</span>
            <span className="mb-2">{copy.followerGrowthHeaderTitle(totalFollowersAddedByFeed, platform, shouldShowCostPerFollower)}</span>
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
