import React from 'react'
import PropTypes from 'prop-types'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import Button from '@/elements/Button'

import { getSaveDisabledReason } from '@/app/helpers/targetingHelpers'

import copy from '@/app/copy/targetingPageCopy'

const TargetingSettingsSaveContainer = ({
  disableSaving,
  initialTargetingState,
  targetingState,
  saveTargetingSettings,
  isFirstTimeUser,
  children,
}) => {
  // GET SAVE FUNCTION
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings, isFirstTimeUser })
  return (
    <div
      className={[
        'pt-5 pb-10',
        disableSaving ? 'border-r-0 border-l-0 border-b-0 border-t-2' : 'border-0',
      ].join(' ')}
    >
      <div className="mb-5">
        <Button
          version="green"
          className="w-full"
          onClick={() => saveTargeting('settings')}
          disabled={!!disableSaving}
        >
          {disableSaving ? (
            getSaveDisabledReason(disableSaving)
          ) : copy.saveSettingsButton(isFirstTimeUser)}
        </Button>
      </div>
      {/* EXTRA CONTENT */}
      {children}
    </div>
  )
}

TargetingSettingsSaveContainer.propTypes = {
  disableSaving: PropTypes.string,
  initialTargetingState: PropTypes.object.isRequired,
  targetingState: PropTypes.object.isRequired,
  saveTargetingSettings: PropTypes.func.isRequired,
  isFirstTimeUser: PropTypes.bool.isRequired,
  children: PropTypes.node,
}

TargetingSettingsSaveContainer.defaultProps = {
  disableSaving: '',
  children: null,
}


export default TargetingSettingsSaveContainer
