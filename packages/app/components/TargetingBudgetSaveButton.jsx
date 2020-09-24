import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

const TargetingBudgetSaveButton = ({
  targetingState,
  saveCampaignSettings,
  disableSaving,
  className,
}) => {
  // GET SAVING FUNCTION
  const saveTargeting = useSaveTargeting({ targetingState, saveCampaignSettings })
  return (
    <Button
      version="green"
      onClick={() => saveTargeting()}
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
