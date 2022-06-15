import React from 'react'
import PropTypes from 'prop-types'

import PostCardPromotionStatus from '@/app/PostCardPromotionStatus'
import PostCardMedia from '@/app/PostCardMedia'
import PostScore from '@/app/PostScore'

const PostMediaMobile = ({ post }) => {
  const {
    promotionEnabled,
    promotionStatus,
    media,
    thumbnails,
    postType,
    organicMetrics,
  } = post

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8 col-start-3 relative mb-10">
        <div className="absolute transform -translate-x-1/2 left-1/2 -top-2 z-10">
          <PostCardPromotionStatus
            promotionEnabled={promotionEnabled}
            promotionStatus={promotionStatus}
            size="small"
          />
        </div>
        <PostCardMedia
          media={media}
          thumbnails={thumbnails}
          postType={postType}
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

PostMediaMobile.propTypes = {
  post: PropTypes.object.isRequired,
}

PostMediaMobile.defaultProps = {
}

export default PostMediaMobile
