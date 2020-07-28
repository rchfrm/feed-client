// IMPORT PACKAGES
import React from 'react'
// IMPORT ELEMENTS
import Error from '@/elements/Error'
// IMPORT COMPONENTS
import PostItemTopBar from '@/app/PostItemTopBar'
import PostContents from '@/app/PostContents'
import PostMetrics from '@/app/PostMetrics'
import PostLink from '@/app/PostLink'
// IMPORT ASSETS
// IMPORT STYLES
import styles from '@/app/PostItem.module.css'

const PostItem = ({
  index,
  post,
  enabled,
  updateLink,
  togglePromotion,
  className = '',
  children = <></>,
}) => {
  // Errors
  const [error, setError] = React.useState(null)
  // PROMOTABLE STATE
  const { is_promotable: postPromotable } = post
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
        togglePromotion={togglePromotion}
        postPromotable={postPromotable}
      />
      {/* This wrapper hides the bottom of the link options */}
      <div className="overflow-hidden relative">
        {/* IMAGE AND CONTENTS */}
        <PostContents
          media={post.media}
          thumbnailSrc={post._metadata.thumbnail_url}
          caption={postCaption}
          captionFull={post.message}
        />

        {/* METRICS */}
        <PostMetrics
          insights={post.insights}
          es={post.insights.engagement_score}
          status={post.promotion_enabled}
          postPromotable={postPromotable}
        />

        {/* POST LINK */}
        {postPromotable ? (
          <PostLink
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
      </div>

      <Error error={error} />

      {children}

    </li>
  )
}

export default PostItem
