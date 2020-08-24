import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/app/PostItem.module.css'

import PostItemMetricsSlider from '@/app/PostItemMetricsSlider'

import { formatNumber } from '@/helpers/utils'

const SCORE = ({ title, score, className }) => {
  const scoreFormatted = formatNumber(score)
  return (
    <div className={[styles.postSection, styles.postEsScore, styles.postText, className].join(' ')}>
      <p className={styles.postEsScorePara}>
        <span>{title} Score</span>
        <strong>{scoreFormatted || '-'}</strong>
      </p>
    </div>
  )
}

const PostItemMetricsScore = ({ hasPaidEs, organicEs, paidEs, currentMetricsType }) => {
  return (
    <PostItemMetricsSlider currentMetricsType={currentMetricsType} hasPaidEs={hasPaidEs}>
      {/* PAID SCORE */}
      {hasPaidEs && (
        <SCORE title="Paid" score={paidEs} />
      )}
      {/* ORGANIC SCORE */}
      <SCORE title="Organic" score={organicEs} />
    </PostItemMetricsSlider>
  )
}

PostItemMetricsScore.propTypes = {
  hasPaidEs: PropTypes.bool.isRequired,
  organicEs: PropTypes.number.isRequired,
  paidEs: PropTypes.number,
  currentMetricsType: PropTypes.string.isRequired,
}

PostItemMetricsScore.defaultProps = {
  paidEs: null,
}


export default PostItemMetricsScore
