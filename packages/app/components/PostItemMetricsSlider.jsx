import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

import styles from '@/app/PostItem.module.css'


const animateSlider = (sliderEl, currentMetricsType) => {
  const xPercent = currentMetricsType === 'organic' ? -100 : 0
  gsap.to(sliderEl, { xPercent, duration: 0.3 })
}

const PostItemMetricsSlider = ({ hasPaidEs, currentMetricsType, children }) => {
  const sliderRef = React.useRef(null)
  // TRIGGER SLIDE
  React.useEffect(() => {
    if (!hasPaidEs) return
    animateSlider(sliderRef.current, currentMetricsType)
  }, [hasPaidEs, currentMetricsType])
  return (
    <div
      className={[
        hasPaidEs ? 'w-full overflow-hidden' : null,
      ].join(' ')}
    >
      <div
        className={[
          hasPaidEs ? 'flex w-full' : null,
          hasPaidEs ? styles.postItemMetricsSlider : null,
        ].join(' ')}
        ref={sliderRef}
      >
        {children}
      </div>
    </div>
  )
}

PostItemMetricsSlider.propTypes = {
  hasPaidEs: PropTypes.bool.isRequired,
  currentMetricsType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}


export default PostItemMetricsSlider
