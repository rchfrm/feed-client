import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import Chart from '@/app/Chart'
import ResultsChartHeader from '@/app/ResultsChartHeader'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsAdGrowthChart = ({
  chartBarData,
  chartLineData,
  platform,
  isLoading }) => {
  const { artistId, artistCurrency } = React.useContext(ArtistContext)

  if (isLoading) return <Spinner />

  return (
    chartBarData && chartLineData ? (
      <>
        <ResultsChartHeader
          description={copy.adGrowthChartDescription(platform)}
          className="px-6 sm:px-0"
        />
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
      </>
    ) : (
      <MarkdownText markdown={copy.chartNoData('follower growth')} className="w-full mb-auto" />
    )
  )
}

ResultsAdGrowthChart.propTypes = {
  chartBarData: PropTypes.object,
  chartLineData: PropTypes.object,
  platform: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

ResultsAdGrowthChart.defaultProps = {
  chartBarData: null,
  chartLineData: null,
}

export default ResultsAdGrowthChart
