import React from 'react'
import PropTypes from 'prop-types'

import PostsSettingsSection from '@/app/PostsSettingsSection'
import PostCardMetricsList from '@/app/PostCardMetricsList'

import { getPostMetricsContent } from '@/app/helpers/postsHelpers'

import sidePanelStyles from '@/app/SidePanel.module.css'

const PostCardMetrics = ({
  metrics,
  postType,
  className,
}) => {
  console.log('metrics', metrics)
  console.log('postType', postType)
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h2 className={sidePanelStyles.SidePanel__Header}>Post Metrics</h2>
      {/* PAID METRICS */}
      {metrics.paid && (
        <PostsSettingsSection
          header="Paid Metrics"
          copy="The metrics for this post when run as an ad."
        >
          <PostCardMetricsList
            metrics={metrics.paid}
            metricsContent={getPostMetricsContent('paid', postType)}
            currentMetricsType="paid"
            // setDrilldown={setDrilldown}
          />
        </PostsSettingsSection>
      )}
      {/* ORGANIC METRICS */}
      <PostsSettingsSection
        header="Organic Metrics"
        copy="The metrics for the organic post."
      >
        <PostCardMetricsList
          metrics={metrics.organic}
          metricsContent={getPostMetricsContent('organic', postType)}
          currentMetricsType="organic"
        />
      </PostsSettingsSection>
    </div>
  )
}

PostCardMetrics.propTypes = {
  metrics: PropTypes.object.isRequired,
  postType: PropTypes.string.isRequired,
  className: PropTypes.string,
}

PostCardMetrics.defaultProps = {
  className: null,
}

export default PostCardMetrics
