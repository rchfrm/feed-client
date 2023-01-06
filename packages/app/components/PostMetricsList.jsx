import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PostMetricsListItem from '@/app/PostMetricsListItem'
import * as utils from '@/helpers/utils'

const PostMetricsList = ({
  metrics,
  content,
  className,
}) => {
  const { artistCurrency } = React.useContext(ArtistContext)

  const maxMetrics = 6
  const metricsArray = React.useMemo(() => {
    if (! metrics) {
      return []
    }

    const metricsFormatted = utils.getDataArray(content, metrics, { preserveRawNumber: true })
      .filter(({ value }) => value)
      .slice(0, maxMetrics)

    return metricsFormatted
  }, [metrics, content])

  if (! metricsArray.length) {
    return (
      <div
        className={[
          'border-solid border-2 border-green rounded-dialogue',
          'p-3',
          className,
        ].join(' ')}
      >
        <p className="mb-0">Paid metrics will appear here soon</p>
      </div>
    )
  }

  return (
    <ul
      className={[
        'border-solid border-2 border-green rounded-dialogue',
        className,
      ].join(' ')}
    >
      {metricsArray.map(({ name, key, value }) => {
        const parsedValue = key === 'spend'
          ? utils.formatCurrency(value, artistCurrency)
          : utils.formatNumber(value)

        const drilldownMetrics = metrics.drilldowns ? metrics.drilldowns[key] : null
        return (
          <PostMetricsListItem
            key={key}
            title={name}
            value={parsedValue}
            drilldownMetrics={drilldownMetrics}
            artistCurrency={artistCurrency}
            className="border-solid border-green border-b-2 last:border-none"
          />
        )
      })}
    </ul>
  )
}

PostMetricsList.propTypes = {
  metrics: PropTypes.object,
  content: PropTypes.array.isRequired,
  className: PropTypes.string,
}

PostMetricsList.defaultProps = {
  metrics: null,
  className: null,
}

export default PostMetricsList
