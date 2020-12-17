import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import copy from '@/app/copy/targetingPageCopy'
import { track } from '@/app/helpers/trackingHelpers'

const getWarningButtons = ({
  warningType,
  isPaused,
  saveTargetingSettings,
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
          saveTargetingSettings({ ...saveState, status: 1 })
        },
        color: 'red',
      },
      {
        text: 'Save and Keep Paused',
        onClick: () => saveTargetingSettings(saveState),
        color: 'green',
      },
    ]
  }
  return [
    {
      text: 'Save Settings',
      onClick: () => saveTargetingSettings(saveState),
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
  initialTargetingState = {},
  targetingState = {},
  saveTargetingSettings,
  togglePauseCampaign = null,
  spendingPaused,
  isFirstTimeUser = false,
}) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // SAVE FUNCTION
  const saveTargeting = React.useCallback((trigger, newState = null) => {
    const { status } = targetingState
    const isPaused = status === 0
    const saveState = newState || targetingState
    // If first time user, UNPAUSE and SET SETTINGS with no warning
    if (isFirstTimeUser) {
      const unpausedTargetingState = {
        ...saveState,
        status: 1,
      }
      saveTargetingSettings(unpausedTargetingState)
      // TRACK
      track({
        action: 'set_first_budget',
        category: 'controls',
      })
      return
    }
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
        saveTargetingSettings,
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
        saveTargetingSettings,
        saveState,
        closeAlert,
      })
      showAlert({ copy: alertCopy, buttons })
      return
    }
    if (trigger === 'budget') {
      const { budget: oldBudget } = initialTargetingState
      const { budget: newBudget } = saveState
      const changeType = oldBudget >= newBudget ? 'decrease' : 'increase'
      track({
        action: 'change_daily_budget',
        category: 'controls',
        label: changeType,
        value: newBudget,
      })
    }
    // Basic save (eg when just changing budget)
    saveTargetingSettings(saveState)
  }, [saveTargetingSettings, togglePauseCampaign, targetingState, initialTargetingState, showAlert, closeAlert, spendingPaused, isFirstTimeUser])

  return saveTargeting
}

export default useSaveTargeting
