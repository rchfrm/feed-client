import React from 'react'
import PropTypes from 'prop-types'
import ResultsFollowerGrowthChartLegendItem from '@/app/ResultsFollowerGrowthChartLegendItem'

const ResultsFollowerGrowthChartLegend = ({ items }) => {
  return (
    <ul className="flex w-full ml-3 pt-4 border-t border-solid border-grey-light">
      {items.map(({ label, description, color }) => (
        <ResultsFollowerGrowthChartLegendItem
          key={label}
          label={label}
          description={description}
          color={color}
        />
      ))}
    </ul>
  )
}

ResultsFollowerGrowthChartLegend.propTypes = {
  items: PropTypes.array.isRequired,
}

export default ResultsFollowerGrowthChartLegend
