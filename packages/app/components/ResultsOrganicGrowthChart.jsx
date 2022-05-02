import React from 'react'
import PropTypes from 'prop-types'

import ChartLine from '@/app/ChartLine'

import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

const ResultsOrganicGrowthChart = ({ dailyData, isLoading }) => {
  if (isLoading) return <Spinner />

  return (
    dailyData ? (
      <div className="relative w-full">
        <div className="h-40 xxs:h-48 xs:h-60 sm:h-72 lg:h-96">
          <ChartLine
            data={dailyData}
            maintainAspectRatio={false}
          />
        </div>
      </div>
    ) : (
      <MarkdownText markdown={copy.growthChartNoData} className="w-full mb-auto" />
    )
  )
}

ResultsOrganicGrowthChart.propTypes = {
  dailyData: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
}

ResultsOrganicGrowthChart.defaultProps = {
  dailyData: null,
}

export default ResultsOrganicGrowthChart
