import React from 'react'
import PropTypes from 'prop-types'

import PostCardMetricsListItem from '@/app/PostCardMetricsListItem'

import { ArtistContext } from '@/contexts/ArtistContext'

import * as utils from '@/helpers/utils'

const PostCardMetricsList = ({
  metrics,
  metricsContent,
  metricsType,
  className,
}) => {
  // GET CURRENCY
  const { artistCurrency } = React.useContext(ArtistContext)

  // CREATE ARRAY OF METRICS
  const maxMetrics = 4
  const metricsArray = React.useMemo(() => {
    if (!metrics) return []
    const metricsFormatted = utils.getDataArray(metricsContent, metrics, { preserveRawNumber: true })
    return metricsFormatted
      // remove empty items from array
      .filter(({ value }) => value)
      // restrict number of items
      .slice(0, maxMetrics)
  }, [metrics, metricsContent])

  // GET CURRENCY
  const { artistCurrency } = React.useContext(ArtistContext)

  return (
    <ul
      className={[
        'border-solid border-2 border-green rounded-dialogue',
        className,
      ].join(' ')}
    >
      {/* METRICS */}
      {metricsArray.map(({ name, key, value }) => {
        // Parse value
        const parsedValue = key === 'spend'
          ? utils.formatCurrency(value, artistCurrency)
          : utils.formatNumber(value)
        // Get drilldown metrics
        const drilldownMetrics = metrics.drilldowns ? metrics.drilldowns[key] : null
        return (
          <PostCardMetricsListItem
            key={key}
            id={key}
            title={name}
            value={parsedValue}
            metricsType={metricsType}
            drilldownMetrics={drilldownMetrics}
            artistCurrency={artistCurrency}
            className="border-solid border-green border-b-2 last:border-none"
          />
        )
      })}
    </ul>
  )
}


PostCardMetricsList.propTypes = {
  metrics: PropTypes.object,
  metricsContent: PropTypes.array.isRequired,
  metricsType: PropTypes.string,
  className: PropTypes.string,
}

PostCardMetricsList.defaultProps = {
  metrics: null,
  metricsType: '',
  className: null,
}



export default React.memo(PostCardMetricsList)
