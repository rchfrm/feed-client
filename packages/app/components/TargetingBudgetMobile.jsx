import React from 'react'
import PropTypes from 'prop-types'

import TargetingBudgetSetter from '@/app/TargetingBudgetSetter'

// Content for the side panel
const TargetingBudgetMobile = ({
  currency,
  minBudget,
  setCboState,
  saveCampaignSettings,
}) => {
  return (
    <div>
      {/* HEADER */}
      <header className="">
        <h3 className="h2">Set a Budget</h3>
      </header>
      <TargetingBudgetSetter
        currency={currency}
        minBudget={minBudget}
        setCboState={setCboState}
        saveCampaignSettings={saveCampaignSettings}
      />
    </div>
  )
}

TargetingBudgetMobile.propTypes = {
  currency: PropTypes.string,
  minBudget: PropTypes.number.isRequired,
  setCboState: PropTypes.func.isRequired,
  saveCampaignSettings: PropTypes.func.isRequired,
}

TargetingBudgetMobile.defaultProps = {
  currency: '',
}


export default TargetingBudgetMobile
