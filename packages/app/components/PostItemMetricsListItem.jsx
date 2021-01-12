import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/app/PostItem.module.css'

const PostItemMetricsListItem = ({
  title,
  value,
  drilldownMetrics,
  setDrilldown,
  className,
}) => {
  const drilldown = drilldownMetrics ? { metrics: drilldownMetrics, title } : null
  return (
    <li
      className={[styles.postMetricsItem, className].join(' ')}
      key={title}
    >
      <div className={styles.title}>
        {drilldown ? (
          <a
            role="button"
            aria-label="Show breakdown"
            onClick={() => setDrilldown(drilldown)}
          >
            {title} +
          </a>
        ) : (
          <span>{title}:</span>
        )}
      </div>
      <p className={[styles.value, 'mb-0'].join(' ')}>{value}</p>
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
