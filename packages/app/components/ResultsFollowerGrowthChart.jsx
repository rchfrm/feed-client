import React from 'react'
import PropTypes from 'prop-types'
import ChartLine from '@/app/ChartLine'
import ResultsFollowerGrowthChartLegend from '@/app/ResultsFollowerGrowthChartLegend'
import Spinner from '@/elements/Spinner'
import brandColors from '@/constants/brandColors'

const ResultsFollowerGrowthChart = ({
  dataSources,
  currency,
  isLoading,
}) => {
  const { followerGrowth, adSpend } = dataSources || {}

  const legendItems = [
    {
      label: 'Green line',
      description: 'Change in followers in Feed campaign so far.',
      color: brandColors.green,
    },
    {
      label: 'Red line',
      description: 'Followers without Feed.',
      color: brandColors.red,
    },
  ]

  return (
    <>
      {(isLoading || ! followerGrowth) ? (
        <Spinner className="w-full aspect-[2/1] flex justify-center items-center" />
      ) : (
        <ChartLine
          data={[followerGrowth, adSpend]}
          currency={currency}
        />
      )}
      <ResultsFollowerGrowthChartLegend
        items={legendItems}
      />
    </>
  )
}

ResultsFollowerGrowthChart.propTypes = {
  dataSources: PropTypes.object,
  currency: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

ResultsFollowerGrowthChart.defaultProps = {
  dataSources: null,
}

export default ResultsFollowerGrowthChart
