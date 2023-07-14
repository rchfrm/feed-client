import React from 'react'
import PropTypes from 'prop-types'

const ChartLegendItem = ({ label, description, color, hasGradient }) => {
  return (
    <li key={label} className="flex flex-col mr-10 text-[10px]">
      <span
        className={[
          'inline-block w-8 mb-3',
          hasGradient ? 'h-2 bg-gradient-to-t from-white' : 'h-1',
        ].join(' ')}
        style={{
          backgroundColor: color,
        }}
      />
      {label && <span className="mb-1" style={{ color }}>{label}</span>}
      <span>{description}</span>
    </li>
  )
}

ChartLegendItem.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  hasGradient: PropTypes.bool,
}

ChartLegendItem.defaultProps = {
  hasGradient: PropTypes.false,
}

export default ChartLegendItem
