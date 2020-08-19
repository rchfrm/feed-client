import React from 'react'
import PropTypes from 'prop-types'

import PostItemMetricsListItem from '@/app/PostItemMetricsListItem'

import { ArtistContext } from '@/contexts/ArtistContext'

import * as utils from '@/helpers/utils'

import styles from '@/app/PostItem.module.css'

const PostItemMetricsList = ({
  metrics,
  metricsContent,
  currentMetricsType,
  setDrilldown,
}) => {
  // CREATE ARRAY OF METRICS
  const maxMetrics = 4
  const metricsArray = React.useMemo(() => {
    const metricsFormatted = utils.getDataArray(metricsContent, metrics, true)
    return metricsFormatted
      // remove empty items from array
      .filter(({ value }) => value)
      // restrict number of items
      .slice(0, maxMetrics)
  }, [metrics, metricsContent])

  // CREATE SPACERS (for preserving height)
  const metricsSpacers = React.useMemo(() => {
    if (metricsArray.length === maxMetrics) return []
    const totalSpacers = maxMetrics - metricsArray.length
    return Array.from({ length: totalSpacers }, (v, i) => i)
  }, [metricsArray.length])

  // GET CURRENCY
  const { artistCurrency } = React.useContext(ArtistContext)

  return (
    <ul className={[
      'grid',
      'text-xs xxs:text-sm',
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
            setDrilldown={setDrilldown}
          />
        )
      })}
      {/* SPACERS */}
      {metricsSpacers.map((v) => {
        return <li key={v} className={styles.postMetricsItem}>&nbsp;</li>
      })}
    </ul>
  )
}


PostItemMetricsList.propTypes = {
  metrics: PropTypes.object.isRequired,
  metricsContent: PropTypes.array.isRequired,
  currentMetricsType: PropTypes.string,
  setDrilldown: PropTypes.func,
}

PostItemMetricsList.defaultProps = {
  currentMetricsType: '',
  setDrilldown: () => {},
}



export default PostItemMetricsList
