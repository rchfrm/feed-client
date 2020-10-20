import React from 'react'
import PropTypes from 'prop-types'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const TargetingCustomBudgetButton = ({
  showCustomBudget,
  setShowCustomBudget,
  initialBudget,
  fbMin,
  minHardBudget,
  className,
}) => {
  // Set initial state
  const { sliderValueRange } = React.useMemo(() => {
    return targetingHelpers.calcBudgetSliderConfig(fbMin, minHardBudget, initialBudget)
  }, [fbMin, minHardBudget, initialBudget])
  React.useEffect(() => {
    const showCustomInitially = initialBudget > sliderValueRange[1]
    setShowCustomBudget(showCustomInitially)
  // eslint-disable-next-line
  }, [])



  return (
    <a
      className={[
        'flex items-center',
        'no-underline',
        'px-3 py-1',
        'bg-green text-white',
        'rounded-full',
        className,
      ].join(' ')}
      style={{ paddingBottom: '0.3rem' }}
      role="button"
      onClick={() => setShowCustomBudget(!showCustomBudget)}
    >
      <strong>
        {showCustomBudget ? 'Back' : 'Custom'}
      </strong>
    </a>
  )
}

TargetingCustomBudgetButton.propTypes = {
  showCustomBudget: PropTypes.bool.isRequired,
  setShowCustomBudget: PropTypes.func.isRequired,
  initialBudget: PropTypes.number.isRequired,
  fbMin: PropTypes.number.isRequired,
  minHardBudget: PropTypes.number.isRequired,
  className: PropTypes.string,
}

TargetingCustomBudgetButton.defaultProps = {
  className: null,
}


export default TargetingCustomBudgetButton
