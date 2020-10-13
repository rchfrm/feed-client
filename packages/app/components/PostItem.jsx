// IMPORT PACKAGES
import React from 'react'
// IMPORT ELEMENTS
import Error from '@/elements/Error'
// IMPORT COMPONENTS
import PostItemTopBar from '@/app/PostItemTopBar'
import PostItemContents from '@/app/PostItemContents'
import PostItemMetrics from '@/app/PostItemMetrics'
import PostItemLink from '@/app/PostItemLink'
import PostItemStatusMessage from '@/app/PostItemStatusMessage'
import PostItemDisableWarning from '@/app/PostItemDisableWarning'
// IMPORT ASSETS
// IMPORT STYLES
import styles from '@/app/PostItem.module.css'

const PostItem = ({
  index,
  post,
  enabled,
  updateLink,
  togglePromotion,
  postToggleSetter,
  className = '',
  children = <></>,
}) => {
  // Errors
  const [error, setError] = React.useState(null)
  // EXTRACT POST DATA
  const {
    priorityDsp,
    postPromotable,
    promotionStatus,
    promotionEnabled,
    promotableStatus,
  } = post
  // POST CAPTION
  const postCaption = React.useMemo(() => {
    return post.shortMessage.join('\n')
  }, [post])
  // CLASSES
  const enabledClass = enabled || promotionStatus === 'archived' ? styles._enabled : styles._disabled
  const promotableClass = postPromotable ? styles._promotable : styles._unpromotable

  // Is running ad turning off?
  const turningOffRunning = promotionStatus === 'active' && !promotionEnabled

  return (
    <li
      className={[styles.postItem, enabledClass, promotableClass, className].join(' ')}
    >
      {/* TOP BAR */}
      <PostItemTopBar
        post={post}
        promotionEnabled={promotionEnabled}
        promotableStatus={promotableStatus}
        togglePromotion={togglePromotion}
        postPromotable={postPromotable}
        promotionStatus={promotionStatus}
      />
      {/* This wrapper hides the bottom of the link options */}
      <div className="overflow-hidden relative">
        {/* IMAGE AND CONTENTS */}
        <PostItemContents
          media={post.media}
          thumbnails={post.thumbnails}
          caption={postCaption}
          captionFull={post.message}
          promotionStatus={promotionStatus}
        />

        {/* METRICS */}
        <PostItemMetrics
          postType={post.postType}
          organicMetrics={post.organicMetrics}
          paidMetrics={post.paidMetrics}
          organicEs={post.organicMetrics.engagementScore}
          paidEs={post.paidMetrics.engagementScore}
          status={promotionEnabled}
          postPromotable={postPromotable}
          promotionStatus={promotionStatus}
        />

        {/* POST LINK */}
        {postPromotable && !turningOffRunning && (
          <PostItemLink
            postId={post.id}
            postIndex={index}
            promotionEnabled={promotionEnabled}
            promotionStatus={promotionStatus}
            priorityDsp={priorityDsp}
            updateLink={updateLink}
            setError={setError}
          />
        )}

        {turningOffRunning && (
          <PostItemStatusMessage text="Turning post off" className="bg-red" />
        )}

        {/* NOT PROMOTABLE WARNING */}
        {!postPromotable && (
          <PostItemStatusMessage text="Post not promotable" />
        )}

        {/* DISABLE ACTIVE POST WARNING */}
        {postPromotable && promotionStatus === 'active' && (
          <PostItemDisableWarning
            postId={post.id}
            postStatus={promotionStatus}
            promotionEnabled={promotionEnabled}
            promotableStatus={promotableStatus}
            togglePromotion={togglePromotion}
            postToggleSetter={postToggleSetter}
          />
        )}

      </div>

      <Error error={error} />

      {children}

    </li>
  )
}

export default PostItem
