import React from 'react'
import PropTypes from 'prop-types'

import PostPromotionStatus from '@/app/PostPromotionStatus'
import PostCardMedia from '@/app/PostCardMedia'
import PostScore from '@/app/PostScore'

const PostContentMediaMobile = ({ post }) => {
  const {
    promotionEnabled,
    promotionStatus,
    postPromotable,
    media,
    mediaType,
    thumbnails,
    postType,
    videoFallback,
    message,
    organicMetrics,
  } = post

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8 col-start-3 relative mb-10">
        <div className="absolute transform -translate-x-1/2 left-1/2 -top-2 z-10">
          <PostPromotionStatus
            promotionEnabled={promotionEnabled}
            promotionStatus={promotionStatus}
            postPromotable={postPromotable}
            size="small"
          />
        </div>
        <PostCardMedia
          media={media}
          mediaType={mediaType}
          thumbnails={thumbnails}
          postType={postType}
          videoFallback={videoFallback}
          caption={message}
        />
        <PostScore
          score={organicMetrics.normalizedScore}
          className="transform -translate-x-1/2 left-1/2 -bottom-4"
          size="small"
        />
      </div>
    </div>
  )
}

PostContentMediaMobile.propTypes = {
  post: PropTypes.object.isRequired,
}

PostContentMediaMobile.defaultProps = {
}

export default PostContentMediaMobile
