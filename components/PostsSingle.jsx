
// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Button from './elements/Button'
import Icon from './elements/Icon'
import SquareImage from './elements/SquareImage'
import Error from './elements/Error'
// IMPORT PAGES
import { AddUrl, LinkOptions } from './PostLink'
import PostInsight from './PostInsight'
// IMPORT ASSETS
// IMPORT CONSTANTS
import dataSourceDetails from '../constants/dataSources'
import brandColours from '../constants/brandColours'
// IMPORT HELPERS
import helper from './helpers/helper'
import MediaFallback from './elements/MediaFallback'
// IMPORT STYLES

function Post({ index, post, singular: isSingular, setPosts, togglePromotion }) {
  // IMPORT CONTEXTS
  const { artist } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS
  // Is the post selected for promotion
  const selected = post.promotion_enabled ? 'selected' : 'deselected'
  // Is there just one post
  const singular = isSingular ? 'singular' : ''
  // END REDEFINE PROPS AS VARIABLES

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
  const orderInsights = insights => {
    const insightNames = Object.keys(insights)
    const insightsArr = []

    for (let i = 0; i < insightNames.length; i += 1) {
      const insightName = insightNames[i]
      if (
        insightName.indexOf('impression') === -1
        && insightName !== 'engagement_score'
        && insightName.indexOf('post') === -1
      ) {
        insightsArr.push({
          name: insightName,
          value: insights[insightName],
        })
      }
    }

    return insightsArr.sort((a, b) => {
      return b.value - a.value
    })
  }
  const orderedInsights = orderInsights(post.insights)

  // Show AddUrl component if addUrl is true
  const returnAddUrl = () => {
    if (addUrl) {
      return (
        <AddUrl
          setError={setError}
          postId={post.id}
          index={index}
          currentLink={currentLink}
          setCurrentLink={setCurrentLink}
          setChosenLink={setChosenLink}
          setAddUrl={setAddUrl}
          setPosts={setPosts}
        />
      )
    }
  }
  // END FUNCTIONS

  return (
    <li
      className={`tile ${selected} ${singular}`}
      style={{ padding: 0 }}
    >

      <PermalinkAndToggle post={post} togglePromotion={togglePromotion} />

      {/* Media */}
      <div style={{ flex: 'auto' }}>
        <div className="post-media">
          <SquareImage media={media} />
          {/* TODO : Adjust font size of post message so it always fills three lines in height */}
          <PostMessage message={post.short_message} />
        </div>
      </div>

      {/* Post Link */}
      <div className="post-link" style={{ backgroundColor: brandColours.grey.hex }}>

        <p>Where should people go when they click this post?</p>

        <LinkOptions
          setError={setError}
          postId={post.id}
          currentLink={currentLink}
          setCurrentLink={setCurrentLink}
          chosenLink={chosenLink}
          setChosenLink={setChosenLink}
          index={index}
          setAddUrl={setAddUrl}
          setPosts={setPosts}
        />

        {returnAddUrl()}

        <Error error={error} />

      </div>

      {/* Post Metrics */}
      <PostMetrics es={post.insights.engagement_score} orderedInsights={orderedInsights} />

    </li>
  )
}

export default Post

function PermalinkAndToggle(props) {
// REDEFINE PROPS AS VARIABLES
  const { post } = props
  const { togglePromotion } = props
  const status = post.promotion_enabled
  // END REDEFINE PROPS AS VARIABLES

  // ALTER APPEARANCE BASED ON PROMOTION STATUS
  const appearance = {
    platformIconColour: status ? dataSourceDetails[post.platform].colour : brandColours.grey.hex,
    toggleIcon: status ? 'tick' : 'empty',
    toggleIconColour: status ? brandColours.white.hex : brandColours.grey.hex,
  }
  // END ALTER APPEARANCE BASED ON PROMOTION STATUS

  return (
    <div
      className="flex-row"
      style={{ padding: '1.5em' }}
    >

      {/* Display platform icon, publish date and time, linking to post permalink */}
      <div className="post-meta">

        <Icon
          version={post.platform}
          color={appearance.platformIconColour}
          width="20"
        />
        <a
          href={post.permalink_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {moment(post.published_time).format('D MMM YYYY [at] HH[:]mm')}
        </a>

      </div>

      {/* Display toggle option for posts */}
      <div className="post-toggle">
        <Button
          version="toggle"
          onClick={togglePromotion}
        >
          <Icon
            version={appearance.toggleIcon}
            color={appearance.toggleIconColour}
            width="18"
            data={post.id}
          />

        </Button>

      </div>

    </div>
  )
}

function PostMessage(props) {
// REDEFINE PROPS AS VARIABLES
  const { message } = props
  // END REDEFINE PROPS AS VARIABLES

  if (message.length > 0) {
    return (
      <div className="post-message">
        <p>
          "
          {message.join('\n')}
          "
        </p>
      </div>
    )
  }

  return null
}

function PostMetrics(props) {
// REDEFINE PROPS AS VARIABLES
  const { orderedInsights } = props
  const { es } = props
  // END REDEFINE PROPS AS VARIABLES

  return (
    <div className="post-metrics">

      <div className="post-insights">

        <PostInsight title={orderedInsights[0].name} number={orderedInsights[0].value} />
        <PostInsight title={orderedInsights[1].name} number={orderedInsights[1].value} />

      </div>

      <div className="post-es">

        {helper.abbreviateNumber(es)}

      </div>

    </div>
  )
}
