
// IMPORT PACKAGES
import React from 'react'
// IMPORT ELEMENTS
import Error from '@/elements/Error'
// IMPORT COMPONENTS
import PostToggle from '@/PostToggleNew'
import PostMetaData from '@/PostMetaData'
import PostContents from '@/PostContents'
import PostMetrics from '@/PostMetrics'
import PostLink from '@/PostLink'
// IMPORT ASSETS
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
import ExternalMedia from '@/elements/ExternalMedia'
// IMPORT STYLES
import styles from '@/PostItem.module.css'


function PostMessage({
  message,
}) {
  if (!message.length) return null
  return (
    <div className={styles['post-message']}>
      <p className={styles.p}>
        "
        {message.join('\n')}
        "
      </p>
    </div>
  )
}

function PostMetrics({
  orderedInsights,
  es,
}) {
  return (
    <div className={styles['post-metrics']}>
      <div className={styles['post-insights']}>
        <PostInsight title={orderedInsights[0].name} number={orderedInsights[0].value} />
        <PostInsight title={orderedInsights[1].name} number={orderedInsights[1].value} />
      </div>

      <div className={styles['post-es']}>
        {utils.abbreviateNumber(es)}
      </div>
    </div>
  )
}


function PostItem({
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

  // Oder post insights, so that highest figures are shown first
  const orderInsights = (insights) => {
    const insightNames = Object.keys(insights)
    const insightsArr = insightNames.reduce((arr, name) => {
      if (
        name.indexOf('impression') === -1
        && name !== 'engagement_score'
        && name.indexOf('post') === -1
      ) {
        return [...arr, {
          name,
          value: insights[name],
        }]
      }
      return arr
    }, [])

    return insightsArr.sort((a, b) => {
      return b.value - a.value
    })
  }
  const orderedInsights = orderInsights(post.insights)

  // POST CAPTION
  const postCaption = React.useMemo(() => {
    return post.short_message.join('\n')
  }, [post])
  // SELECTED CLASS
  const enabledClass = React.useMemo(() => {
    return enabled ? styles._enabled : styles._disabled
  }, [enabled])

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
      />

      {/* Media */}
      <div style={{ flex: 'auto' }}>
        <div className={styles['post-media']}>
          <ExternalMedia
            mediaSrc={post.media}
            thumbnailSrc={post._metadata.thumbnail_url}
            title={post.short_message.join('\n')}
          />
          {/* TODO : Adjust font size of post message so it always fills three lines in height */}
          <PostMessage message={post.short_message} />
        </div>
      </div>

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

      {/* Post Metrics */}
      <PostMetrics es={post.insights.engagement_score} orderedInsights={orderedInsights} />

      {children}

    </li>
  )
}

export default PostItem
