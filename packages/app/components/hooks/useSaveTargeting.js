import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'

import copy from '@/app/copy/targetingPageCopy'
import { track } from '@/app/helpers/trackingHelpers'

const getWarningButtons = ({
  warningType,
  isPaused,
  saveTargetingSettings,
  savedState,
  onConfirm = () => {},
  closeAlert,
}) => {
  if (warningType === 'togglePause') {
    return [
      {
        text: isPaused ? 'Resume Spending' : 'Pause Spending',
        onClick: onConfirm,
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
          saveTargetingSettings({ ...savedState, status: 1 })
          // TRACK resume spending
          track({
            action: 'resume_spending',
            category: 'controls',
          })
          // TRACK change settings
          track({
            action: 'change_targeting_default',
            category: 'controls',
          })
        },
        color: 'red',
      },
      {
        text: 'Save and Keep Paused',
        onClick: () => {
          saveTargetingSettings(savedState)
          // TRACK change settings
          track({
            action: 'change_targeting_default',
            category: 'controls',
          })
        },
        color: 'green',
      },
    ]
  }
  return [
    {
      text: 'Save Settings',
      // CONFIRM SAVE SETTINGS
      onClick: onConfirm,
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
    const savedState = newState || targetingState
    // If first time user, UNPAUSE and SET SETTINGS with no warning
    if (isFirstTimeUser) {
      const unpausedTargetingState = {
        ...savedState,
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
        onConfirm: () => {
          // TOGGLE PAUSE
          togglePauseCampaign()
          // TRACK
          const action = spendingPaused ? 'resume_spending' : 'pause_spending'
          track({
            action,
            category: 'controls',
          })
        },
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
        savedState,
      })
      showAlert({ copy: alertCopy, buttons })
      return
    }
    const { budget: oldBudget } = initialTargetingState
    const { budget: newBudget } = savedState
    const budgetChangeType = oldBudget >= newBudget ? 'decrease' : 'increase'
    // Confirm changing settings
    if (trigger === 'settings') {
      const alertCopy = copy.saveSettingsConfirmation
      const buttons = getWarningButtons({
        warningType: 'saveSettings',
        onConfirm: () => {
          saveTargetingSettings(savedState)
          // TRACK change settings
          track({
            action: 'change_targeting_default',
            category: 'controls',
          })
          // TRACK change budget
          if (oldBudget !== newBudget) {
            track({
              action: 'change_daily_budget',
              category: 'controls',
              label: budgetChangeType,
              value: newBudget,
            })
          }
        },
        saveTargetingSettings,
        savedState,
        closeAlert,
      })
      showAlert({ copy: alertCopy, buttons })
      return
    }
    // TRACK BUDGET CHANGE
    if (trigger === 'budget') {
      track({
        action: 'change_daily_budget',
        category: 'controls',
        label: budgetChangeType,
        value: newBudget,
      })
    }
    // Basic save (eg when just changing budget)
    saveTargetingSettings(savedState)
  }, [saveTargetingSettings, togglePauseCampaign, targetingState, initialTargetingState, showAlert, closeAlert, spendingPaused, isFirstTimeUser])

  return saveTargeting
}

export default useSaveTargeting
