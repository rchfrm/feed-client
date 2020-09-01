import React from 'react'
import PropTypes from 'prop-types'

import CboBudgetSetter from '@/app/CboBudgetSetter'

// Content for the side panel
const CboBudgetMobile = ({
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
      <CboBudgetSetter
        currency={currency}
        minBudget={minBudget}
        setCboState={setCboState}
        saveCampaignSettings={saveCampaignSettings}
      />
    </div>
  )
}

CboBudgetMobile.propTypes = {
  currency: PropTypes.string,
  minBudget: PropTypes.number.isRequired,
  setCboState: PropTypes.func.isRequired,
  saveCampaignSettings: PropTypes.func.isRequired,
}

CboBudgetMobile.defaultProps = {
  currency: '',
}


export default CboBudgetMobile
