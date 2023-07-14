import React from 'react'
import PropTypes from 'prop-types'
import ChartLegendItem from '@/app/ChartLegendItem'

const ChartLegend = ({ items }) => {
  return (
    <ul className="flex w-full ml-3 pt-4 border-t border-solid border-grey-light">
      {items.map(({ label, description, color, shouldShow, hasGradient }) => {
        if (! shouldShow) {
          return
        }

        return (
          <ChartLegendItem
            key={label}
            label={label}
            description={description}
            color={color}
            hasGradient={hasGradient}
          />
        )
      })}
    </ul>
  )
}

ChartLegend.propTypes = {
  items: PropTypes.array.isRequired,
}

export default ChartLegend
