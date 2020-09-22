import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const TargetingBudgetSaveButton = ({
  targetingState,
  saveCampaignSettings,
  disableSaving,
  className,
}) => {
  const saveBudget = React.useCallback(() => {
    saveCampaignSettings(targetingState)
  }, [targetingState, saveCampaignSettings])
  return (
    <Button
      version="green"
      onClick={saveBudget}
      className={[className].join(' ')}
      disabled={disableSaving}
    >
      {disableSaving ? 'Budget is too small' : 'Save Settings and Budget'}
    </Button>
  )
}

TargetingBudgetSaveButton.propTypes = {
  targetingState: PropTypes.object.isRequired,
  saveCampaignSettings: PropTypes.func.isRequired,
  disableSaving: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TargetingBudgetSaveButton.defaultProps = {
  className: null,
}


export default TargetingBudgetSaveButton
