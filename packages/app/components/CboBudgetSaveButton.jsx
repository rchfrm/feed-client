import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const CboBudgetSaveButton = ({ cboState, saveCboState, buttonText, className }) => {
  const saveBudget = React.useCallback(() => {
    console.log('cboState', cboState)
    saveCboState(cboState)
  }, [cboState, saveCboState])
  return (
    <Button
      version="green"
      onClick={saveBudget}
      className={[className].join(' ')}
    >
      {buttonText}
    </Button>
  )
}

CboBudgetSaveButton.propTypes = {
  cboState: PropTypes.object.isRequired,
  saveCboState: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  className: PropTypes.string,
}

CboBudgetSaveButton.defaultProps = {
  buttonText: 'Save Campaign',
  className: null,
}


export default CboBudgetSaveButton
