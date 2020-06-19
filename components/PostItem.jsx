// IMPORT PACKAGES
import React from 'react'
// IMPORT ELEMENTS
import Error from '@/elements/Error'
// IMPORT COMPONENTS
import PostToggle from '@/PostToggle'
import PostMetaData from '@/PostMetaData'
import PostContents from '@/PostContents'
import PostMetrics from '@/PostMetrics'
import PostLink from '@/PostLink'
// IMPORT ASSETS
// IMPORT STYLES
import styles from '@/PostItem.module.css'

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
      <div className={[styles.topBar, styles.postSection].join(' ')}>
        <PostMetaData
          platform={post.platform}
          date={post.published_time}
          permalink={post.permalink_url}
        />
        {postPromotable && (
          <PostToggle
            post={post}
            togglePromotion={togglePromotion}
            promotionEnabled={post.promotion_enabled}
          />
        )}
      </div>

      {/* IMAGE AND CONTENTS */}
      <PostContents
        media={post.media}
        thumbnailSrc={post._metadata.thumbnail_url}
        caption={postCaption}
        className={!postCaption ? styles._noCaption : ''}
      />

      {/* METRICS */}
      <PostMetrics
        insights={post.insights}
        es={post.insights.engagement_score}
        status={post.promotion_enabled}
        postPromotable={postPromotable}
      />

      {/* Post Link */}
      {postPromotable && (
        <PostLink
          postId={post.id}
          postIndex={index}
          promotionEnabled={post.promotion_enabled}
          priorityDsp={post.priority_dsp}
          updateLink={updateLink}
          setError={setError}
        />
      )}

      <Error error={error} />

      {children}

    </li>
  )
}

export default PostItem
