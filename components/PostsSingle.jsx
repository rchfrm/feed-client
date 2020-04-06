// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import ButtonToggle from './elements/ButtonToggle'
import Icon from './elements/Icon'
import SquareImage from './elements/SquareImage'
import Error from './elements/Error'
// IMPORT PAGES
import PostLinkAddUrl from './PostLinkAddUrl'
import PostLinkOptions from './PostLinkOptions'
import PostInsight from './PostInsight'
// IMPORT ASSETS
// IMPORT CONSTANTS
import dataSourceDetails from '../constants/dataSources'
import brandColors from '../constants/brandColors'
// IMPORT HELPERS
import helper from './helpers/helper'
import MediaFallback from './elements/MediaFallback'
// IMPORT STYLES
import styles from './PostsPage.module.css'


function PermalinkAndToggle({
  post,
  togglePromotion,
}) {
  // Alter appearance based on promotion status
  const { promotion_enabled } = post
  const appearance = {
    platformIconColor: promotion_enabled ? dataSourceDetails[post.platform].color : brandColors.grey,
    toggleIcon: promotion_enabled ? 'tick' : 'empty',
    toggleIconColor: promotion_enabled ? brandColors.white : brandColors.grey,
  }

  return (
    <div
      className={styles.permalinkAndToggle}
      style={{ padding: '1.5em' }}
    >

      {/* Display platform icon, publish date and time, linking to post permalink */}
      <div className={styles['post-meta']}>

        <Icon
          version={post.platform}
          color={appearance.platformIconColor}
          width="20"
        />
        <a
          className={styles.a}
          href={post.permalink_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {moment(post.published_time).format('D MMM YYYY [at] HH[:]mm')}
        </a>

      </div>

      {/* Display toggle option for posts */}
      <div className={styles['post-toggle']}>
        <ButtonToggle
          onClick={() => togglePromotion(post.id)}
          state={promotion_enabled ? 'on' : 'off'}
        />
      </div>

    </div>
  )
}

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
        {helper.abbreviateNumber(es)}
      </div>
    </div>
  )
}


function PostSingle({
  index,
  post,
  singular: isSingular,
  updateLink,
  togglePromotion,
}) {
  // IMPORT CONTEXTS
  const { artist } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS
  // Is the post selected for promotion
  const selected = post.promotion_enabled ? 'selected' : 'deselected'
  // Is there just one post
  const singular = isSingular ? 'singular' : ''

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
  // Media component and thumbnail
  const [media, setMedia] = React.useState(<MediaFallback />)
  // END DEFINE STATES

  // FUNCTIONS
  const handleError = () => {
    setMedia(<MediaFallback />)
  }

  // DISPLAY CORRECT MEDIA
  const renderMedia = React.useCallback(mediaLink => {
    let message // TODO : Implement a way to display title and alt attributes
    return helper.generateMediaHTML(mediaLink, post._metadata.thumbnail_url, message, handleError)
  }, [post._metadata.thumbnail_url])
  // END DISPLAY CORRECT MEDIA

  React.useEffect(() => {
    const component = renderMedia(post.media)
    setMedia(component)
  }, [post.media, renderMedia])

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

  return (
    <li
      className={`tile ${styles[selected]} ${singular}`}
      style={{ padding: 0 }}
    >

      <PermalinkAndToggle post={post} togglePromotion={togglePromotion} />

      {/* Media */}
      <div style={{ flex: 'auto' }}>
        <div className={styles['post-media']}>
          <SquareImage media={media} />
          {/* TODO : Adjust font size of post message so it always fills three lines in height */}
          <PostMessage message={post.short_message} />
        </div>
      </div>

      {/* Post Link */}
      <div className={styles['post-link']} style={{ backgroundColor: brandColors.grey }}>

        <p>Where should people go when they click this post?</p>

        <PostLinkOptions
          setError={setError}
          postId={post.id}
          currentLink={currentLink}
          setCurrentLink={setCurrentLink}
          chosenLink={chosenLink}
          setChosenLink={setChosenLink}
          index={index}
          setAddUrl={setAddUrl}
          updateLink={updateLink}
        />

        {/* Show add URL dialogue if triggered */}
        {addUrl && (
          <PostLinkAddUrl
            setError={setError}
            postId={post.id}
            index={index}
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
            setChosenLink={setChosenLink}
            setAddUrl={setAddUrl}
            updateLink={updateLink}
          />
        )}

        <Error error={error} />

      </div>

      {/* Post Metrics */}
      <PostMetrics es={post.insights.engagement_score} orderedInsights={orderedInsights} />

    </li>
  )
}

export default PostSingle
