import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import ResultsNewAudienceStats from '@/app/ResultsNewAudienceStats'
import ResultsExistingAudienceStats from '@/app/ResultsExistingAudienceStats'
import ResultsConversionStats from '@/app/ResultsConversionStats'

import MarkdownText from '@/elements/MarkdownText'

import { getStatsData } from '@/app/helpers/resultsHelpers'

import copy from '@/app/copy/ResultsPageCopy'

const getConversionsPreferences = state => state.conversionsPreferences

const ResultsStats = ({ data, hasConversionColumn, className }) => {
  const [newAudienceData, setNewAudienceData] = React.useState(null)
  const [existingAudienceData, setExistingAudienceData] = React.useState(null)
  const [conversionData, setConversionData] = React.useState(null)
  const { facebookPixelEvent } = useControlsStore(getConversionsPreferences)

  React.useEffect(() => {
    const {
      newAudienceData,
      existingAudienceData,
      conversionData,
    } = getStatsData(data, facebookPixelEvent)

    setNewAudienceData(newAudienceData)
    setExistingAudienceData(existingAudienceData)
    setConversionData(conversionData)
  }, [data, facebookPixelEvent])

  return (
    <>
      <div
        className={[
          'col-span-12',
          'order-1',
          className,
        ].join(' ')}
      >
        {newAudienceData ? (
          <ResultsNewAudienceStats className="flex flex-col sm:items-center" data={newAudienceData} />
        ) : (
          <MarkdownText markdown={copy.statsNoData} className="mt-10 px-16 text-center text-xl text-blue" />
        )}
      </div>
      <div
        className={[
          'col-span-12',
          'order-2',
          className,
        ].join(' ')}
      >
        {existingAudienceData ? (
          <ResultsExistingAudienceStats className="flex flex-col sm:items-center" data={existingAudienceData} />
        ) : (
          <MarkdownText markdown={copy.statsNoData} className="mt-10 px-16 text-center text-xl text-green" />
        )}
      </div>
      {hasConversionColumn && (
        <div
          className={[
            'col-span-12',
            'order-3',
            className,
          ].join(' ')}
        >
          {conversionData ? (
            <ResultsConversionStats className="flex flex-col sm:items-center" data={conversionData} />
          ) : (
            <MarkdownText markdown={copy.statsNoData} className="mt-10 px-16 text-center text-xl text-insta" />
          )}
        </div>
      )}
    </>
  )
}

ResultsStats.propTypes = {
  data: PropTypes.object.isRequired,
  hasConversionColumn: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

ResultsStats.defaultProps = {
  className: '',
}

export default ResultsStats
