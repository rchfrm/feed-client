import React from 'react'
import PropTypes from 'prop-types'

import ChartLegend from '@/app/ChartLegend'

const ResultsChartHeader = ({ description, legendItems }) => {
  return (
    <div className="w-full xs:w-3/4 lg:w-1/2  mb-4 text-xs">
      <p>{description}</p>
      <ChartLegend
        items={legendItems}
      />
    </div>
  )
}

ResultsChartHeader.propTypes = {
  description: PropTypes.string.isRequired,
  legendItems: PropTypes.array.isRequired,
}

ResultsChartHeader.defaultProps = {
}

export default ResultsChartHeader
