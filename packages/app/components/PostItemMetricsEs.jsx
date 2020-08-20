import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

import styles from '@/app/PostItem.module.css'

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

const animateSlider = (sliderEl, currentMetricsType) => {
  const xPercent = currentMetricsType === 'organic' ? -100 : 0
  gsap.to(sliderEl, { xPercent, duration: 0.3 })
}

const PostItemMetricsEs = ({ organicEs, paidEs, currentMetricsType }) => {
  const sliderRef = React.useRef(null)
  const showPaidEs = typeof paidEs === 'number'
  // TRIGGER SLIDE
  React.useEffect(() => {
    if (!showPaidEs) return
    animateSlider(sliderRef.current, currentMetricsType)
  }, [showPaidEs, currentMetricsType])
  return (
    <div
      className={[
        showPaidEs ? 'w-full overflow-hidden' : null,
      ].join(' ')}
    >
      <div
        className={[
          showPaidEs ? 'flex w-full' : null,
          showPaidEs ? styles.postEsScoreSlider : null,
        ].join(' ')}
        ref={sliderRef}
      >
        {/* PAID SCORE */}
        {showPaidEs && (
          <SCORE title="Paid" score={paidEs} />
        )}
        {/* ORGANIC SCORE */}
        <SCORE title="Organic" score={organicEs} />
      </div>
    </div>
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
