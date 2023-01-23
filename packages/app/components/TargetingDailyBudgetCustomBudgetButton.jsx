import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const TargetingDailyBudgetCustomBudgetButton = ({
  showCustomBudget,
  setShowCustomBudget,
  initialBudget,
  minBase,
  minHardBudget,
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
    <Button
      size="small"
      version="secondary"
      onClick={() => setShowCustomBudget(! showCustomBudget)}
    >
      {showCustomBudget ? 'Return to slider view' : 'Enter custom budget'}
    </Button>
  )
}

TargetingDailyBudgetCustomBudgetButton.propTypes = {
  showCustomBudget: PropTypes.bool.isRequired,
  setShowCustomBudget: PropTypes.func.isRequired,
  initialBudget: PropTypes.number,
  minBase: PropTypes.number,
  minHardBudget: PropTypes.number,
}

TargetingDailyBudgetCustomBudgetButton.defaultProps = {
  initialBudget: 0,
  minBase: 0,
  minHardBudget: 0,
}

export default TargetingDailyBudgetCustomBudgetButton
