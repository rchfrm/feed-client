// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
import PostToggle from '@/PostToggleNew'
import PostMetaData from '@/PostMetaData'
import PostContents from '@/PostContents'
import PostMetrics from '@/PostMetrics'
import PostLink from '@/PostLink'

// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/Artist'
// IMPORT ELEMENTS
import Error from '@/elements/Error'
// IMPORT ASSETS
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
// IMPORT STYLES
import styles from '@/PostItem.module.css'


function PostItem({
  index,
  post,
  enabled,
  updateLink,
  togglePromotion,
  className = '',
  children = <></>,
}) {
  // IMPORT CONTEXTS
  const { artist } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS
  // DEFINE STATES
  // Track the link that will be ads using the asset, if there isn't a
  // priority set at the asset level, use the artist priority instead
  const initialCurrentLink = post.priority_dsp || artist.priority_dsp
  const [currentLink, setCurrentLink] = React.useState(initialCurrentLink)
  // Should the add url 'alert' be shown
  const [addUrl, setAddUrl] = React.useState(false)
  // Define state to store the chosen link
  const [chosenLink, setChosenLink] = React.useState(currentLink)
  // Errors
  const [error, setError] = React.useState(null)

  // PROMOTABLE STATE
  const { is_promotable: postPromotable } = post

  // POST CAPTION
  const postCaption = React.useMemo(() => {
    return post.short_message.join('\n')
  }, [post])

  // SELECTED CLASS
  const enabledClass = React.useMemo(() => {
    return enabled ? styles._enabled : styles._disabled
  }, [enabled])

  // console.log('post', post)

  return (
    <li
      className={[styles.postItem, enabledClass, className].join(' ')}
    >
      {/* TOP BAR */}
      <div className={[styles.topBar, styles.postSection].join(' ')}>
        <PostMetaData
          platform={post.platform}
          date={post.published_time}
          permalink={post.permalink_url}
        />
        <PostToggle
          post={post}
          togglePromotion={togglePromotion}
          promotionEnabled={post.promotion_enabled}
        />
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
