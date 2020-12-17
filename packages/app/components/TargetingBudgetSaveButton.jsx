import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import { getSaveDisabledReason } from '@/app/helpers/targetingHelpers'

import copy from '@/app/copy/targetingPageCopy'

const TargetingBudgetSaveButton = ({
  initialTargetingState,
  targetingState,
  saveTargetingSettings,
  disableSaving,
  isFirstTimeUser,
  className,
}) => {
  // GET SAVING FUNCTION
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser })
  return (
    <Button
      version="green"
      onClick={() => saveTargeting('settings')}
      className={[className].join(' ')}
      disabled={disableSaving}
    >
      {disableSaving ? getSaveDisabledReason(disableSaving) : copy.saveSettingsButtonMobile(isFirstTimeUser)}
    </Button>
  )
}

TargetingBudgetSaveButton.propTypes = {
  initialTargetingState: PropTypes.object.isRequired,
  targetingState: PropTypes.object.isRequired,
  saveTargetingSettings: PropTypes.func.isRequired,
  disableSaving: PropTypes.bool.isRequired,
  isFirstTimeUser: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TargetingBudgetSaveButton.defaultProps = {
  className: null,
}


export default TargetingBudgetSaveButton
