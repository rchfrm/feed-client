import React from 'react'
import PropTypes from 'prop-types'

import ChartLegend from '@/app/ChartLegend'
import MarkdownText from '@/elements/MarkdownText'

const ResultsChartHeader = ({ description, legendItems, className }) => {
  return (
    <div className={[
      'w-full xs:w-3/4 lg:w-1/2  mb-4 text-xs',
      className,
    ].join(' ')}
    >
      <MarkdownText markdown={description} className="text-xs" />
      <ChartLegend
        items={legendItems}
      />
    </div>
  )
}

ResultsChartHeader.propTypes = {
  description: PropTypes.string.isRequired,
  legendItems: PropTypes.array,
}

ResultsChartHeader.defaultProps = {
  legendItems: [],
}

export default ResultsChartHeader
