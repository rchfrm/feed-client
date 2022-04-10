import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'

const ResultsAbsoluteChartTooltip = ({
  title,
  message,
}) => {
  return (
    <div className="flex justify-center items-center -my-2">
      <p className="mb-0 text-center ml-2 -mx-1" style={{ fontSize: '10px' }}>{title}</p>
      <TooltipButton
        copy={message}
        direction="bottom"
        size="small"
      />
    </div>
  )
}

ResultsAbsoluteChartTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

ResultsAbsoluteChartTooltip.defaultProps = {
}

export default ResultsAbsoluteChartTooltip
