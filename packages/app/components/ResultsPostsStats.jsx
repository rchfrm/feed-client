import React from 'react'

import ResultsPostStats from '@/app/ResultsPostStats'
import NoDataBlock from '@/app/NoDataBlock'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'
import { postResultsConfig } from '@/app/helpers/resultsHelpers'

const ResultsPostsStats = ({ data }) => {
  const sortedPosts = postResultsConfig.map((x) => data.posts.find((element) => element[x.type])).filter(Boolean)

  return (
    sortedPosts.length ? (
      sortedPosts.map((post, index) => (
        <ResultsPostStats
          key={post.id}
          post={post}
          config={postResultsConfig[index]}
          className={[
            'col-span-12 sm:col-span-6',
            'flex flex-col sm:items-center',
            `order-${index + 1} sm:order-${index + 4}`,
            'mb-6 sm:mb-0',
          ].join(' ')}
        />
      ))
    ) : (
      <div className="col-span-12 sm:col-start-3 sm:col-span-8 order-2">
        <NoDataBlock className="mb-4 sm:mb-0 text-grey-3" sizeRatio={1 / 2}>
          <MarkdownText className="mb-0 px-8 text-center" markdown={copy.postsStatsNoData} />
        </NoDataBlock>
      </div>
    )
  )
}

ResultsPostsStats.propTypes = {

}

export default ResultsPostsStats
