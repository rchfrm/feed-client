import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/app/PostItem.module.css'
import copy from '@/app/copy/PostsPageCopy'

import * as postsHelpers from '@/app/helpers/postsHelpers'

const PostItemMetricsListItem = ({
  id,
  title,
  value,
  currentMetricsType,
  drilldownMetrics,
  setDrilldown,
  className,
}) => {
  const drilldown = drilldownMetrics ? { metrics: drilldownMetrics, title } : null
  // const tooltip = copy.metricsTooltips[currentMetricsType][id]
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
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  currentMetricsType: PropTypes.string,
  drilldownMetrics: PropTypes.object,
  setDrilldown: PropTypes.func,
  className: PropTypes.string,
}

PostItemMetricsListItem.defaultProps = {
  currentMetricsType: '',
  drilldownMetrics: null,
  setDrilldown: () => {},
  className: '',
}

export default PostItemMetricsListItem
