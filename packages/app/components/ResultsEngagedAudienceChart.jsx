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
      <div className="relative w-full h-40 xxs:h-48 xs:h-60 sm:h-72 lg:h-96">
        {chartType === 'bar' ? (
          <ChartBar
            data={dailyData}
            artistId={artistId}
            artistCurrency={artistCurrency}
            loading={isLoading}
            heightClasses="h-40 xxs:h-48 xs:h-60 sm:h-72 lg:h-96"
          />
        ) : (
          <ChartLine
            data={dailyData}
            maintainAspectRatio={false}
          />
        )}
      </div>
    ) : (
      <MarkdownText markdown={copy.growthChartNoData} className="w-full mb-auto" />
    )
  )
}

ResultsEngagedAudienceChart.propTypes = {
  dailyData: PropTypes.object,
  chartType: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

ResultsEngagedAudienceChart.defaultProps = {
  dailyData: null,
}

export default ResultsEngagedAudienceChart
