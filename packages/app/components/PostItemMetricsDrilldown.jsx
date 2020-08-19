import React from 'react'
import PropTypes from 'prop-types'

import PostItemMetricsList from '@/app/PostItemMetricsList'
import CloseCircle from '@/icons/CloseCircle'

import styles from '@/app/PostItem.module.css'

import * as utils from '@/helpers/utils'

const PostItemMetricsDrilldown = ({ drilldown, setDrilldown }) => {
  const { title, metrics } = drilldown
  const metricsContent = Object.entries(metrics).reduce((arr, [key, value]) => {
    if (!value) return arr
    return [...arr, key]
  }, [])
  console.log('metricsContent', metricsContent)
  return (
    <div
      className={[
        'absolute w-full h-full bg-grey-1 top-0 left-0',

        // styles.postSection,
        !drilldown ? 'hidden' : null,
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
          // 'pr-2 -mt-2',
          'alert_close--button  button--close',
          'w-4 h-4',
        ].join(' ')}
        label="Close"
      >
        <CloseCircle />
      </button>
    </div>
  )
}

PostItemMetricsDrilldown.propTypes = {
  drilldown: PropTypes.object.isRequired,
  setDrilldown: PropTypes.func.isRequired,
}

export default PostItemMetricsDrilldown
