import React from 'react'
import moment from 'moment'

import useAlertModal from '@/hooks/useAlertModal'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import TargetingBudgetPauseAlert from '@/app/TargetingBudgetPauseAlert'

import copy from '@/app/copy/targetingPageCopy'
import { track } from '@/helpers/trackingHelpers'
import { trackGoogleBudgetSet } from 'shared/helpers/trackGoogleHelpers'

const getWarningButtons = ({
  warningType,
  saveTargetingSettings,
  savedState,
  onConfirm = () => {},
  closeAlert,
  feedMinBudgetInfo,
}) => {
  if (warningType === 'resumeSpending') {
    return [
      {
        text: 'Resume Spending',
        onClick: onConfirm,
      },
      {
        text: 'Cancel',
        onClick: closeAlert,
        version: 'secondary',
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
      },
      {
        text: 'Save and Keep Paused',
        onClick: () => {
          saveTargetingSettings(savedState)
          // TRACK change settings
          track('change_targeting_settings', savedState)
        },
        version: 'secondary',
      },
    ]
  }
  return [
    {
      text: 'Save Settings',
      // CONFIRM SAVE SETTINGS
      onClick: onConfirm,
    },
    {
      text: 'Cancel',
      onClick: closeAlert,
      version: 'secondary',
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
  setIsCampaignEdit,
}) => {
  // GET ARTIST CONTEXT
  const { artist: { feedMinBudgetInfo } } = React.useContext(ArtistContext)
  const {
    currencyCode,
    currencyOffset,
  } = feedMinBudgetInfo

  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // SAVE FUNCTION
  const saveTargeting = React.useCallback(async (trigger, newState = null) => {
    const { status } = targetingState
    const isPaused = status === 0
    const savedState = newState || targetingState

    // If first time user, SET SETTINGS with no warning
    if (isFirstTimeUser) {
      track('set_daily_budget', {
        budget: savedState.budget / currencyOffset,
        currencyCode,
      })

      trackGoogleBudgetSet()
      return saveTargetingSettings(savedState)
    }

    if (isPaused && togglePauseCampaign) {
      const alertCopy = copy.togglePauseWarning(spendingPaused)

      const buttons = getWarningButtons({
        warningType: 'resumeSpending',
        onConfirm: () => {
          togglePauseCampaign()

          const action = 'resume_spending'
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

    if (togglePauseCampaign) {
      const children = (
        <TargetingBudgetPauseAlert
          onConfirm={togglePauseCampaign}
          budget={savedState.budget}
          spendingData={spendingData}
          currency={currencyCode}
          closeAlert={closeAlert}
        />
      )

      showAlert({ children })
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

    if (trigger === 'campaignBudget') {
      const shouldStartSpendingToday = moment().isSame(moment(savedState.campaignBudget.startDate), 'day')
      const updatedState = {
        ...savedState,
        status: shouldStartSpendingToday ? 1 : 0,
      }

      if (! savedState.campaignBudget.startDate) {
        const onConfirm = () => {
          saveTargetingSettings(updatedState)
          setIsCampaignEdit(true)
        }

        const children = (
          <TargetingBudgetPauseAlert
            onConfirm={onConfirm}
            budget={updatedState.budget}
            spendingData={spendingData}
            currency={currencyCode}
            closeAlert={closeAlert}
          />
        )

        showAlert({ children })
        return
      }

      return saveTargetingSettings(updatedState)
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
  }, [saveTargetingSettings, togglePauseCampaign, targetingState, initialTargetingState, showAlert, closeAlert, spendingPaused, isFirstTimeUser, feedMinBudgetInfo, currencyCode, currencyOffset, spendingData, setIsCampaignEdit])

  return saveTargeting
}

export default useSaveTargeting
