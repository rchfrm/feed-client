import React from 'react'
import PropTypes from 'prop-types'

import PostCardMetricsListItem from '@/app/PostCardMetricsListItem'

import { ArtistContext } from '@/contexts/ArtistContext'

import * as utils from '@/helpers/utils'

import styles from '@/app/PostCardMetricsList.module.css'

const PostCardMetricsList = ({
  metrics,
  metricsContent,
  currentMetricsType,
  setDrilldown,
}) => {
  console.log('metricsContent', metricsContent)
  // CREATE ARRAY OF METRICS
  const maxMetrics = 4
  const metricsArray = React.useMemo(() => {
    if (!metrics) return []
    const metricsFormatted = utils.getDataArray(metricsContent, metrics, { preserveRawNumber: true })
    console.log('metricsFormatted', metricsFormatted)
    return metricsFormatted
      // remove empty items from array
      .filter(({ value }) => value)
      // restrict number of items
      .slice(0, maxMetrics)
  }, [metrics, metricsContent])

  // // CREATE SPACERS (for preserving height)
  // const metricsSpacers = React.useMemo(() => {
  //   if (metricsArray.length === maxMetrics) return []
  //   const totalSpacers = maxMetrics - metricsArray.length
  //   return Array.from({ length: totalSpacers }, (v, i) => i)
  // }, [metricsArray.length])

  // GET CURRENCY
  const { artistCurrency } = React.useContext(ArtistContext)

  return (
    <ul
      className={[
        'grid',
        'md:grid-cols-2',
        'border-solid border-2 border-green rounded-dialogue',
      ].join(' ')}
    >
      {/* METRICS */}
      {metricsArray.map(({ name, key, value }) => {
        // Parse value
        const parsedValue = key === 'spend'
          ? utils.formatCurrency(value, artistCurrency)
          : utils.abbreviateNumber(value)
        // Get drilldown metrics
        const drilldownMetrics = metrics.drilldowns ? metrics.drilldowns[key] : null
        return (
          <PostCardMetricsListItem
            key={key}
            id={key}
            title={name}
            value={parsedValue}
            currentMetricsType={currentMetricsType}
            drilldownMetrics={drilldownMetrics}
            setDrilldown={setDrilldown}
            className={styles.gridCell}
          />
        )
      })}
      {/* SPACERS */}
      {/* {metricsSpacers.map((v) => {
        return <li key={v} className="">&nbsp;</li>
      })} */}
    </ul>
  )
}


PostCardMetricsList.propTypes = {
  metrics: PropTypes.object,
  metricsContent: PropTypes.array.isRequired,
  currentMetricsType: PropTypes.string,
  setDrilldown: PropTypes.func,
}

PostCardMetricsList.defaultProps = {
  metrics: null,
  currentMetricsType: '',
  setDrilldown: () => {},
}



export default React.memo(PostCardMetricsList)
