import React from 'react'
import PropTypes from 'prop-types'

import PostItemMetricsListItem from '@/app/PostItemMetricsListItem'

import { ArtistContext } from '@/contexts/ArtistContext'

import * as utils from '@/helpers/utils'

import styles from '@/app/PostItem.module.css'

const PostItemMetricsList = ({ metrics, metricsContent, es, currentMetricsType }) => {
  // CREATE ARRAY OF METRICS
  const maxMetrics = 4
  const metricsArray = React.useMemo(() => {
    console.log('metrics', metrics)
    const metricsFormatted = utils.getDataArray(metricsContent, metrics, true)
    console.log('metricsFormatted', metricsFormatted)
    return metricsFormatted
      // remove empty items from array
      .filter(({ value }) => value)
      // restrict number of items
      .slice(0, maxMetrics)
  }, [metrics, metricsContent])
  console.log('metricsArray', metricsArray)

  // CREATE SPACERS (for preserving height)
  const metricsSpacers = React.useMemo(() => {
    if (metricsArray.length === maxMetrics) return []
    const totalSpacers = maxMetrics - metricsArray.length
    return Array.from({ length: totalSpacers }, (v, i) => i)
  }, [metricsArray.length])

  // GET CURRENCY
  const { artistCurrency } = React.useContext(ArtistContext)

  return (
    <>
      <ul className={[
        'xs:grid',
        'text-sm',
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
        {metricsArray.map(({ name, key, value }) => {
          // Parse value
          const parsedValue = key === 'spend'
            ? utils.formatCurrency(value, artistCurrency)
            : utils.abbreviateNumber(value)
          const drilldownMetrics = metrics.drilldowns ? metrics.drilldowns[key] : null
          return (
            <PostItemMetricsListItem
              key={key}
              id={key}
              title={name}
              value={parsedValue}
              currentMetricsType={currentMetricsType}
              drilldownMetrics={drilldownMetrics}
            />
          )
        })}
        {/* SPACERS */}
        {metricsSpacers.map((v) => {
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


PostItemMetricsList.propTypes = {
  metrics: PropTypes.object.isRequired,
  metricsContent: PropTypes.array.isRequired,
  es: PropTypes.number,
  currentMetricsType: PropTypes.string.isRequired,
}

PostItemMetricsList.defaultProps = {
  es: '-',
}


export default PostItemMetricsList
