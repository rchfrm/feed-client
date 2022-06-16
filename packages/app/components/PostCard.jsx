import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import PostCardHeader from '@/app/PostCardHeader'
import PostCardMedia from '@/app/PostCardMedia'
import PostCardScore from '@/app/PostCardScore'
import PostCardToggles from '@/app/PostCardToggles'
import PostCardUnpromotable from '@/app/PostCardUnpromotable'
import PostCardActionButtons from '@/app/PostCardActionButtons'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const PostCard = ({
  post,
  postIndex,
  updatePost,
  toggleCampaign,
  postToggleSetterType,
  isMissingDefaultLink,
  artistId,
  className,
  children,
}) => {
  // Extract some variables
  const { postPromotable, promotionStatus, promotionEnabled, postType } = post
  const hidePaidMetrics = promotionStatus === 'inactive'

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <PostCardHeader
        platform={post.platform}
        publishedDate={post.publishedTime}
        permalink={post.permalinkUrl}
        postType={postType}
        postId={post.id}
        artistId={artistId}
        priorityEnabled={post.priorityEnabled}
        promotionEnabled={promotionEnabled}
        updatePost={updatePost}
        toggleCampaign={toggleCampaign}
        postIndex={postIndex}
        promotionStatus={promotionStatus}
        className="mb-2"
      />
      <PostCardMedia
        media={post.media}
        mediaType={post.mediaType}
        videoFallback={post.videoFallback}
        thumbnails={post.thumbnails}
        caption={post.message}
        postType={postType}
        className="mb-2"
      />
      <div className="relative">
        <PostCardScore
          score={post.organicMetrics.normalizedScore}
          className="py-3 px-4 mb-2"
        />
        {postPromotable ? (
          <PostCardToggles
            artistId={artistId}
            post={post}
            postToggleSetterType={postToggleSetterType}
            postIndex={postIndex}
            toggleCampaign={toggleCampaign}
            updatePost={updatePost}
            priorityEnabled={post.priorityEnabled}
            togglesClassName="py-2 px-4 mb-2 last:mb-0 bg-grey-1"
            className="mb-2"
            hasSalesObjective={hasSalesObjective}
          />
        ) : (
          <PostCardUnpromotable
            hasSalesObjective={hasSalesObjective}
            className="py-3 px-4 mb-2"
          />
        )}
        <PostCardActionButtons
          post={post}
          postIndex={postIndex}
          postPromotable={postPromotable}
          postToggleSetterType={postToggleSetterType}
          artistId={artistId}
          toggleCampaign={toggleCampaign}
          updatePost={updatePost}
          hidePaidMetrics={hidePaidMetrics}
          isMissingDefaultLink={isMissingDefaultLink}
        />
      </div>
      {/* LOAD TRIGGER goes here */}
      {children}
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  postIndex: PropTypes.number.isRequired,
  updatePost: PropTypes.func.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
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
