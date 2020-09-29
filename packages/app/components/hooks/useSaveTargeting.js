import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import copy from '@/app/copy/targetingPageCopy'

const getWarningButtons = ({
  warningType,
  isPaused,
  saveCampaignSettings,
  togglePauseCampaign,
  saveState,
  closeAlert,
}) => {
  if (warningType === 'togglePause') {
    return [
      {
        text: isPaused ? 'Resume Spending' : 'Pause Spending',
        onClick: togglePauseCampaign,
        color: isPaused ? 'green' : 'red',
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'balck',
      },
    ]
  }
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
  return [
    {
      text: 'Save Settings',
      onClick: () => saveCampaignSettings(saveState),
      color: 'green',
    },
    {
      text: 'Cancel',
      onClick: closeAlert,
      color: 'black',
    },
  ]
}

const useSaveTargeting = ({
  targetingState = {},
  saveCampaignSettings,
  togglePauseCampaign = null,
  spendingPaused,
}) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // SAVE FUNCTION
  const saveTargeting = React.useCallback((trigger, newState = null) => {
    const { paused: isPaused } = targetingState
    const saveState = newState || targetingState
    // Warn about toggling paused
    if (togglePauseCampaign) {
      const alertCopy = copy.togglePauseWarning(spendingPaused)
      const buttons = getWarningButtons({
        warningType: 'togglePause',
        togglePauseCampaign,
        isPaused: spendingPaused,
        closeAlert,
      })
      showAlert({ copy: alertCopy, buttons })
      return
    }
    // Warn about updating settings when paused
    if (isPaused && trigger === 'settings') {
      const alertCopy = copy.saveWhenPausedCopy
      const buttons = getWarningButtons({
        warningType: 'saveWhenPaused',
        saveCampaignSettings,
        saveState,
      })
      showAlert({ copy: alertCopy, buttons })
      return
    }
    // Confirm changing settings
    if (trigger === 'settings') {
      const alertCopy = copy.saveSettingsConfirmation
      const buttons = getWarningButtons({
        warningType: 'saveSettings',
        saveCampaignSettings,
        saveState,
        closeAlert,
      })
      showAlert({ copy: alertCopy, buttons })
      return
    }
    // Basic save (eg when just changing budget)
    saveCampaignSettings(saveState)
  }, [saveCampaignSettings, togglePauseCampaign, targetingState, showAlert, closeAlert, spendingPaused])

  return saveTargeting
}

export default useSaveTargeting
