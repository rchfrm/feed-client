import React from 'react'

import useAlertModal from '@/hooks/useAlertModal'

const useSaveTargeting = ({
  targetingState,
  saveCampaignSettings,
}) => {
  // HANDLE ALERT
  const { showAlert, closeAlert } = useAlertModal()
  // SAVE FUNCTION
  const saveTargeting = React.useCallback((trigger, newState = null) => {
    const { paused: isPaused } = targetingState
    // Warn about updating settings when paused
    if (isPaused && trigger === 'settings') {
      const alertCopy = 'Are you sure?'
      showAlert({ copy: alertCopy })
      console.log('SHOW ALERT')
      return
    }
    saveCampaignSettings(newState || targetingState)
  }, [saveCampaignSettings, targetingState, showAlert])

  return saveTargeting
}

export default useSaveTargeting
