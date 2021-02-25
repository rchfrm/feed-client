import React from 'react'
import PropTypes from 'prop-types'

import PostsSettingsSection from '@/app/PostsSettingsSection'
import PostCardMetricsScore from '@/app/PostCardMetricsScore'
import PostCardMetricsList from '@/app/PostCardMetricsList'

import { getPostMetricsContent } from '@/app/helpers/postsHelpers'

import sidePanelStyles from '@/app/SidePanel.module.css'

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

const PostCardMetrics = ({
  metrics,
  postType,
  className,
}) => {
  return (
    <div
      className={[
        'max-w-lg md:max-w-none',
        className,
      ].join(' ')}
    >
      <h2 className={sidePanelStyles.SidePanel__Header}>Post Metrics</h2>
      {metricsType.map(({ type, header, description }) => {
        const typeMetrics = metrics[type]
        if (!typeMetrics) return null
        return (
          <PostsSettingsSection
            key={type}
            header={header}
            copy={description}
          >
            <div
              className="md:grid grid-cols-12 items-center pt-4"
            >
              <div className="col-span-4">
                <PostCardMetricsScore
                  score={typeMetrics.engagementScore}
                  metricsType={type}
                  className={[
                    'mb-8 mx-auto',
                    'xs:mx-0',
                    'md:mb-0 md:-mt-2',
                  ].join(' ')}
                />
              </div>
              <PostCardMetricsList
                metrics={typeMetrics}
                metricsContent={getPostMetricsContent(type, postType)}
                metricsType={type}
                className="col-span-7 col-start-6"
              />
            </div>
          </PostsSettingsSection>
        )
      })}
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
