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
  organicMetrics,
  paidMetrics,
  organicEs,
  paidEs,
  promotionStatus,
}) => {
  const hidePaidMetrics = promotionStatus === 'inactive' || !paidMetrics
  const initialMetricsOption = hidePaidMetrics ? metricsOptionsTypes[1].id : metricsOptionsTypes[0].id
  const [currentMetricsType, setCurrentMetricsType] = React.useState(initialMetricsOption)
  // SETUP PILL BUTTONS
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
  // GET METRICS AND SCORE BASED ON METRIC TYPE
  const metrics = currentMetricsType === 'organic' ? organicMetrics : paidMetrics
  const es = currentMetricsType === 'organic' ? organicEs : paidEs
  // GET VISIBLE INSIGHTS BASED ON METRICS TYPE
  const metricsContent = React.useMemo(() => {
    return postsHelpers.getPostMetricsContent(currentMetricsType)
  }, [currentMetricsType])

  return (
    <>
      {/* METRICS TYPE BUTTONS */}
      <div className={['relative overflow-hidden'].join(' ')}>
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
          metrics={metrics}
          metricsContent={metricsContent}
          currentMetricsType={currentMetricsType}
          es={es}
        />
      </div>
      {/* ES SCORE */}
      <div className={[styles.postSection, styles.postEsScore, styles.postText].join(' ')}>
        <p className={styles.postEsScorePara}>
          <span>Score</span>
          <strong>{es || '-'}</strong>
        </p>
      </div>
    </>
  )
}




PostItemMetrics.propTypes = {
  organicMetrics: PropTypes.object.isRequired,
  paidMetrics: PropTypes.object,
  organicEs: PropTypes.number.isRequired,
  paidEs: PropTypes.number,
  promotionStatus: PropTypes.string.isRequired,
}

PostItemMetrics.defaultProps = {
  paidEs: 0,
  paidMetrics: null,
}



export default PostItemMetrics
