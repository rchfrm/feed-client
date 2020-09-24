import React from 'react'

const useSaveTargeting = ({
  targetingState,
  saveCampaignSettings,
}) => {
  // HANDLE ALERT
  const saveTargeting = React.useCallback((trigger, newState = null) => {
    saveCampaignSettings(newState || targetingState)
  }, [saveCampaignSettings, targetingState])

  return saveTargeting
}

export default useSaveTargeting
