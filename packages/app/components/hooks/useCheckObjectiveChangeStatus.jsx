import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ObjectiveSettingsChangeAlertPlatform from '@/app/ObjectiveSettingsChangeAlertPlatform'
import ObjectiveSettingsChangeAlertDefaultLink from '@/app/ObjectiveSettingsChangeAlertDefaultLink'
import ObjectiveSettingsChangeAlertFacebookPixel from '@/app/ObjectiveSettingsChangeAlertFacebookPixel'
import ObjectiveSettingsChangeAlertBudget from '@/app/ObjectiveSettingsChangeAlertBudget'

import { getArtistIntegrationByPlatform, profileStatus } from '@/app/helpers/artistHelpers'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
})

const useCheckObjectiveChangeStatus = ({ objective, platform }) => {
  const { nestedLinks } = useControlsStore(getControlsStoreState)
  const integrationLink = getLinkByPlatform(nestedLinks, platform)
  const hasSalesObjective = objective === 'sales'

  // Get artist context values
  const { artist } = React.useContext(ArtistContext)

  const {
    feedMinBudgetInfo: {
      majorUnit: {
        minReccomendedStories,
      } = {},
    },
    daily_budget: dailyBudget,
  } = artist

  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const facebookPixelId = facebookIntegration?.pixel_id
  const hasSufficientBudget = !hasSalesObjective || (hasSalesObjective && dailyBudget >= minReccomendedStories)

  // Define objective change conditions
  const objectiveChangeSteps = React.useMemo(() => [
    {
      id: 0,
      name: profileStatus.platform,
      component: <ObjectiveSettingsChangeAlertPlatform />,
      isComplete: objective !== 'growth' || (Boolean(platform) && platform !== 'website'),
    },
    {
      id: 1,
      name: profileStatus.defaultLink,
      component: <ObjectiveSettingsChangeAlertDefaultLink objective={objective} platform={platform} />,
      isComplete: objective === 'growth' && Boolean(integrationLink?.accountId),
    },
    {
      id: 2,
      name: profileStatus.facebookPixel,
      component: <ObjectiveSettingsChangeAlertFacebookPixel />,
      isComplete: objective === 'growth' || Boolean(facebookPixelId),
    },
    {
      id: 3,
      name: profileStatus.budget,
      component: <ObjectiveSettingsChangeAlertBudget />,
      isComplete: hasSufficientBudget,
    },
  ], [objective, platform, integrationLink, facebookPixelId, hasSufficientBudget])

  const getObjectiveChangeSteps = () => {
    return objectiveChangeSteps.filter(({ isComplete }) => !isComplete)
  }

  return { getObjectiveChangeSteps }
}

export default useCheckObjectiveChangeStatus
