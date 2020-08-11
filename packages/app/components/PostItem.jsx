// IMPORT PACKAGES
import React from 'react'
// IMPORT ELEMENTS
import Error from '@/elements/Error'
// IMPORT COMPONENTS
import PostItemTopBar from '@/app/PostItemTopBar'
import PostItemContents from '@/app/PostItemContents'
import PostItemMetrics from '@/app/PostItemMetrics'
import PostItemLink from '@/app/PostItemLink'
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
    is_promotable: postPromotable,
    promotion_status: promotionStatus,
    promotion_enabled: promotionEnabled,
    promotable_status: promotableStatus,
  } = post
  // POST CAPTION
  const postCaption = React.useMemo(() => {
    return post.short_message.join('\n')
  }, [post])
  // CLASSES
  const enabledClass = enabled ? styles._enabled : styles._disabled
  const promotableClass = postPromotable ? styles._promotable : styles._unpromotable

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
          thumbnailSrc={post._metadata.thumbnail_url}
          caption={postCaption}
          captionFull={post.message}
        />

        {/* METRICS */}
        <PostItemMetrics
          insights={post.insights}
          es={post.insights.engagement_score}
          status={post.promotion_enabled}
          postPromotable={postPromotable}
          promotionStatus={promotionStatus}
        />

        {/* POST LINK */}
        {postPromotable ? (
          <PostItemLink
            postId={post.id}
            postIndex={index}
            promotionEnabled={post.promotion_enabled}
            priorityDsp={post.priority_dsp}
            updateLink={updateLink}
            setError={setError}
          />
        ) : (
          <div className={[styles.postSection, styles.postUnpromotable, styles.postText].join(' ')}>
            <p style={{ transform: 'translateY(0.1em)' }}>Post not promotable</p>
          </div>
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
