import React from 'react'
import PropTypes from 'prop-types'

import PostCardHeader from '@/app/PostCardHeader'
import PostCardMedia from '@/app/PostCardMedia'
import PostCardScore from '@/app/PostCardScore'
import PostCardToggles from '@/app/PostCardToggles'
import PostCardUnpromotable from '@/app/PostCardUnpromotable'
import PostCardActionButtons from '@/app/PostCardActionButtons'
import PostCardDisableWarning from '@/app/PostCardDisableWarning'

const PostCard = ({
  post,
  postIndex,
  updatePost,
  togglePromotion,
  postToggleSetterType,
  isMissingDefaultLink,
  artistId,
  className,
  children,
}) => {
  // Extract some variables
  const { postPromotable, promotionStatus, postType } = post
  const hidePaidMetrics = promotionStatus === 'inactive'
  // Should conversionVisible be hidden
  const conversionVisible = true
  const conversionDisabled = true
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <PostCardHeader
        platform={post.platform}
        date={post.publishedTime}
        permalink={post.permalinkUrl}
        postType={postType}
        postId={post.id}
        artistId={artistId}
        priorityEnabled={post.priorityEnabled}
        updatePost={updatePost}
        postIndex={postIndex}
        promotionStatus={promotionStatus}
        className="mb-2"
      />
      <PostCardMedia
        media={post.media}
        thumbnails={post.thumbnails}
        caption={post.message}
        postType={postType}
        className="mb-2"
      />
      <div className="relative">
        <PostCardScore
          scorePaid={post.paidMetrics.engagementScore}
          scoreOrganic={post.organicMetrics.engagementScore}
          promotionStatus={promotionStatus}
          className="py-3 px-4 mb-2"
        />
        {postPromotable ? (
          <PostCardToggles
            postId={post.id}
            artistId={artistId}
            togglesClassName="py-2 px-4 mb-2 last:mb-0"
            className="mb-2"
            promotionEnabled={post.promotionEnabled}
            promotionStatus={post.promotionStatus}
            togglePromotion={togglePromotion}
            conversionVisible={conversionVisible}
            conversionDisabled={conversionDisabled}
            growthDisabled={promotionStatus === 'archived'}
          />
        ) : (
          <PostCardUnpromotable
            className="py-3 px-4 mb-2"
            conversionVisible={conversionVisible}
          />
        )}
        <PostCardActionButtons
          post={post}
          postIndex={postIndex}
          postPromotable={postPromotable}
          updatePost={updatePost}
          hidePaidMetrics={hidePaidMetrics}
          isMissingDefaultLink={isMissingDefaultLink}
        />
        {/* DISABLE WARNING (usually hidden) */}
        {postPromotable && promotionStatus === 'active' && (
          <PostCardDisableWarning
            postId={post.id}
            postType={postType}
            platform={post.platform}
            paidEs={post?.paidMetrics?.engagementScore}
            postStatus={post.promotionStatus}
            promotionEnabled={post.promotionEnabled}
            promotableStatus={post.promotableStatus}
            togglePromotion={togglePromotion}
            postToggleSetterType={postToggleSetterType}
            artistId={artistId}
            textClassName="py-3 px-4"
          />
        )}
      </div>
      {/* LOAD TRIGGER goes here */}
      {children}
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  postIndex: PropTypes.number.isRequired,
  togglePromotion: PropTypes.func.isRequired,
  postToggleSetterType: PropTypes.string.isRequired,
  isMissingDefaultLink: PropTypes.bool.isRequired,
  artistId: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
}

PostCard.defaultProps = {
  className: null,
  children: null,
}

export default PostCard
