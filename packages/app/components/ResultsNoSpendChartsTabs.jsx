import React from 'react'
import PropTypes from 'prop-types'

import ResultsNoSpendChartsTab from '@/app/ResultsNoSpendChartsTab'
import { noSpendAudiencesTypes } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendChartsTabs = ({
  audienceType,
  setAudienceType,
  hasGrowth,
  className,
}) => {
  return (
    <ul className={[
      className,
      'col-span-12 grid grid-cols-12 sm:col-gap-12',
      'justify-around mb-0',
    ].join(' ')}
    >
      {noSpendAudiencesTypes.map((audience) => {
        if (!hasGrowth && audience === 'growth') return

        return (
          <ResultsNoSpendChartsTab
            key={audience}
            audience={audience}
            setAudienceType={setAudienceType}
            audienceType={audienceType}
          />
        )
      })}
    </ul>
  )
}

ResultsNoSpendChartsTabs.propTypes = {
  audienceType: PropTypes.string.isRequired,
  setAudienceType: PropTypes.func.isRequired,
  hasGrowth: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
}

export default ResultsNoSpendChartsTabs
