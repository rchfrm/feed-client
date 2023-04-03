import React from 'react'
import MarkdownText from '@/elements/MarkdownText'
import { formatCurrency } from '@/helpers/utils'
import copy from '@/app/copy/ResultsPageCopy'

const ResultsFollowerGrowthHeader = ({ dataSources, currency }) => {
  const { adSpend, followerGrowth } = dataSources
  const dateKeys = Object.keys(Object.values(dataSources)[0])
  const startDate = dateKeys[0]
  const endDate = dateKeys[dateKeys.length - 1]
  const followersAdded = followerGrowth[endDate] - followerGrowth[startDate]
  const totalSpendInPeriod = Object.values(adSpend).reduce((a, b) => a + b, 0)
  const costPerFollower = totalSpendInPeriod / followersAdded

  return (
    <div className="w-full rounded-dialogue mb-4 p-5 bg-green-bg-light text-2xl">
      <div className="mb-2">
        <span className="font-bold bg-green-bg-dark rounded-dialogue mr-1 px-1.5 py-0.5">{followersAdded}</span>
        <span className="text-2xl mb-2">{copy.followerGrowthHeaderTitle}</span>
        <span className="font-bold bg-green-bg-dark rounded-dialogue mx-1 py-0.5"> {formatCurrency(costPerFollower, currency)} </span>each.
      </div>
      <MarkdownText markdown={copy.followerGrowthHeaderSubtitle(startDate, endDate)} className="mb-0 text-xs text-green-dark" />
    </div>
  )
}

export default ResultsFollowerGrowthHeader
