import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import ResultsNewAudienceStats from '@/app/ResultsNewAudienceStats'
import ResultsExistingAudienceStats from '@/app/ResultsExistingAudienceStats'
import ResultsConversionStats from '@/app/ResultsConversionStats'

import MarkdownText from '@/elements/MarkdownText'

import { getStatsData } from '@/app/helpers/resultsHelpers'

import copy from '@/app/copy/ResultsPageCopy'

const getConversionsPreferences = state => state.conversionsPreferences

const ResultsStats = ({ data, hasConversionColumn, className }) => {
  const { artist: { min_daily_budget_info } } = React.useContext(ArtistContext)
  const { currency: { code: currency } } = min_daily_budget_info || {}

  const [newAudienceData, setNewAudienceData] = React.useState(null)
  const [existingAudienceData, setExistingAudienceData] = React.useState(null)
  const [conversionData, setConversionData] = React.useState(null)
  const { facebookPixelEvent } = useControlsStore(getConversionsPreferences)

  React.useEffect(() => {
    const {
      newAudienceData,
      existingAudienceData,
      conversionData,
    } = getStatsData({
      ...data,
      facebookPixelEvent,
      currency,
    })

    setNewAudienceData(newAudienceData)
    setExistingAudienceData(existingAudienceData)
    setConversionData(conversionData)
  }, [data, facebookPixelEvent, currency])

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
          <ResultsNewAudienceStats data={newAudienceData} />
        ) : (
          <MarkdownText markdown={copy.statsNoData} className="px-16 text-center text-xl text-blue" />
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
          <ResultsExistingAudienceStats data={existingAudienceData} />
        ) : (
          <MarkdownText markdown={copy.statsNoData} className="px-16 text-center text-xl text-green" />
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
            <ResultsConversionStats data={conversionData} currency={currency} />
          ) : (
            <MarkdownText markdown={copy.statsNoData} className="px-16 text-center text-xl text-insta" />
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
