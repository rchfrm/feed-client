import React from 'react'
import PropTypes from 'prop-types'

import CboBudgetSetter from '@/app/CboBudgetSetter'

// Content for the side panel
const CboBudgetMobile = ({
  cboState,
  setCboState,
}) => {
  return (
    <div>
      {/* HEADER */}
      <header className="">
        <h3 className="h2">Budget</h3>
      </header>
      <CboBudgetSetter
        cboState={cboState}
        setCboState={setCboState}
      />
    </div>
  )
}

CboBudgetMobile.propTypes = {
  cboState: PropTypes.object.isRequired,
  setCboState: PropTypes.func.isRequired,
}

export default CboBudgetMobile
