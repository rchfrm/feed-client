import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const CboBudgetSaveButton = ({
  buttonText,
  className,
  cboState,
  saveCampaignSettings,
}) => {
  const saveBudget = React.useCallback(() => {
    console.log('cboState', cboState)
    saveCampaignSettings(cboState)
  }, [cboState, saveCampaignSettings])
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
  buttonText: PropTypes.string,
  className: PropTypes.string,
  cboState: PropTypes.object.isRequired,
  saveCampaignSettings: PropTypes.func.isRequired,
}

CboBudgetSaveButton.defaultProps = {
  buttonText: 'Save Campaign Settings',
  className: null,
}


export default CboBudgetSaveButton
