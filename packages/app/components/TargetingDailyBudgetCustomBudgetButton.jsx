import React from 'react'
import PropTypes from 'prop-types'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const TargetingDailyBudgetCustomBudgetButton = ({
  showCustomBudget,
  setShowCustomBudget,
  initialBudget,
  minBase,
  minHardBudget,
  className,
}) => {
  // Set initial state
  const { sliderValueRange } = React.useMemo(() => {
    return targetingHelpers.calcBudgetSliderConfig(minBase, minHardBudget, initialBudget)
  }, [minBase, minHardBudget, initialBudget])
  React.useEffect(() => {
    const showCustomInitially = initialBudget > sliderValueRange[1]
    setShowCustomBudget(showCustomInitially)
  // eslint-disable-next-line
  }, [])

  return (
    <a
      className={[
        'underline text-xs font-normal',
        className,
      ].join(' ')}
      role="button"
      onClick={() => setShowCustomBudget(!showCustomBudget)}
    >
      {showCustomBudget ? 'Return to slider view' : 'Enter custom budget'}
    </a>
  )
}

TargetingDailyBudgetCustomBudgetButton.propTypes = {
  showCustomBudget: PropTypes.bool.isRequired,
  setShowCustomBudget: PropTypes.func.isRequired,
  initialBudget: PropTypes.number,
  minBase: PropTypes.number,
  minHardBudget: PropTypes.number,
  className: PropTypes.string,
}

TargetingDailyBudgetCustomBudgetButton.defaultProps = {
  initialBudget: 0,
  minBase: 0,
  minHardBudget: 0,
  className: null,
}

export default TargetingDailyBudgetCustomBudgetButton
