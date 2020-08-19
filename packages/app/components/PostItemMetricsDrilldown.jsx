import React from 'react'
import PropTypes from 'prop-types'

import { CSSTransition } from 'react-transition-group'

import PostItemMetricsList from '@/app/PostItemMetricsList'
import CloseCircle from '@/icons/CloseCircle'

import styles from '@/app/PostItem.module.css'

const PostItemMetricsDrilldown = ({ drilldown, setDrilldown }) => {
  const { title, metrics } = drilldown || {}
  const metricsContent = drilldown ? Object.entries(metrics).reduce((arr, [key, value]) => {
    if (!value) return arr
    return [...arr, key]
  }, []) : []

  return (
    <CSSTransition
      in={!!drilldown}
      timeout={300}
      classNames="slide-up"
      unmountOnExit
    >
      <div
        className={[
          'absolute w-full h-full bg-grey-1 top-0 left-0',
        ].join(' ')}
      >
        <p className={['text-sm', styles.postSection, 'pt-4 pb-0 mb-5'].join(' ')}>
          <strong>{title}</strong>
        </p>
        <PostItemMetricsList
          metrics={metrics}
          metricsContent={metricsContent}
        />
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setDrilldown(null)}
          className={[
            'absolute top-0 right-0',
            'mt-4 mr-3',
            'alert_close--button  button--close',
            'w-4 h-4',
          ].join(' ')}
          label="Close"
        >
          <CloseCircle />
        </button>
      </div>
    </CSSTransition>
  )
}

PostItemMetricsDrilldown.propTypes = {
  drilldown: PropTypes.object,
  setDrilldown: PropTypes.func.isRequired,
}

PostItemMetricsDrilldown.defaultProps = {
  drilldown: null,
}


export default PostItemMetricsDrilldown
