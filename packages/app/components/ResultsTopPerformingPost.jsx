import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PostCardMedia from '@/app/PostCardMedia'
import ResultsTopPerformingPostStats from '@/app/ResultsTopPerformingPostStats'
import ResultsTopPerformingPostButton from '@/app/ResultsTopPerformingPostButton'
import ResultsPostsNoData from '@/app/ResultsPostsNoData'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'

import copy from '@/app/copy/ResultsPageCopy'

import { formatCurrency } from '@/helpers/utils'
import { getPostById } from '@/app/helpers/postsHelpers'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const ResultsTopPerformingPost = ({
  post,
  metricType,
  isSpendingPaused,
  className,
}) => {
  const { type, valueKey: key } = post
  const [postData, setPostsData] = React.useState(null)
  const [isPurchase, setIsPurchase] = React.useState(false)
  const [value, setValue] = React.useState(Array.isArray(key) ? post[key[0]] : post[key])
  const [isLoading, setIsLoading] = React.useState(false)

  const { artistId, artist: { min_daily_budget_info: { currency: { code: currency } } } } = React.useContext(ArtistContext)

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  const isDesktopLayout = useBreakpointTest('sm')
  const imageHeight = isDesktopLayout ? '176px' : '100px'

  React.useEffect(() => {
    if (type === 'growth') {
      const salesValue = post[key[0]]
      const eventsCount = post[key[1]]

      setIsPurchase(salesValue > 0)
      setValue(salesValue > 0 ? formatCurrency(salesValue, currency) : eventsCount)
    }
  }, [setIsPurchase, post, type, currency, key])

  useAsyncEffect(async (isMounted) => {
    setIsLoading(true)

    const { res, error } = await getPostById(artistId, post.id)
    if (!isMounted()) return

    if (error) {
      setIsLoading(false)
      return
    }

    setPostsData(res)
    setIsLoading(false)
  }, [])

  if (metricType === 'growth' && type === 'growth' && (post[key[1]] === 0 || !hasSalesObjective)) {
    return (
      <ResultsPostsNoData isSpendingPaused={isSpendingPaused} />
    )
  }

  return (
    <div
      className={[className].join(' ')}
    >
      <p className="w-full font-bold text-xl">Top performing post</p>
      <div className="flex flex-col">
        <MarkdownText markdown={copy.postDescription(type, value, isPurchase, objective, platform)} className="xs:mb-12 text-left" />
        {isLoading ? (
          <Spinner className="h-64 flex items-center" width={28} />
        ) : (
          <div className="flex">
            <div className="flex flex-col items-center sm:pl-16 mr-4">
              <PostCardMedia
                media={postData?.media}
                thumbnails={postData?.thumbnails}
                postType={postData?.postType}
                className="mb-2"
                style={{ height: imageHeight, width: imageHeight }}
              />
              <ResultsTopPerformingPostButton
                postData={postData}
              />
            </div>
            <ResultsTopPerformingPostStats
              post={post}
              postData={postData}
              metricType={metricType}
              currency={currency}
            />
          </div>
        )}
      </div>
    </div>
  )
}

ResultsTopPerformingPost.propTypes = {
  post: PropTypes.object.isRequired,
  metricType: PropTypes.string.isRequired,
  isSpendingPaused: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

ResultsTopPerformingPost.defaultProps = {
  className: '',
}

export default ResultsTopPerformingPost
