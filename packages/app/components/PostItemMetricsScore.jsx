import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'
import PostItemMetricsSlider from '@/app/PostItemMetricsSlider'

import { formatNumber } from '@/helpers/utils'

import styles from '@/app/PostItem.module.css'

import copy from '@/app/copy/PostsPageCopy'

const SCORE = ({ title, score, type, className }) => {
  const scoreFormatted = formatNumber(score)
  const tooltipSlides = copy.scoreTooltip[type]
  return (
    <div className={[styles.postSection, styles.postEsScore, styles.postText, className].join(' ')}>
      <div className={styles.postEsScorePara}>
        <span className="inline-flex items-center">
          {title} Score
          <TooltipButton slides={tooltipSlides} direction="top" label={`${title} score`} />
        </span>
        <strong>{scoreFormatted || '-'}</strong>
      </div>
    </div>
  )
}

const PostItemMetricsScore = ({ hasPaidEs, organicEs, paidEs, currentMetricsType }) => {
  return (
    <PostItemMetricsSlider currentMetricsType={currentMetricsType} hasPaidEs={hasPaidEs}>
      {/* PAID SCORE */}
      {hasPaidEs && (
        <SCORE title="Paid" score={paidEs} type="paid" />
      )}
      {/* ORGANIC SCORE */}
      <SCORE title="Organic" score={organicEs} type="organic" />
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
