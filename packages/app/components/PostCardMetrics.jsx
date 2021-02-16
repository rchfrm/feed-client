import React from 'react'
import PropTypes from 'prop-types'

import PostsSettingsSection from '@/app/PostsSettingsSection'
import PostCardMetricsScore from '@/app/PostCardMetricsScore'
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
        'max-w-lg md:max-w-none',
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
          <div
            className="md:grid grid-cols-12 items-center pt-4"
          >
            <div className="col-span-4">
              <PostCardMetricsScore
                score={metrics.paid.engagementScore}
                metricsType="paid"
                className={[
                  'mb-8 mx-auto',
                  'sm:mx-0',
                  'md:mb-0 md:-mt-2 md:mx-auto',
                ].join(' ')}
              />
            </div>
            <PostCardMetricsList
              metrics={metrics.paid}
              metricsContent={getPostMetricsContent('paid', postType)}
              metricsType="paid"
              className="col-span-7 col-start-6"
            />
          </div>
        </PostsSettingsSection>
      )}
      {/* ORGANIC METRICS */}
      <PostsSettingsSection
        header="Organic Metrics"
        copy="The metrics for the organic post."
      >
        <div className="md:grid grid-cols-2">
          <PostCardMetricsList
            metrics={metrics.organic}
            metricsContent={getPostMetricsContent('organic', postType)}
            metricsType="organic"
          />
        </div>
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
