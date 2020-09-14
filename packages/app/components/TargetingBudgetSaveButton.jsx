import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const TargetingBudgetSaveButton = ({
  className,
  targetingState,
  saveCampaignSettings,
  budgetFormatted,
}) => {
  const saveBudget = React.useCallback(() => {
    saveCampaignSettings(targetingState)
  }, [targetingState, saveCampaignSettings])
  return (
    <Button
      version="green"
      onClick={saveBudget}
      className={[className].join(' ')}
    >
      Save budget of {budgetFormatted}
    </Button>
  )
}

TargetingBudgetSaveButton.propTypes = {
  className: PropTypes.string,
  targetingState: PropTypes.object.isRequired,
  saveCampaignSettings: PropTypes.func.isRequired,
  budgetFormatted: PropTypes.string.isRequired,
}

TargetingBudgetSaveButton.defaultProps = {
  className: null,
}


export default TargetingBudgetSaveButton
