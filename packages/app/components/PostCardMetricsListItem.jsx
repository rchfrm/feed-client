import React from 'react'
import PropTypes from 'prop-types'

const PostItemMetricsListItem = ({
  title,
  value,
  drilldownMetrics,
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
        'flex justify-between',
        'p-3',
        className,
      ].join(' ')}
      key={title}
    >
      {/* <div>
        {drilldown ? (
          <a
            role="button"
            aria-label="Show breakdown"
            onClick={() => setDrilldown(drilldown)}
          >
            {title} +
          </a>
        ) : (
          <span>{title}</span>
        )}
      </div> */}
      <p className="mb-0">{title}</p>
      <p className="mb-0 font-bold">{value}</p>
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
  setDrilldown: PropTypes.func,
  className: PropTypes.string,
}

PostItemMetricsListItem.defaultProps = {
  drilldownMetrics: null,
  setDrilldown: () => {},
  className: '',
}

export default PostItemMetricsListItem
