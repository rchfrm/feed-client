import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/app/PostItem.module.css'
import copy from '@/app/copy/PostsPageCopy'

import * as postsHelpers from '@/app/helpers/postsHelpers'

const getDrilldownCopy = (drilldownMetrics) => postsHelpers.getMetricsDrilldownCopy(drilldownMetrics)

const PostItemMetricsListItem = ({
  id,
  title,
  value,
  currentMetricsType,
  drilldownMetrics,
  className,
}) => {
  const tooltip = drilldownMetrics ? getDrilldownCopy(drilldownMetrics) : copy.metricsTooltips[currentMetricsType][id]
  console.log('tooltip', tooltip)
  return (
    <li
      className={[styles.postMetricsItem, className].join(' ')}
      key={title}
    >
      <div className={styles.title}>
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
  currentMetricsType: PropTypes.string.isRequired,
  drilldownMetrics: PropTypes.object,
  className: PropTypes.string,
}

PostItemMetricsListItem.defaultProps = {
  className: '',
  drilldownMetrics: null,
}

export default PostItemMetricsListItem
