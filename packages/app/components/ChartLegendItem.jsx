import React from 'react'
import PropTypes from 'prop-types'

const ChartLegendItem = ({ label, value, color, lineStyle }) => {
  return (
    <li key={label} className="flex items-center mb-2">
      <span
        className="inline-block w-6 mr-3 border-t-2 border-dashed border-black"
        style={{
          borderColor: color,
          borderStyle: lineStyle,
        }}
      />
      {label},
      <span className="ml-1 font-bold">
        {value > 0 ? `${value.toFixed(1)}%` : '??'}
      </span>
    </li>
  )
}

export default ChartLegendItem

ChartLegendItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  color: PropTypes.string.isRequired,
  lineStyle: PropTypes.string.isRequired,
}

ChartLegendItem.defaultProps = {
  value: 0,
}
