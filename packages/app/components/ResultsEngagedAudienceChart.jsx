import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import Chart from '@/app/Chart'
import ChartLine from '@/app/ChartLine'
import ResultsChartHeader from '@/app/ResultsChartHeader'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsEngagedAudienceChart = ({
  dailyData,
  platform,
  isChartBar,
  isLoading,
}) => {
  const { artistId, artistCurrency } = React.useContext(ArtistContext)

  if (isLoading) return <Spinner />

  return (
    dailyData ? (
      <>
        <ResultsChartHeader
          description={copy.engageChartDescription(platform, isChartBar)}
          className="px-6 sm:px-0"
        />
        <div className="relative w-full h-40 xxs:h-48 xs:h-60 sm:h-72 lg:h-96">
          {isChartBar ? (
            <Chart
              chartBarData={dailyData}
              artistId={artistId}
              artistCurrency={artistCurrency}
              loading={isLoading}
              heightClasses="h-40 xxs:h-48 xs:h-60 sm:h-72 lg:h-96"
            />
          ) : (
            <ChartLine
              data={Object.values(dailyData)}
              maintainAspectRatio={false}
            />
          )}
        </div>
      </>
    ) : (
      <MarkdownText markdown={copy.chartNoData('engaged audience')} className="w-full mb-auto" />
    )
  )
}

ResultsEngagedAudienceChart.propTypes = {
  dailyData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  platform: PropTypes.string.isRequired,
  isChartBar: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

ResultsEngagedAudienceChart.defaultProps = {
  dailyData: null,
}

export default ResultsEngagedAudienceChart
