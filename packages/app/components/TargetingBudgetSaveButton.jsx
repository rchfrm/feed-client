import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const TargetingBudgetSaveButton = ({
  buttonText,
  className,
  targetingState,
  saveCampaignSettings,
}) => {
  const saveBudget = React.useCallback(() => {
    console.log('targetingState', targetingState)
    saveCampaignSettings(targetingState)
  }, [targetingState, saveCampaignSettings])
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

TargetingBudgetSaveButton.propTypes = {
  buttonText: PropTypes.string,
  className: PropTypes.string,
  targetingState: PropTypes.object.isRequired,
  saveCampaignSettings: PropTypes.func.isRequired,
}

TargetingBudgetSaveButton.defaultProps = {
  buttonText: 'Save Campaign Settings',
  className: null,
}


export default TargetingBudgetSaveButton
