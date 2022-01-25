import React from 'react'

import ResultsNoSpendChartsTab from '@/app/ResultsNoSpendChartsTab'

const ResultsNoSpendChartsTabs = ({ audienceType, setAudienceType }) => {
  const audiencesTypes = ['reach', 'engage', 'growth']

  return (
    <ul className="w-full flex justify-around mb-12">
      {audiencesTypes.map((audience) => (
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
