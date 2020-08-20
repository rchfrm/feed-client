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

const PostItemMetricsEs = ({ organicEs, paidEs, currentMetricsType }) => {
  const hasPaidEs = typeof paidEs === 'number'
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

PostItemMetricsEs.propTypes = {
  organicEs: PropTypes.number.isRequired,
  paidEs: PropTypes.number,
  currentMetricsType: PropTypes.string.isRequired,
}

PostItemMetricsEs.defaultProps = {
  paidEs: null,
}


export default PostItemMetricsEs
