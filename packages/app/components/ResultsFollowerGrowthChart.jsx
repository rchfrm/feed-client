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
  const {
    followerGrowth,
    adSpend,
    projections,
  } = dataSources || {}

  const checkSpendDays = (condition) => {
    const values = Object.values(adSpend || {})
    return values.slice(1, values.length - 1).some((x) => Boolean(x) === condition)
  }

  const legendItems = [
    {
      label: 'Green line',
      description: 'Change in followers in Feed campaign so far.',
      color: brandColors.green,
      shouldShow: checkSpendDays(true),
    },
    {
      label: 'Red line',
      description: 'Followers without Feed.',
      color: brandColors.red,
      shouldShow: checkSpendDays(false),
    },
    {
      label: 'Red shaded area',
      description: 'Range of projected follower growth without Feed.',
      color: brandColors.red,
      shouldShow: checkSpendDays(true),
      hasGradient: true,
    },
  ]

  const data = [{
    primaryData: followerGrowth,
    secondaryData: adSpend,
    projections,
    color: {
      primary: brandColors.green,
      secondary: brandColors.red,
    },
    label: {
      primary: 'Followers',
      secondary: 'Ad spend',
    }
  }]

  return (
    <>
      {(isLoading || ! followerGrowth || (! projections?.length && checkSpendDays(true))) ? (
        <Spinner className="w-full aspect-[2/1] flex justify-center items-center" />
      ) : (
        <ChartLine
          data={data}
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
