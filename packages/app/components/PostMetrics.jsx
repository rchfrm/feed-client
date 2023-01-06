import React from 'react'
import PropTypes from 'prop-types'
import AdSettingsSection from '@/app/AdSettingsSection'
import PostMetricsScore from '@/app/PostMetricsScore'
import PostMetricsList from '@/app/PostMetricsList'
import { metricsConfig } from '@/app/helpers/postsHelpers'
import sidePanelStyles from '@/SidePanel.module.css'
import copy from '@/app/copy/PostsPageCopy'

const PostMetrics = ({
  metrics,
  shouldShowTitle,
  className,
}) => {
  return (
    <div
      className={[
        'md:max-w-none',
      ].join(' ')}
    >
      {shouldShowTitle && <h2 className={sidePanelStyles.SidePanel__Header}>Post Results</h2>}
      <div className={className}>
        <AdSettingsSection
          header="Paid Metrics"
          copy={copy.metricsDescription}
        >
          <div className="md:grid grid-cols-12 items-center pt-4">
            <div className="col-span-4">
              <PostMetricsScore
                score={metrics?.engagementScore}
                className={[
                  'mb-8 mx-auto',
                  'xs:mx-0',
                  'md:mb-0 md:-mt-2',
                ].join(' ')}
              />
            </div>
            <PostMetricsList
              metrics={metrics}
              content={metricsConfig}
              className="col-span-7 col-start-6"
            />
          </div>
        </AdSettingsSection>
      </div>
    </div>
  )
}

PostMetrics.propTypes = {
  metrics: PropTypes.object.isRequired,
  shouldShowTitle: PropTypes.bool,
  className: PropTypes.string,
}

PostMetrics.defaultProps = {
  shouldShowTitle: true,
  className: null,
}

export default PostMetrics
