import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const ResultsTopPerformingPostStats = ({
  post,
  postData,
  metricType,
}) => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjecive = objective === 'sales'

  return (
    <div>
      <p className="text-xs italic line-clamp-2">{postData?.message}</p>
      <ul className="xs:pl-4">
        <li className="mb-4">
          <span className="font-bold underline underline-offset-4 decoration-2 decoration-blue">{post.reach}</span> people reached
        </li>
        {metricType === 'engagement' && (
          <>
            <li className="mb-4">
              <span className="font-bold underline underline-offset-4 decoration-2 decoration-green">{post.engaged}</span> people engaged
            </li>
            <li>
              <span className="font-bold underline underline-offset-4 decoration-2 decoration-insta">{Math.round((post.engaged / post.reach) * 100)}%</span> engagement rate
            </li>
          </>
        )}
        {metricType === 'growth' && hasSalesObjecive && (
          <>
            <li>
              <span className="font-bold underline underline-offset-2 decoration-2 decoration-green">{post.landing_page_views}</span> website visits
            </li>
            <li>
              <span className="font-bold underline underline-offset-2 decoration-2 decoration-insta">{post.events_count}</span> sales worth <span className="font-bold">{post.sales_value}</span>
            </li>
            <li>
              <span className="font-bold underline underline-offset-2 decoration-2 decoration-insta">{Math.round((post.events_count / post.landing_page_views) * 100)}%</span> conversions rate
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

ResultsTopPerformingPostStats.propTypes = {
  post: PropTypes.object.isRequired,
  postData: PropTypes.object,
  metricType: PropTypes.string.isRequired,
}

ResultsTopPerformingPostStats.defaultProps = {
  postData: null,
}

export default ResultsTopPerformingPostStats
