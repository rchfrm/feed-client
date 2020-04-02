// IMPORT PACKAGES
import React from 'react'
import Link from 'next/link'
import produce from 'immer'
// IMPORT COMPONENTS
import ResultsSingle from './ResultsSingle'
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Feed from './elements/Feed'
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
import brandColors from '../constants/brandColors'
// IMPORT HELPERS
import helper from './helpers/helper'
// COPY
import MarkdownText from './elements/MarkdownText'
import copy from '../copy/ResultsPageCopy'
// IMPORT STYLES
import resultsStyles from './Results.module.css'
import postStyles from './PostsPage.module.css'

const styles = {
  ...resultsStyles,
  ...postStyles,
}
// import styles from './Results.module.css'

const calculateSummary = (ads, isActive) => {
  const adValues = Object.values(ads)

  let amountSpent = 0
  let impressions = 0
  let engagement = 0
  let clicks = 0
  let engagementScore = 0
  const days = []

  const checkSAESIsNumber = (engagement, spend) => {
    if (spend === 0) {
      return '-'
    }
    return Math.round(engagement / spend)
  }

  // Loop through the metrics of each associated ad
  for (let i = 0; i < adValues.length; i += 1) {
    engagementScore += adValues[i].engagement_score || 0

    const { metrics } = adValues[i]
    const dates = Object.keys(metrics)
    for (let j = 0; j < dates.length; j += 1) {
      const date = dates[j]
      if (days.indexOf(date) === -1) {
        days.push(date)
      }
      const adMetrics = metrics[date]
      amountSpent += Number(adMetrics.spend) || 0
      impressions += Number(adMetrics.impressions) || 0
      if (adMetrics.actions) {
        engagement += Number(adMetrics.actions.post_engagement) || 0
      }
      if (adMetrics.outbound_clicks) {
        clicks += Number(adMetrics.outbound_clicks.outbound_click) || 0
      }
    }
  }

  if (!isActive && amountSpent === 0) {
    return false
  }
  return {
    amountSpent: amountSpent.toFixed(2),
    impressions,
    engagement,
    clicks,
    SAES: checkSAESIsNumber(engagementScore, amountSpent),
    days,
  }
}


function NoActive() {
  const { artist } = React.useContext(ArtistContext)

  if (artist.daily_budget > 0) {
    return (
      <div className="ninety-wide" style={{ marginBottom: '2em' }}>
        <h3>
          <Feed />
          {' '}
          is setting up your posts for promotion.
        </h3>
        <p>
          There may be a delay whilst posts await approval, once promotions have started you'll be able to see your results here.
        </p>
      </div>
    )
  }
  return (
    <div className="ninety-wide" style={{ marginBottom: '2em' }}>
      <h3>
        <Feed />
        {' '}
        isn't currently promoting any of your posts,&nbsp;
        <Link href={ROUTES.POSTS}><a>set a daily budget</a></Link>
        {' '}
        to get
        it started.
      </h3>
    </div>
  )
}

export const initialAlertState = {
  contents: undefined,
  responseExpected: true,
  confirmationText: 'Yes.',
  rejectionText: 'No.',
  response: false,
}

export const alertReducer = (alertState, alertAction) => {
  switch (alertAction.type) {
    case 'show-alert':
      return {
        ...alertState,
        contents: alertAction.payload.contents,
      }

    case 'reset-alert':
      return initialAlertState

    case 'set-positive-response':
      return {
        ...alertState,
        contents: undefined,
        response: true,
      }

    default:
      throw new Error(`Could not find ${alertAction.type} in alertReducer`)
  }
}


function DisabledResults({ disabledResults }) {
  if (!disabledResults.length) return null

  return (
    <div
      className={styles['disabled-results']}
      style={{
        backgroundColor: helper.hexToRGBA(brandColors.red, 0.1),
      }}
    >
      <h3>The posts below are being turned off...</h3>
      <p>This can take up to 15 minutes, in this time you can turn them back on by clicking the tick in the top right corner.</p>
      <ul className={styles.results}>{disabledResults}</ul>
    </div>
  )
}

function ResultsAll({ posts: postsObject, active, setPosts }) {
  const { artist } = React.useContext(ArtistContext)

  const title = active ? 'active posts.' : 'archive.'

  const getResultEl = (post, summary) => {
    return (
      <ResultsSingle
        key={post.id}
        active={active}
        attachments={post.attachments}
        id={post.id}
        priority_dsp={post.priority_dsp || artist.priority_dsp}
        promotion_enabled={post.promotion_enabled}
        setPosts={setPosts}
        summary={summary}
        thumbnail={post._metadata.thumbnail_url}
      />
    )
  }

  // Sort results into enabled and disabled
  const allResults = React.useMemo(() => {
    const posts = Object.values(postsObject)
    return posts.reduce((postsSorted, post) => {
      const { ads, promotion_enabled } = post
      const summary = calculateSummary(ads, active)
      if (!summary) return postsSorted
      if (active && !promotion_enabled) {
        return produce(postsSorted, draft => {
          const postEl = getResultEl(post, summary)
          draft.disabled.push(postEl)
        })
      }
      return produce(postsSorted, draft => {
        const postEl = getResultEl(post, summary)
        draft.enabled.push(postEl)
      })
    }, {
      enabled: [],
      disabled: [],
    })
  }, [postsObject])


  // If there are no active posts, return NoActive
  if (!allResults.enabled.length && active) {
    return <NoActive />
  }

  // If there are no archived posts, return Nothing
  if (!allResults.enabled.length && !active) {
    return null
  }
  return (
    <div style={{ width: '100%' }}>

      {/* Show Active Posts intro copy */}
      {active && <MarkdownText className="ninety-wide  h4--text" markdown={copy.intro} />}

      <div className="ninety-wide">
        <h2>{title}</h2>
      </div>

      <ul className={styles.results}>{allResults.enabled}</ul>

      <DisabledResults disabledResults={allResults.disabled} />
    </div>
  )
}

export default ResultsAll
