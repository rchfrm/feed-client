import React from 'react'
import PropTypes from 'prop-types'

import CboBudgetSetter from '@/app/CboBudgetSetter'

// Content for the side panel
const CboBudgetMobile = ({
  cboState,
  saveCampaignSettings,
}) => {
  return (
    <div>
      {/* HEADER */}
      <header className="">
        <h3 className="h2">Set a Budget</h3>
      </header>
      <CboBudgetSetter
        cboState={cboState}
        saveCampaignSettings={saveCampaignSettings}
      />
    </div>
  )
}

CboBudgetMobile.propTypes = {
  cboState: PropTypes.object.isRequired,
  saveCampaignSettings: PropTypes.func.isRequired,
}

export default CboBudgetMobile
