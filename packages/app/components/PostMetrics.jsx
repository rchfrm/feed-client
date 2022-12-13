import React from 'react'
import PropTypes from 'prop-types'

import AdSettingsSection from '@/app/AdSettingsSection'
import PostMetricsScore from '@/app/PostMetricsScore'
import PostMetricsList from '@/app/PostMetricsList'

import { getPostMetricsContent } from '@/app/helpers/postsHelpers'

import sidePanelStyles from '@/SidePanel.module.css'

import copy from '@/app/copy/PostsPageCopy'

const metricsType = [
  {
    type: 'paid',
    header: 'Paid Metrics',
    description: copy.metricsDescription.paid,
  },
  {
    type: 'organic',
    header: 'Organic Metrics',
    description: copy.metricsDescription.organic,
  },
]

const PostMetrics = ({
  metrics,
  postType,
  shouldShowTitle,
  className,
}) => {
  return (
    <div
      className={[
        'md:max-w-none',
      ].join(' ')}
    >
      {shouldShowTitle && <h2 className={sidePanelStyles.SidePanel__Header}>Post Insights</h2>}
      <div className={className}>
        {metricsType.map(({ type, header, description }) => {
          const typeMetrics = metrics[type]
          if (! typeMetrics) return null
          return (
            <AdSettingsSection
              key={type}
              header={header}
              copy={description}
            >
              <div
                className="md:grid grid-cols-12 items-center pt-4"
              >
                <div className="col-span-4">
                  <PostMetricsScore
                    score={type === 'organic' ? typeMetrics.normalizedScore : typeMetrics.engagementScore}
                    metricsType={type}
                    className={[
                      'mb-8 mx-auto',
                      'xs:mx-0',
                      'md:mb-0 md:-mt-2',
                    ].join(' ')}
                  />
                </div>
                <PostMetricsList
                  metrics={typeMetrics}
                  metricsContent={getPostMetricsContent(type, postType)}
                  metricsType={type}
                  className="col-span-7 col-start-6"
                />
              </div>
            </AdSettingsSection>
          )
        })}
      </div>
    </div>
  )
}

PostMetrics.propTypes = {
  metrics: PropTypes.object.isRequired,
  postType: PropTypes.string.isRequired,
  shouldShowTitle: PropTypes.bool,
  className: PropTypes.string,
}

PostMetrics.defaultProps = {
  shouldShowTitle: true,
  className: null,
}

export default PostMetrics
