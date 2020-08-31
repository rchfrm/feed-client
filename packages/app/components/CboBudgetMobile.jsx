import React from 'react'
import PropTypes from 'prop-types'

const CboBudgetMobile = ({
  cboState,
  setCboState,
}) => {
  return (
    <div>
      Budget
    </div>
  )
}

CboBudgetMobile.propTypes = {
  cboState: PropTypes.object.isRequired,
  setCboState: PropTypes.func.isRequired,
}

export default CboBudgetMobile
