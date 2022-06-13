import React from 'react'
import PropTypes from 'prop-types'

import PostCardPriorityButton from '@/app/PostCardPriorityButton'
import PostCardPromotionStatus from '@/app/PostCardPromotionStatus'
import PostCardHeaderSource from '@/app/PostCardHeaderSource'

const PostCardHeader = ({
  platform,
  publishedDate,
  permalink,
  postType,
  postId,
  artistId,
  priorityEnabled,
  promotionEnabled,
  updatePost,
  toggleCampaign,
  postIndex,
  className,
  promotionStatus,
}) => {
  return (
    <div
      className={[
        'flex justify-between items-bottom',
        className,
      ].join(' ')}
    >
      <div className="flex items-center">
        <PostCardPriorityButton
          postId={postId}
          artistId={artistId}
          priorityEnabled={priorityEnabled}
          updatePost={updatePost}
          toggleCampaign={toggleCampaign}
          postIndex={postIndex}
          promotionStatus={promotionStatus}
        />
        <span className="h-5 mx-2 border-l border-solid border-grey-2" />
        <PostCardPromotionStatus
          promotionEnabled={promotionEnabled}
          promotionStatus={promotionStatus}
          size="small"
        />
      </div>
      {/* LINK TO THE ORIGINAL POST */}
      <PostCardHeaderSource
        platform={platform}
        publishedDate={publishedDate}
        permalink={permalink}
        postType={postType}
      />
    </div>
  )
}

PostCardHeader.propTypes = {
  platform: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  postType: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  priorityEnabled: PropTypes.bool.isRequired,
  updatePost: PropTypes.func.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
  postIndex: PropTypes.number.isRequired,
  promotionStatus: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostCardHeader.defaultProps = {
  className: null,
}

export default PostCardHeader
