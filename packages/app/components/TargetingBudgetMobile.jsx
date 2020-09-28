import React from 'react'
import PropTypes from 'prop-types'

import TargetingBudgetSetter from '@/app/TargetingBudgetSetter'
import TargetingCustomBudgetButton from '@/app/TargetingCustomBudgetButton'

// Content for the side panel
const TargetingBudgetMobile = ({
  currency,
  currencyOffset,
  minReccBudget,
  minHardBudget,
  initialBudget,
  targetingState,
  updateTargetingBudget,
}) => {
  // TOGGLE CUSTOM BUDGET SETTER
  // Show custom budget input if budget is higher than max slider value
  // GET SLIDER SETTINGS BASED ON MIN BUDGET
  const [showCustomBudget, setShowCustomBudget] = React.useState(false)
  return (
    <div>
      {/* HEADER */}
      <header className="-mt-2">
        <h3 className="h2">Set a Budget</h3>
      </header>
      <div className="absolute--center-y left-0 w-full px-10" style={{ bottom: '50%' }}>
        <TargetingBudgetSetter
          currency={currency}
          currencyOffset={currencyOffset}
          minReccBudget={minReccBudget}
          minHardBudget={minHardBudget}
          initialBudget={initialBudget}
          targetingState={targetingState}
          updateTargetingBudget={updateTargetingBudget}
          showCustomBudget={showCustomBudget}
          mobileVersion
        />
        <TargetingCustomBudgetButton
          className="-ml-2 mt-5 text-right"
          showCustomBudget={showCustomBudget}
          setShowCustomBudget={setShowCustomBudget}
          initialBudget={initialBudget}
          minHardBudget={minHardBudget}
        />
      </div>
    </div>
  )
}

TargetingBudgetMobile.propTypes = {
  currency: PropTypes.string,
  currencyOffset: PropTypes.number,
  minReccBudget: PropTypes.number.isRequired,
  minHardBudget: PropTypes.number.isRequired,
  initialBudget: PropTypes.number.isRequired,
  targetingState: PropTypes.object.isRequired,
  updateTargetingBudget: PropTypes.func.isRequired,
}

TargetingBudgetMobile.defaultProps = {
  currency: '',
  currencyOffset: 0,
}


export default TargetingBudgetMobile
