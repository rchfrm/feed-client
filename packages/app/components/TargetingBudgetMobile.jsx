import React from 'react'
import PropTypes from 'prop-types'

import TargetingBudgetSetter from '@/app/TargetingBudgetSetter'

// Content for the side panel
const TargetingBudgetMobile = ({
  currency,
  minReccBudget,
  minHardBudget,
  initialBudget,
  targetingState,
  updateTargetingBudget,
}) => {
  return (
    <div>
      {/* HEADER */}
      <header className="">
        <h3 className="h2">Set a Budget</h3>
      </header>
      <TargetingBudgetSetter
        currency={currency}
        minReccBudget={minReccBudget}
        minHardBudget={minHardBudget}
        initialBudget={initialBudget}
        targetingState={targetingState}
        updateTargetingBudget={updateTargetingBudget}
        mobileVersion
      />
    </div>
  )
}

TargetingBudgetMobile.propTypes = {
  currency: PropTypes.string,
  minReccBudget: PropTypes.number.isRequired,
  minHardBudget: PropTypes.number.isRequired,
  initialBudget: PropTypes.number.isRequired,
  targetingState: PropTypes.object.isRequired,
  updateTargetingBudget: PropTypes.func.isRequired,
}

TargetingBudgetMobile.defaultProps = {
  currency: '',
}


export default TargetingBudgetMobile
