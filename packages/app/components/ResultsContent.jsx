import React from 'react'
import PropTypes from 'prop-types'

import ResultsStats from '@/app/ResultsStats'
import ResultsPostsStats from '@/app/ResultsPostsStats'
import ResultsSpendOverview from '@/app/ResultsSpendOverview'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsContent = ({ adData, aggregatedAdData, isSpendingPaused }) => {
  if (!adData) return <MarkdownText markdown={copy.noResultsData(isSpendingPaused)} />

  return (
    <div>
      <div className="grid grid-cols-12 sm:gap-x-12 mb-8">
        <div className={[
          'col-span-12',
        ].join(' ')}
        >
          <div className={[
            'grid grid-cols-12 sm:gap-x-12',
            'gap-y-8 sm:gap-y-16',
            'sm:mb-0',
          ].join(' ')}
          >
            <ResultsStats
              adData={adData}
              aggregatedAdData={aggregatedAdData}
              className="sm:col-span-4"
            />
            <ResultsPostsStats
              adData={adData}
              className="sm:col-span-4"
            />
          </div>
        </div>
      </div>
      <ResultsSpendOverview spending={adData.spend} />
    </div>
  )
}

ResultsContent.propTypes = {
  adData: PropTypes.object,
  aggregatedAdData: PropTypes.object,
  isSpendingPaused: PropTypes.bool.isRequired,
}

ResultsContent.defaultProps = {
  adData: null,
  aggregatedAdData: null,
}

export default ResultsContent
