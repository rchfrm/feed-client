import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import { getSaveDisabledReason } from '@/app/helpers/targetingHelpers'

const TargetingBudgetSaveButton = ({
  targetingState,
  saveTargetingSettings,
  disableSaving,
  className,
}) => {
  // GET SAVING FUNCTION
  const saveTargeting = useSaveTargeting({ targetingState, saveTargetingSettings })
  return (
    <Button
      version="green"
      onClick={() => saveTargeting('settings')}
      className={[className].join(' ')}
      disabled={disableSaving}
    >
      {disableSaving ? getSaveDisabledReason(disableSaving) : 'Save Settings and Budget'}
    </Button>
  )
}

TargetingBudgetSaveButton.propTypes = {
  targetingState: PropTypes.object.isRequired,
  saveTargetingSettings: PropTypes.func.isRequired,
  disableSaving: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TargetingBudgetSaveButton.defaultProps = {
  className: null,
}


export default TargetingBudgetSaveButton
