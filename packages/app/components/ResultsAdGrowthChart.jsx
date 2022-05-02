import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ChartBar from '@/app/ChartBar'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsAdGrowthChart = ({ dailyData, dailySpendData, isLoading }) => {
  const { artistId, artistCurrency } = React.useContext(ArtistContext)

  if (isLoading) return <Spinner />

  return (
    dailyData && Object.keys(dailySpendData).length > 0 ? (
      <div className="relative w-full">
        <ChartBar
          data={dailyData}
          lineData={{ dailyData: dailySpendData }}
          artistId={artistId}
          artistCurrency={artistCurrency}
          loading={isLoading}
          heightClasses="h-40 xxs:h-48 xs:h-60 sm:h-72 lg:h-96"
        />
      </div>
    ) : (
      <MarkdownText markdown={copy.growthChartNoData} className="w-full mb-auto" />
    )
  )
}

ResultsAdGrowthChart.propTypes = {
  dailyData: PropTypes.array,
  dailySpendData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

ResultsAdGrowthChart.defaultProps = {
  dailyData: null,
}

export default ResultsAdGrowthChart
