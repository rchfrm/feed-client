import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ChartBar from '@/app/ChartBar'
import ChartLine from '@/app/ChartLine'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsEngagedAudienceChart = ({ dailyData, chartType, isLoading }) => {
  const { artistId, artistCurrency } = React.useContext(ArtistContext)

  if (isLoading) return <Spinner />

  return (
    dailyData ? (
      <div className="relative w-full">
        {chartType === 'bar' ? (
          <ChartBar
            data={dailyData}
            artistId={artistId}
            artistCurrency={artistCurrency}
            loading={isLoading}
          />
        ) : (
          <ChartLine data={dailyData} />
        )}
      </div>
    ) : (
      <MarkdownText markdown={copy.growthChartNoData} className="w-full mb-auto" />
    )
  )
}

ResultsEngagedAudienceChart.propTypes = {
  dailyData: PropTypes.array,
  chartType: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

ResultsEngagedAudienceChart.defaultProps = {
  dailyData: null,
}

export default ResultsEngagedAudienceChart
