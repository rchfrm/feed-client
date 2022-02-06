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
      {label}
      {value && (
      <span className="ml-1 font-bold">{value}
        <span>%</span>
      </span>
      )}
    </li>
  )
}

export default ChartLegendItem

ChartLegendItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  lineStyle: PropTypes.string.isRequired,
}

ChartLegendItem.defaultProps = {
}
