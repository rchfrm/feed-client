import React from 'react'
import PropTypes from 'prop-types'

import { noSpendAudiencesTypes } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendChartsTabLine = ({ audienceType, isActive }) => {
  const getWidth = () => {
    switch (audienceType) {
      case noSpendAudiencesTypes[0]:
        return '25%'
      case noSpendAudiencesTypes[1]:
        return '125%'
      case noSpendAudiencesTypes[2]:
        return '250%'
      default:
        return '100%'
    }
  }

  const getRightOffset = () => {
    switch (audienceType) {
      case noSpendAudiencesTypes[0]:
        return '75%'
      case noSpendAudiencesTypes[1]:
        return '175%'
      case noSpendAudiencesTypes[2]:
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
            top: '76px',
            right: getRightOffset(),
          }}
        />
      </>
    )
  )
}

ResultsNoSpendChartsTabLine.propTypes = {
  audienceType: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default ResultsNoSpendChartsTabLine
