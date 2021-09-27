import React from 'react'
import PropTypes from 'prop-types'

import NoDataBlock from '@/app/NoDataBlock'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsPostsNoData = ({ isSpendingPaused }) => {
  return (
    <div className="hidden sm:block col-span-12 sm:col-start-3 sm:col-span-8 order-2">
      <NoDataBlock className="mb-4 sm:mb-0 text-grey-3" sizeRatio={1 / 2}>
        <MarkdownText className="mb-0 px-8 text-center" markdown={copy.postsStatsNoData(isSpendingPaused)} />
      </NoDataBlock>
    </div>
  )
}

ResultsPostsNoData.propTypes = {
  isSpendingPaused: PropTypes.bool.isRequired,
}

export default ResultsPostsNoData
