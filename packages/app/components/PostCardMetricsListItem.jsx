import React from 'react'
import PropTypes from 'prop-types'

import * as utils from '@/helpers/utils'

const PostItemMetricsListItem = ({
  title,
  value,
  drilldownMetrics,
  artistCurrency,
  className,
}) => {
  const drilldownMetricsFormatted = React.useMemo(() => {
    if (!drilldownMetrics) return null
    console.log('drilldownMetrics', drilldownMetrics)
    return Object.entries(drilldownMetrics).reduce((arr, [key, value]) => {
      if (!value) return arr
      return [...arr, { key, value }]
    }, [])
  }, [drilldownMetrics])
  console.log('drilldownMetricsFormatted', drilldownMetricsFormatted)
  return (
    <li
      className={[
        'p-3',
        className,
      ].join(' ')}
      key={title}
    >
      <div className="flex justify-between">
        <p className="mb-0">{title}</p>
        <p className="mb-0 font-bold">{value}</p>
      </div>
      {/* DRILLDOWNS */}
      {drilldownMetricsFormatted && (
        <ul className="pt-2 text-sm mb-0">
          {drilldownMetricsFormatted.map(({ key, value }) => {
            const title = utils.capitalise(key)
            const parsedValue = title === 'spend'
              ? utils.formatCurrency(value, artistCurrency)
              : utils.abbreviateNumber(value)
            return (
              <li
                key={key}
                className="w-full flex justify-between mb-1 last:mb-0"
              >
                <p className="mb-0 capitalize">{title}</p>
                <p className="mb-0 font-bold">{parsedValue}</p>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

PostItemMetricsListItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  drilldownMetrics: PropTypes.object,
  className: PropTypes.string,
}

PostItemMetricsListItem.defaultProps = {
  drilldownMetrics: null,
  className: '',
}

export default PostItemMetricsListItem
