import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/PostItem.module.css'

const visibleInsights = {
  reach: {
    index: 1,
    title: 'Reach',
  },
  engagement_score: {
    index: 2,
    title: 'Engagement',
  },
  impressions: {
    index: 3,
    title: 'Impressions',
  },
  taps_forward: {
    index: 4,
    title: 'Taps forward',
  },
}

const METRICS_ITEM = ({ title, value, className }) => {
  return (
    <li
      className={[styles.postMetricsItem, className].join(' ')}
      key={title}
    >
      <span className={styles.title}>{title}: </span>
      <div className={styles.line} />
      <span className={styles.value}>{value}</span>
    </li>
  )
}

const PostMetrics = ({ insights, es, status, postPromotable }) => {
  // Create array of insights
  const insightsArray = React.useMemo(() => {
    return Object.entries(insights).reduce((arr, [title, value]) => {
      const insightConfig = visibleInsights[title]
      // Stop if insight should not be included
      if (!insightConfig) return arr
      // Put insight into correct position in array
      const { index, title: titleTranslated } = insightConfig
      arr[index] = { title: titleTranslated, value }
      return arr
    }, [])
  }, [insights])

  return (
    <>
      <ul className={[
        'grid',
        'grid-cols-2',
        'col-gap-4',
        'md:col-gap-5',
        styles.postSection,
        styles.postMetrics,
      ].join(' ')}
      >
        {postPromotable ? (
          // Promotable
          <>
            {/* Status metric */}
            {/* <METRICS_ITEM title="Status" value={status ? 'Active' : 'Disabled'} className="col-span-2" /> */}
            {/* Insights metrics */}
            {insightsArray.map(({ title, value }) => {
              return <METRICS_ITEM key={title} title={title} value={value} />
            })}
          </>
        ) : (
          // Not promotable
          <li className={[styles.postMetricsItem, styles.postMetricsUnpromotable, 'col-span-2'].join(' ')}>
            <strong>Post not promotable</strong>
          </li>
        )}
      </ul>
      {postPromotable && (
        <div className={[styles.postSection, styles.postEsScore].join(' ')}>
          <p className={styles.postEsScorePara}>
            <span>Score:</span>
            <strong>{es}</strong>
          </p>
        </div>
      )}
    </>
  )
}

METRICS_ITEM.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
}

METRICS_ITEM.defaultProps = {
  className: '',
}


PostMetrics.propTypes = {
  insights: PropTypes.object.isRequired,
  es: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,
  postPromotable: PropTypes.bool.isRequired,
}

export default PostMetrics
