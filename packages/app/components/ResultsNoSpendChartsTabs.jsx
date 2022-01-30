import React from 'react'

import ResultsNoSpendChartsTab from '@/app/ResultsNoSpendChartsTab'
import { noSpendAudiencesTypes } from '@/app/helpers/resultsHelpers'

const ResultsNoSpendChartsTabs = ({ audienceType, setAudienceType }) => {
  return (
    <ul className="w-full grid grid-cols-12 sm:col-gap-12 justify-around mb-6 sm:mb-12">
      {noSpendAudiencesTypes.map((audience) => (
        <ResultsNoSpendChartsTab
          key={audience}
          audience={audience}
          setAudienceType={setAudienceType}
          audienceType={audienceType}
        />
      ))}
    </ul>
  )
}

ResultsNoSpendChartsTabs.propTypes = {
}

export default ResultsNoSpendChartsTabs
