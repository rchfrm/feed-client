import React from 'react'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/ResultsPageCopy'

const ResultsFollowerGrowthSummary = () => {
  return (
    <div className="w-full rounded-dialogue mb-4 p-5 bg-green-bg-light">
      <MarkdownText markdown={copy.followerGrowthSummary} className="text-2xl mb-2" />
      <MarkdownText markdown={copy.followerGrowthSummarySubtitle} className="mb-0 text-xs text-green-dark" />
    </div>
  )
}

export default ResultsFollowerGrowthSummary
