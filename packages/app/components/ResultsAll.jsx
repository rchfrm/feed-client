// IMPORT PACKAGES
import React from 'react'

import produce from 'immer'

// IMPORT COMPONENTS
import SpendingSummaryLoader from '@/app/SpendingSummaryLoader'
import ResultsSingle from '@/app/ResultsSingle'
// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/ArtistContext'
// IMPORT CONSTANTS
import brandColors from '@/constants/brandColors'
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
// COPY
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/ResultsPageCopy'
// IMPORT STYLES
import resultsStyles from '@/app/Results.module.css'
import postStyles from '@/app/PostsPage.module.css'

const styles = {
  ...resultsStyles,
  ...postStyles,
}
// import styles from '@/app/Results.module.css'

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
      if (adMetrics.actions) {
        clicks += Number(adMetrics.actions.link_click) || 0
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


function DisabledResults({ disabledResults }) {
  if (!disabledResults.length) return null

  return (
    <div
      className={styles['disabled-results']}
      style={{
        backgroundColor: utils.hexToRGBA(brandColors.red, 0.1),
      }}
    >
      <h3>The posts below are being turned off...</h3>
      <p>This can take up to 15 minutes, in this time you can turn them back on by clicking the tick in the top right corner.</p>
      <ul className={styles.results}>{disabledResults}</ul>
    </div>
  )
}

function ResultsAll({ posts: postsObject, active, togglePost }) {
  const { artist } = React.useContext(ArtistContext)

  const title = active ? 'active posts.' : 'archive.'

  const getResultEl = (post, summary) => {
    const { id, promotion_enabled, attachments, adcreative, _metadata, message } = post
    const media = attachments && attachments.length ? attachments[0] : null
    const thumbnailSrc = _metadata.thumbnail_url
    const thumbnailSrcBackup = adcreative ? adcreative.thumbnail_url : ''
    return (
      <ResultsSingle
        className="col-span-6"
        key={id}
        active={active}
        id={id}
        promotion_enabled={promotion_enabled}
        togglePost={togglePost}
        summary={summary}
        media={media}
        thumbnailSrc={thumbnailSrc}
        thumbnailSrcBackup={thumbnailSrcBackup}
        postCaptionn={message}
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
    // No active with budget
    if (artist.daily_budget > 0) {
      return <MarkdownText markdown={copy.noActiveWithBudget} />
    }
    // No active and no budget
    return <MarkdownText markdown={copy.noActiveNoBudget} />
  }

  // If there are no archived posts, return Nothing
  if (!allResults.enabled.length && !active) {
    return null
  }
  return (
    <div>

      {/* Show Active Posts intro copy */}
      {active && (
        <>
          <MarkdownText className="h4--text" markdown={copy.intro} />
          <SpendingSummaryLoader />
        </>
      )}

      <div>
        <h2>{title}</h2>
      </div>

      <ul className={['lg:grid', 'grid-cols-12', 'gap-8', 'row-gap-0', styles.results].join(' ')}>{allResults.enabled}</ul>

      <DisabledResults disabledResults={allResults.disabled} />
    </div>
  )
}

export default ResultsAll
