import React from 'react'
import PropTypes from 'prop-types'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const TargetingCustomBudgetButton = ({
  showCustomBudget,
  setShowCustomBudget,
  initialBudget,
  minHardBudget,
  className,
  style,
}) => {
  // Set initial state
  const { sliderValueRange } = targetingHelpers.calcBudgetSliderConfig(minHardBudget)
  React.useEffect(() => {
    console.log('d')
    const showCustomInitially = initialBudget > sliderValueRange[1]
    setShowCustomBudget(showCustomInitially)
  // eslint-disable-next-line
  }, [])

  return (
    <p
      className={className}
      style={style}
    >
      <a
        role="button"
        onClick={() => setShowCustomBudget(!showCustomBudget)}
        className="inline-block pt-3 pl-3"
      >
        <em>
          {showCustomBudget ? 'Back' : 'Custom budget'}
        </em>
      </a>
    </p>
  )
}

TargetingCustomBudgetButton.propTypes = {
  showCustomBudget: PropTypes.bool.isRequired,
  setShowCustomBudget: PropTypes.func.isRequired,
  initialBudget: PropTypes.number.isRequired,
  minHardBudget: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

TargetingCustomBudgetButton.defaultProps = {
  className: null,
  style: null,
}


export default TargetingCustomBudgetButton
