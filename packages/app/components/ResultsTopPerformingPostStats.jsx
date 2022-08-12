import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import { formatCurrency, formatNumber } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const ResultsTopPerformingPostStats = ({
  post,
  postData,
  metricType,
  currency,
}) => {
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  return (
    <div>
      <p className="text-xs italic line-clamp-2">{postData?.message}</p>
      <ul className="xs:pl-4">
        <li className="mb-4">
          <span className="font-bold underline underline-offset-4 decoration-2 decoration-blue">{formatNumber(post.reach)}</span> people reached
        </li>
        {metricType === 'engagement' && (
          <>
            <li className="mb-4">
              <span className="font-bold underline underline-offset-4 decoration-2 decoration-green">{formatNumber(post.engaged)}</span> people engaged
            </li>
            <li>
              <span className="font-bold underline underline-offset-4 decoration-2 decoration-insta">{Math.round((post.engaged / post.reach) * 100)}%</span> engagement rate
            </li>
          </>
        )}
        {metricType === 'growth' && hasSalesObjective && (
          <>
            <li className="mb-4">
              <span className="font-bold underline underline-offset-2 decoration-2 decoration-green">{formatNumber(post.landing_page_views)}</span> website visit(s)
            </li>
            <li className="mb-4">
              <span className="font-bold underline underline-offset-2 decoration-2 decoration-insta">{formatNumber(post.events_count)}</span> event(s)
              {post.sales_value > 0 && <span> worth <strong>{formatCurrency(post.sales_value, currency)}</strong></span>}
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
  currency: PropTypes.string.isRequired,
}

ResultsTopPerformingPostStats.defaultProps = {
  postData: null,
}

export default ResultsTopPerformingPostStats
