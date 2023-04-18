import React from 'react'
import PropTypes from 'prop-types'
import TooltipButton from '@/elements/TooltipButton'

const ResultsAbsoluteChartTooltip = ({
  title,
  message,
  color,
}) => {
  return (
    <div className="flex justify-center items-center -my-2">
      <p className="mb-0 text-center ml-2 -mx-1 text-[10px]" style={{ color, filter: 'brightness(50%)' }}>{title}</p>
      <TooltipButton
        copy={message}
        direction="bottom"
        size="small"
        fill={color}
        buttonStyle={{ filter: 'brightness(50%)' }}
      />
    </div>
  )
}

ResultsAbsoluteChartTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default ResultsAbsoluteChartTooltip
