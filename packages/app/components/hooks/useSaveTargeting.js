import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'
import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import copy from '@/app/copy/targetingPageCopy'
import { track } from '@/helpers/trackingHelpers'
import { trackGoogleBudgetSet } from 'shared/helpers/trackGoogleHelpers'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const getWarningButtons = ({
  warningType,
  isPaused,
  saveTargetingSettings,
  savedState,
  onConfirm = () => {},
  closeAlert,
  feedMinBudgetInfo,
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
        color: 'black',
      },
    ]
  }

  if (warningType === 'pausedWithShortSpendingPeriod') {
    return [
      {
        text: 'Pause Spending',
        onClick: onConfirm,
        color: 'red',
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        color: 'black',
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
          const { currencyCode, currencyOffset } = feedMinBudgetInfo
          track('resume_spending', {
            budget: savedState.budget / currencyOffset,
            currencyCode,
          })
          // TRACK change settings
          track('change_targeting_settings', savedState)
        },
        color: 'red',
      },
      {
        text: 'Save and Keep Paused',
        onClick: () => {
          saveTargetingSettings(savedState)
          // TRACK change settings
          track('change_targeting_settings', savedState)
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
  spendingData = {},
}) => {
  // GET ARTIST CONTEXT
  const { artist: { feedMinBudgetInfo } } = React.useContext(ArtistContext)
  const {
    currencyCode,
    currencyOffset,
    minorUnit: {
      minHard,
      minReccommendedStories,
    },
  } = feedMinBudgetInfo

  const { hasSpentConsecutivelyLessThan30Days, daysOfSpending } = spendingData || {}
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective } = optimizationPreferences
  const hasSalesObjective = objective === 'sales'

  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // SAVE FUNCTION
  const saveTargeting = React.useCallback(async (trigger, newState = null) => {
    const { status } = targetingState
    const isPaused = status === 0
    const savedState = newState || targetingState

    // If first time user, UNPAUSE and SET SETTINGS with no warning
    if (isFirstTimeUser) {
      const unpausedTargetingState = {
        ...savedState,
        status: 1,
      }
      // TRACK
      track('set_daily_budget', {
        budget: savedState.budget / currencyOffset,
        currencyCode,
      })
      trackGoogleBudgetSet()
      return saveTargetingSettings(unpausedTargetingState)
    }

    // Warn about recommended minimum period of spending
    if (togglePauseCampaign && !isPaused && hasSpentConsecutivelyLessThan30Days) {
      const hasMinimumBudget = (!hasSalesObjective && targetingState.budget === minHard) || (hasSalesObjective && targetingState.budget === minReccommendedStories)
      const alertCopy = copy.shortSpendingPeriodWarning(daysOfSpending, hasMinimumBudget)

      const buttons = getWarningButtons({
        warningType: 'pausedWithShortSpendingPeriod',
        onConfirm: () => {
          // Toggle pause
          togglePauseCampaign()

          // Track
          const action = 'pause_spending'
          track(action, {
            budget: savedState.budget,
            currencyCode,
          })
        },
        closeAlert,
      })

      showAlert({ copy: alertCopy, buttons })
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
          track(action, {
            budget: savedState.budget,
            currencyCode,
          })
        },
        isPaused: spendingPaused,
        closeAlert,
        feedMinBudgetInfo,
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
        feedMinBudgetInfo,
      })
      showAlert({ copy: alertCopy, buttons })
      return
    }

    const { budget: oldBudget } = initialTargetingState
    const { budget: newBudget } = savedState
    const budgetChangeDirection = oldBudget > newBudget ? 'decrease' : 'increase'

    // Confirm changing settings
    if (trigger === 'settings') {
      const alertCopy = copy.saveSettingsConfirmation
      const buttons = getWarningButtons({
        warningType: 'saveSettings',
        saveTargetingSettings,
        savedState,
        closeAlert,
        getWarningButtons,
        onConfirm: () => {
          saveTargetingSettings(savedState)
          // TRACK change settings
          track('change_targeting_settings', savedState)
          // TRACK change budget
          if (oldBudget !== newBudget) {
            track('set_daily_budget', {
              budget: savedState.budget / currencyOffset,
              currencyCode,
              direction: budgetChangeDirection,
            })
          }
        },
      })
      showAlert({ copy: alertCopy, buttons })
      return
    }

    // TRACK BUDGET CHANGE
    if (trigger === 'budget') {
      track('set_daily_budget', {
        budget: savedState.budget / currencyOffset,
        currencyCode,
        direction: budgetChangeDirection,
      })
    }

    // Basic save (eg when just changing budget)
    return saveTargetingSettings(savedState)
  }, [saveTargetingSettings, togglePauseCampaign, targetingState, initialTargetingState, showAlert, closeAlert, spendingPaused, isFirstTimeUser, feedMinBudgetInfo])

  return saveTargeting
}

export default useSaveTargeting
