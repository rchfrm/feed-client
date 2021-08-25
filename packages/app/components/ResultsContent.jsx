import React from 'react'

import ResultsOnPlatformAudienceStats from '@/app/ResultsOnPlatformAudienceStats'
import ResultsUnawareAudienceStats from '@/app/ResultsUnawareAudienceStats'
import ResultsPostStats from '@/app/ResultsPostStats'

const ResultsContent = ({ data }) => {
  return (
    <div>
      <div className="inline-block px-4 py-3 rounded-button bg-grey-1 mb-12">
        In the last <strong>30 days</strong>
      </div>
      <div className="grid grid-cols-12 col-gap-6">
        <div className="col-span-12 sm:col-span-8">
          <div className="grid grid-cols-12 col-gap-6">
            <ResultsUnawareAudienceStats
              data={data.unaware}
              className={[
                'col-span-12 sm:col-span-6',
                'flex flex-col items-center',
                'order-1',
              ].join(' ')}
            />
            <ResultsOnPlatformAudienceStats
              data={data.on_platform}
              className={[
                'col-span-12 sm:col-span-6',
                'flex flex-col items-center',
                'order-2',
              ].join(' ')}
            />
            <h2 className="col-span-12 my-10 order-3 hidden sm:block">The posts currently getting the best results...</h2>
            {data.posts.map((post, index) => (
              <ResultsPostStats
                key={post.id}
                post={post}
                className={[
                  'col-span-12 sm:col-span-6',
                  'flex flex-col sm:items-center',
                  'mb-10',
                  `order-${index + 1} sm:order-${index + 4}`,
                ].join(' ')}
              />
            ))}
          </div>
        </div>
        <div className="col-span-12 sm:col-span-4 h-48 sm:h-auto bg-grey-1" />
      </div>
    </div>
  )
}

ResultsContent.propTypes = {

}

export default ResultsContent
