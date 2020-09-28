import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import copy from '@/app/copy/targetingPageCopy'

const getWarningButtons = ({ warningType, saveCampaignSettings, saveState }) => {
  if (warningType === 'saveWhenPaused') {
    return [
      {
        text: 'Save and Resume Spending',
        onClick: () => {
          saveCampaignSettings({ ...saveState, paused: false })
        },
        color: 'red',
      },
      {
        text: 'Save and Keep Paused',
        onClick: () => saveCampaignSettings(saveState),
        color: 'green',
      },
    ]
  }
}

const useSaveTargeting = ({
  targetingState,
  saveCampaignSettings,
}) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // SAVE FUNCTION
  const saveTargeting = React.useCallback((trigger, newState = null) => {
    const { paused: isPaused } = targetingState
    const saveState = newState || targetingState
    // Warn about updating settings when paused
    if (isPaused && trigger === 'settings') {
      const alertCopy = copy.saveWhenPausedCopy
      const buttons = getWarningButtons({
        warningType: 'saveWhenPaused',
        saveCampaignSettings,
        saveState,
      })
      showAlert({ copy: alertCopy, buttons })
      console.log('SHOW ALERT')
      return
    }
    // Basic save
    saveCampaignSettings(saveState)
  }, [saveCampaignSettings, targetingState, showAlert])

  return saveTargeting
}

export default useSaveTargeting
