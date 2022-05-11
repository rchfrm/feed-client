import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsPostsNoData = ({ isSpendingPaused }) => {
  return (
    <div className="hidden sm:block col-span-6 order-3">
      <p className="text-xl font-bold">Top performing post</p>
      <MarkdownText className="mb-0" markdown={copy.postsStatsNoData(isSpendingPaused)} />
    </div>
  )
}

ResultsPostsNoData.propTypes = {
  isSpendingPaused: PropTypes.bool.isRequired,
}

export default ResultsPostsNoData
