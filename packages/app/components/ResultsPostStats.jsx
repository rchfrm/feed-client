import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PostCardMedia from '@/app/PostCardMedia'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'

import copy from '@/app/copy/ResultsPageCopy'

import { abbreviateNumber, formatCurrency } from '@/helpers/utils'
import { getPostById } from '@/app/helpers/postsHelpers'

const ResultsPostStats = ({
  post,
  className,
}) => {
  const { type, valueKey: key, color } = post
  const [postData, setPostsData] = React.useState(null)
  const [isPurchase, setIsPurchase] = React.useState(false)
  const [value, setValue] = React.useState(Array.isArray(key) ? post[key[0]] : post[key])
  const [isLoading, setIsLoading] = React.useState(false)

  const { artistId, artist: { min_daily_budget_info: { currency: { code: currency } } } } = React.useContext(ArtistContext)

  const isDesktopLayout = useBreakpointTest('sm')
  const imageHeight = isDesktopLayout ? '176px' : '100px'
  const { goToPostMetrics } = usePostsSidePanel()

  React.useEffect(() => {
    if (type === 'conversions') {
      const highestValue = Math.max(post[key[0]], post[key[1]])
      const highestValueKey = Object.keys(post).find(key => post[key] === highestValue)
      setIsPurchase(highestValueKey === key[0])
      setValue(highestValueKey === key[0] ? formatCurrency(highestValue, currency) : highestValue)
    }
  }, [setIsPurchase, post, type, currency, key])

  const openPostMetricsSidePanel = () => {
    const metrics = {
      organic: postData.organicMetrics,
      paid: postData.paidMetrics,
    }
    const { postType } = postData
    goToPostMetrics({ metrics, postType })
  }

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

  return (
    <div
      className={[className].join(' ')}
    >
      <p className="w-full font-bold text-xl">Top performing post</p>
      <div className="flex flex-row sm:flex-col items-center">
        <div className="flex items-center" style={{ minHeight: '108px' }}>
          <MarkdownText markdown={copy.postDescription(type, isPurchase)} className="hidden sm:block text-center sm:px-9" />
        </div>
        {isLoading ? (
          <Spinner className="h-64 flex items-center" width={28} />
        ) : (
          <>
            <PostCardMedia
              media={postData?.media}
              thumbnails={postData?.thumbnails}
              postType={postData?.postType}
              className="mb-2 mr-4 sm:mr-0"
              style={{ height: imageHeight, width: imageHeight }}
            />
            <div
              className={[
                'hidden',
                'sm:flex flex-column items-center',
                '-mt-5 mb-6 px-6 py-1 z-10',
                'text-white rounded-full',
              ].join(' ')}
              style={{ backgroundColor: color }}
            >
              {isPurchase ? value : abbreviateNumber(value)}
              <MarkdownText markdown={copy.postLabelText(type, isPurchase)} className="text-xs -mt-1 mb-0" />
            </div>
            <div className="flex flex-col items-start justify-center sm:items-center">
              <MarkdownText markdown={copy.postDescriptionMobile(type, value, isPurchase)} className="sm:hidden" />
              <Button
                version="small outline"
                className={[
                  'h-8',
                  'rounded-full',
                  'border-solid border-black border-2 text-black',
                ].join(' ')}
                onClick={openPostMetricsSidePanel}
                trackComponentName="ResultsPostStats"
              >
                View more
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

ResultsPostStats.propTypes = {
  post: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsPostStats.defaultProps = {
  className: '',
}

export default ResultsPostStats
