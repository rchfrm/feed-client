import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const CboBudgetSaveButton = ({
  cboState,
  saveCampaignSettings,
  buttonText,
  className,
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
  cboState: PropTypes.object.isRequired,
  saveCampaignSettings: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  className: PropTypes.string,
}

CboBudgetSaveButton.defaultProps = {
  buttonText: 'Save Campaign Settings',
  className: null,
}


export default CboBudgetSaveButton
