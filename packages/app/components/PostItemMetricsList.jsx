import React from 'react'
import PropTypes from 'prop-types'

import * as utils from '@/helpers/utils'

import { ArtistContext } from '@/contexts/ArtistContext'

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

const PostItemMetricsList = ({ metrics, metricsContent, es }) => {
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
        {metricsArray.map(({ name, key, value }) => {
          // Parse value
          const parsedValue = key === 'spend'
            ? utils.formatCurrency(value, artistCurrency)
            : utils.abbreviateNumber(value)
          return <METRICS_ITEM key={key} title={name} value={parsedValue} />
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
  metrics: PropTypes.object.isRequired,
  metricsContent: PropTypes.array.isRequired,
  es: PropTypes.number,
}

PostItemMetricsList.defaultProps = {
  es: '-',
}


export default PostItemMetricsList
