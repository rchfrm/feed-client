import React from 'react'
import PropTypes from 'prop-types'

import ChartLegend from '@/app/ChartLegend'

const ResultsChartHeader = ({ title, description, legendItems }) => {
  return (
    <div className="w-full xs:w-1/2 mb-4 text-xs">
      <p className="font-bold text-xl">{title}</p>
      <p>{description}</p>
      <ChartLegend
        items={legendItems}
      />
    </div>
  )
}

ResultsChartHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  legendItems: PropTypes.array.isRequired,
}

ResultsChartHeader.defaultProps = {
}

export default ResultsChartHeader
