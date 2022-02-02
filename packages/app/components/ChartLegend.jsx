import React from 'react'
import PropTypes from 'prop-types'

const ChartLegend = ({ items }) => {
  return (
    <ul className="ml-10 mb-10 text-xs">
      {items.map(({ label, value, color, lineStyle }) => (
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
