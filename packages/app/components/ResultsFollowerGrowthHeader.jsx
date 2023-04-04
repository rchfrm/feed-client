import React from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import { formatCurrency } from '@/helpers/utils'
import copy from '@/app/copy/ResultsPageCopy'
import { getSpendingPeriodIndexes, sumAddedFollowers } from '@/app/helpers/resultsHelpers'


const ResultsFollowerGrowthHeader = ({ dataSources, period, currency }) => {
  const { adSpend, followerGrowth } = dataSources
  const dateKeys = Object.keys(Object.values(dataSources)[0])
  const startDate = dateKeys[0]
  const endDate = dateKeys[dateKeys.length - 1]

  const spendingPeriodIndexes = getSpendingPeriodIndexes(adSpend, 1)
  const totalFollowersAddedInPeriod = sumAddedFollowers(followerGrowth, spendingPeriodIndexes)
  const totalSpendInPeriod = Object.values(adSpend).reduce((a, b) => a + b, 0)
  const costPerFollower = Math.abs(totalSpendInPeriod / totalFollowersAddedInPeriod)

  return (
    <div className="w-full rounded-dialogue mb-4 p-5 bg-green-bg-light text-2xl">
      {totalSpendInPeriod ? (
        <>
          <div className="mb-2">
            <span className="font-bold bg-green-bg-dark rounded-dialogue mr-1 px-1.5 py-0.5">{Math.abs(totalFollowersAddedInPeriod)}</span>
            <span className="text-2xl mb-2">{copy.followerGrowthHeaderTitle(totalFollowersAddedInPeriod)}</span>
            <span className="font-bold bg-green-bg-dark rounded-dialogue mx-1 py-0.5"> {formatCurrency(costPerFollower, currency)} </span>each.
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
}

export default ResultsFollowerGrowthHeader
