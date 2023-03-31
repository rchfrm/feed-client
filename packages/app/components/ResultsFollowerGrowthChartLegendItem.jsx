import React from 'react'
import PropTypes from 'prop-types'

const ResultsFollowerGrowthChartLegendItem = ({ label, description, color }) => {
  return (
    <li key={label} className="flex flex-col mr-10 text-[10px]">
      <span
        className="inline-block w-8 mb-3 border-t-3 border-solid border-black"
        style={{
          borderColor: color,
        }}
      />
      <span className="mb-1" style={{ color }}>{label}</span>
      <span>{description}</span>
    </li>
  )
}

ResultsFollowerGrowthChartLegendItem.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default ResultsFollowerGrowthChartLegendItem
