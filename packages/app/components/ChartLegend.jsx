import React from 'react'
import PropTypes from 'prop-types'

import ChartLegendItem from '@/app/ChartLegendItem'

const ChartLegend = ({ items }) => {
  return (
    <ul className="ml-10 mb-10 text-xs">
      {items.map(({ label, value, color, lineStyle }) => (
        <ChartLegendItem
          key={label}
          label={label}
          value={value}
          color={color}
          lineStyle={lineStyle}
        />
      ))}
    </ul>
  )
}

export default ChartLegend

ChartLegend.propTypes = {
  items: PropTypes.array.isRequired,
}

ChartLegend.defaultProps = {
}
