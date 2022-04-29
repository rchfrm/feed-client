import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsPostsNoData = ({ isSpendingPaused }) => {
  return (
    <div className="hidden sm:block col-span-12 sm:col-start-3 sm:col-span-8 order-3">
      <MarkdownText className="mb-0 px-8 text-center" markdown={copy.postsStatsNoData(isSpendingPaused)} />
    </div>
  )
}

ResultsPostsNoData.propTypes = {
  isSpendingPaused: PropTypes.bool.isRequired,
}

export default ResultsPostsNoData
