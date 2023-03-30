import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ChartLine from '@/app/ChartLine'
import ResultsChartHeader from '@/app/ResultsChartHeader'
import Spinner from '@/elements/Spinner'
import copy from '@/app/copy/ResultsPageCopy'

const ResultsAdGrowthChart = ({
  adSpend,
  followerGrowth,
  isLoading,
}) => {
  const { artistCurrency } = React.useContext(ArtistContext)

  if (isLoading || ! followerGrowth) {
    return <Spinner />
  }

  return (
    <div className="relative w-auto mb-6">
      <ChartLine
        data={followerGrowth}
        adSpend={Object.values(adSpend.dailyData)}
        currency={artistCurrency}
      />
    </div>
  )
}

ResultsAdGrowthChart.propTypes = {
  followerGrowth: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
}

ResultsAdGrowthChart.defaultProps = {
  followerGrowth: null,
}

export default ResultsAdGrowthChart
