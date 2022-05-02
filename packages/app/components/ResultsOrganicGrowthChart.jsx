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
      <div className="relative w-full" style={{ paddingTop: '50%' }}>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <ChartLine data={dailyData} />
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
