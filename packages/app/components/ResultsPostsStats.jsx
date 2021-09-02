import React from 'react'

import ResultsPostStats from '@/app/ResultsPostStats'
import NoDataBlock from '@/app/NoDataBlock'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'
import { postResultsConfig } from '@/app/helpers/resultsHelpers'


const ResultsPostsStats = ({ data }) => {
  return (
    <>
      {data.posts.length ? (
        <>
          {data.posts.map((post, index) => (
            <ResultsPostStats
              key={post.id}
              post={post}
              data={data.on_platform}
              config={postResultsConfig[index]}
              className={[
                'col-span-12 sm:col-span-6',
                'flex flex-col sm:items-center',
                'mb-10',
                `order-${index + 1} sm:order-${index + 4}`,
              ].join(' ')}
            />
          ))}
        </>
      ) : (
        <div className="col-start-3 col-span-8 order-2 h-56">
          <NoDataBlock className="text-grey-3">
            <MarkdownText className="mb-0 text-center" markdown={copy.postsStatsNoData} />
          </NoDataBlock>
        </div>
      )}
    </>
  )
}

ResultsPostsStats.propTypes = {

}

export default ResultsPostsStats
