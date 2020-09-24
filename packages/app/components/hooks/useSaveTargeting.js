import React from 'react'

const useSaveTargeting = ({
  targetingState,
  saveCampaignSettings,
}) => {
  const saveTargeting = React.useCallback((newState = null) => {
    saveCampaignSettings(newState || targetingState)
  }, [saveCampaignSettings, targetingState])

  return saveTargeting
}

export default useSaveTargeting
