import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import Chart from '@/app/Chart'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsAdGrowthChart = ({ chartBarData, chartLineData, isLoading }) => {
  const { artistId, artistCurrency } = React.useContext(ArtistContext)

  if (isLoading) return <Spinner />

  return (
    chartBarData && chartLineData ? (
      <div className="relative w-full">
        <Chart
          chartBarData={chartBarData}
          chartLineData={chartLineData}
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
  chartBarData: PropTypes.object,
  chartLineData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
}

ResultsAdGrowthChart.defaultProps = {
  chartBarData: null,
  chartLineData: null,
}

export default ResultsAdGrowthChart
