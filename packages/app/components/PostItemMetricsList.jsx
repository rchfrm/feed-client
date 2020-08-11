import React from 'react'
import PropTypes from 'prop-types'

import * as utils from '@/helpers/utils'

import styles from '@/app/PostItem.module.css'

const METRICS_ITEM = ({ title, value, className }) => {
  return (
    <li
      className={[styles.postMetricsItem, className].join(' ')}
      key={title}
    >
      <span className={styles.title}>{title}:</span>
      <span className={styles.value}>{value}</span>
    </li>
  )
}

const PostItemMetricsList = ({ insights, visibleInsights, es }) => {
  // Create array of insights
  const maxInsights = 4
  const insightsArray = React.useMemo(() => {
    return Object.entries(insights).reduce((arr, [title, value]) => {
      const insightConfig = visibleInsights[title]
      // Stop if insight should not be included
      if (!insightConfig || !value) return arr
      // Put insight into correct position in array
      const { index, title: titleTranslated } = insightConfig
      arr[index] = { title: titleTranslated, value }
      return arr
    }, [])
      // remove empty items from array
      .filter(val => val)
      // restrict number of items
      .slice(0, maxInsights)
  }, [insights, visibleInsights])
  // Create spacers
  const insightsSpacers = React.useMemo(() => {
    if (insightsArray.length === maxInsights) return []
    const totalSpacers = maxInsights - insightsArray.length
    return Array.from({ length: totalSpacers }, (v, i) => i)
  }, [insightsArray.length])
  return (
    <>
      <ul className={[
        'grid',
        'grid-cols-2',
        'col-gap-6',
        'xxs:col-gap-12',
        'xs:col-gap-6',
        'sm:col-gap-8',
        styles.postSection,
        styles.postMetrics,
      ].join(' ')}
      >
        {/* METRICS */}
        {insightsArray.map(({ title, value }) => {
          const parsedValue = utils.abbreviateNumber(value)
          return <METRICS_ITEM key={title} title={title} value={parsedValue} />
        })}
        {/* SPACERS */}
        {insightsSpacers.map((v) => {
          return <li key={v} className={styles.postMetricsItem}>&nbsp;</li>
        })}
      </ul>
      <div className={[styles.postSection, styles.postEsScore, styles.postText].join(' ')}>
        <p className={styles.postEsScorePara}>
          <span>Score</span>
          <strong>{es}</strong>
        </p>
      </div>
    </>
  )
}

METRICS_ITEM.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  className: PropTypes.string,
}

METRICS_ITEM.defaultProps = {
  className: '',
}

PostItemMetricsList.propTypes = {
  insights: PropTypes.object.isRequired,
  visibleInsights: PropTypes.object.isRequired,
  es: PropTypes.number.isRequired,
}

export default PostItemMetricsList
