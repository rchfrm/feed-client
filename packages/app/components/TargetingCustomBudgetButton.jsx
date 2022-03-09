import React from 'react'
import PropTypes from 'prop-types'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const TargetingCustomBudgetButton = ({
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
      {showCustomBudget ? 'Back' : 'Enter a custom budget'}
    </a>
  )
}

TargetingCustomBudgetButton.propTypes = {
  showCustomBudget: PropTypes.bool.isRequired,
  setShowCustomBudget: PropTypes.func.isRequired,
  initialBudget: PropTypes.number.isRequired,
  minBase: PropTypes.number.isRequired,
  minHardBudget: PropTypes.number.isRequired,
  className: PropTypes.string,
}

TargetingCustomBudgetButton.defaultProps = {
  className: null,
}


export default TargetingCustomBudgetButton
