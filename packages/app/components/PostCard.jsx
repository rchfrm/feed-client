import React from 'react'
import PropTypes from 'prop-types'

import PostCardHeader from '@/app/PostCardHeader'
import PostCardMedia from '@/app/PostCardMedia'
import PostCardScore from '@/app/PostCardScore'
import PostCardToggles from '@/app/PostCardToggles'
import PostCardActionButtons from '@/app/PostCardActionButtons'

const PostCard = ({
  post,
  postIndex,
  updateLink,
  togglePromotion,
  postToggleSetterType,
  isMissingDefaultLink,
  className,
  children,
}) => {
  console.log('post', post)
  // Extract some variables
  const { postPromotable } = post
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <PostCardHeader
        platform={post.platform}
        date={post.publishedTime}
        permalink={post.permalink}
        className="mb-2"
      />
      <PostCardMedia
        media={post.media}
        thumbnails={post.thumbnails}
        caption={post.message}
        className="mb-2"
      />
      <PostCardScore
        scorePaid={post.paidMetrics.engagementScore}
        scoreOrganic={post.organicMetrics.engagementScore}
        className="py-2 px-3 mb-2"
      />
      <PostCardToggles
        postId={post.id}
        togglesClassName="py-3 px-3 mb-2 last:mb-0"
        className="mb-2"
      />
      <PostCardActionButtons
        post={post}
        postPromotable={postPromotable}
      />
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  postIndex: PropTypes.number.isRequired,
  updateLink: PropTypes.func.isRequired,
  togglePromotion: PropTypes.func.isRequired,
  postToggleSetterType: PropTypes.string.isRequired,
  isMissingDefaultLink: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
}

PostCard.defaultProps = {
  className: null,
  children: null,
}

export default PostCard
