import React from 'react'
import PropTypes from 'prop-types'

import { noSpendMetricTypes } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendChartsTabLine = ({ metricType, isActive }) => {
  const { reach, engagement, growth } = noSpendMetricTypes

  const getWidth = () => {
    switch (metricType) {
      case reach.type:
        return '25%'
      case engagement.type:
        return '125%'
      case growth.type:
        return '250%'
      default:
        return '100%'
    }
  }

  const getRightOffset = () => {
    switch (metricType) {
      case reach.type:
        return '75%'
      case engagement.type:
        return '175%'
      case growth.type:
        return '300%'
      default:
        return '100%'
    }
  }

  return (
    isActive && (
      <>
        <span
          className="absolute h-4 bg-black"
          style={{
            width: '1px',
            top: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
        <span
          className="absolute bg-black"
          style={{
            height: '1px',
            width: getWidth(),
            top: '75px',
            right: '50%',
          }}
        />
        <span
          className="absolute h-4 bg-black"
          style={{
            width: '1px',
            top: '75px',
            right: getRightOffset(),
          }}
        />
      </>
    )
  )
}

ResultsNoSpendChartsTabLine.propTypes = {
  metricType: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default ResultsNoSpendChartsTabLine
