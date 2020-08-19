import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import PillOptions from '@/elements/PillOptions'
import PostItemMetricsList from '@/app/PostItemMetricsList'

import * as postsHelpers from '@/app/helpers/postsHelpers'

import styles from '@/app/PostItem.module.css'

const metricsOptionsTypes = [
  { id: 'paid', title: 'Paid' },
  { id: 'organic', title: 'Organic' },
]

const PostItemMetrics = ({
  insights,
  es,
  promotionStatus,
  adsSummary,
}) => {
  const hidePaidMetrics = promotionStatus === 'inactive' || !adsSummary
  const initialMetricsOption = hidePaidMetrics ? metricsOptionsTypes[1].id : metricsOptionsTypes[0].id
  const [currentMetricsType, setCurrentMetricsType] = React.useState(initialMetricsOption)
  // Setup pill buttons
  const pillOptions = React.useMemo(() => {
    // Disable stories for Cold audiences
    if (hidePaidMetrics) {
      const paidOptionIndex = metricsOptionsTypes.findIndex(({ id }) => id === 'paid')
      return produce(metricsOptionsTypes, draftState => {
        draftState[paidOptionIndex].disabled = true
      })
    }
    return metricsOptionsTypes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promotionStatus])
  // Get visible insights based on metrics type
  const visibleInsights = React.useMemo(() => {
    return postsHelpers.getPostMetricsContent(currentMetricsType)
  }, [currentMetricsType])

  return (
    <>
      {/* METRICS TYPE BUTTONS */}
      <div className={[styles.postSection, 'pb-1'].join(' ')}>
        <PillOptions
          options={pillOptions}
          activeOption={currentMetricsType}
          setActiveOption={setCurrentMetricsType}
          size="small"
          style={{
            width: '101%',
            transform: 'translateX(-0.5%)',
          }}
        />
      </div>
      {/* LIST OF METRICS */}
      <PostItemMetricsList
        insights={insights}
        visibleInsights={visibleInsights}
        es={es}
      />
    </>
  )
}




PostItemMetrics.propTypes = {
  insights: PropTypes.object.isRequired,
  es: PropTypes.number.isRequired,
  promotionStatus: PropTypes.string.isRequired,
  adsSummary: PropTypes.object,
}

PostItemMetrics.defaultProps = {
  adsSummary: null,
}



export default PostItemMetrics
