import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PostCardMedia from '@/app/PostCardMedia'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

import { abbreviateNumber } from '@/helpers/utils'
import { getPostById } from '@/app/helpers/postsHelpers'

const ResultsPostStats = ({
  post,
  data,
  config,
  className,
}) => {
  const [postData, setPostsData] = React.useState(null)
  const { artistId } = React.useContext(ArtistContext)

  const { type, color } = config
  const { ads_reach: adsReach } = data
  const isDesktopLayout = useBreakpointTest('sm')
  const imageHeight = isDesktopLayout ? '176px' : '100px'
  const values = type === 'growth' ? [post.engaged, (adsReach.proportion * 100)] : [post.reach]
  const { goToPostMetrics } = usePostsSidePanel()

  const openPostMetricsSidePanel = () => {
    const metrics = {
      organic: postData.organicMetrics,
      paid: postData.paidMetrics,
    }
    const { postType } = postData
    goToPostMetrics({ metrics, postType })
  }

  useAsyncEffect(async (isMounted) => {
    const { res, error } = await getPostById(artistId, post.id)
    if (!isMounted()) return
    if (error) {
      return
    }
    setPostsData(res)
  }, [])

  return (
    postData && (
      <div
        className={[className].join(' ')}
      >
        <p className="w-full text-bold text-lg sm:hidden">Most effective post</p>
        <div className="flex flex-row sm:flex-col items-center">
          <div className="flex items-center" style={{ minHeight: '88px' }}>
            <MarkdownText markdown={copy.postDescription(type, values)} className="hidden sm:block text-center sm:px-9" />
          </div>
          <PostCardMedia
            media={postData.media}
            thumbnails={postData.thumbnails}
            postType={postData.postType}
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
            {abbreviateNumber(values[0])}
            <span className="text-xs -mt-1">{type === 'growth' ? 'engaged' : 'reached'}</span>
          </div>
          <div className="flex flex-col items-start justify-center sm:items-center">
            <MarkdownText markdown={copy.postDescriptionMobile(type, values)} className="sm:hidden" />
            <Button
              version="small outline"
              className={[
                'h-8',
                'rounded-full',
                'border-solid border-black border-2 text-black',
              ].join(' ')}
              onClick={openPostMetricsSidePanel}
            >
              View more
            </Button>
          </div>
        </div>
      </div>
    )
  )
}

ResultsPostStats.propTypes = {
  post: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsPostStats.defaultProps = {
  className: '',
}

export default ResultsPostStats
