import React from 'react'

import useControlsStore from '@/app/stores/controlsStore'
import useBillingStore from '@/app/stores/billingStore'

import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { TargetingContext } from '@/app/contexts/TargetingContext'

import { getArtistIntegrationByPlatform, profileStatus } from '@/app/helpers/artistHelpers'
import { getLinkById } from '@/app/helpers/linksHelpers'
import { getLocalStorage } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
  postsPreferences: state.postsPreferences,
  optimizationPreferences: state.optimizationPreferences,
  updateProfileSetUpStatus: state.updateProfileSetUpStatus,
  budget: state.budget,
})

const getBillingStoreState = (state) => ({
  defaultPaymentMethod: state.defaultPaymentMethod,
})

const useCheckProfileSetupStatus = () => {
  const [enabledPosts, setEnabledPosts] = React.useState([])
  // Get local storage state
  const wizardState = JSON.parse(getLocalStorage('getStartedWizard'))
  const { objective: storedObjective, platform: storedPlatform, defaultLink: storedDefaultLink } = wizardState || {}

  // Get controls store values
  const {
    nestedLinks,
    postsPreferences,
    optimizationPreferences,
  } = useControlsStore(getControlsStoreState)

  const { defaultPaymentMethod } = useBillingStore(getBillingStoreState)

  const { defaultPromotionEnabled } = postsPreferences
  const objective = optimizationPreferences.objective || storedObjective
  const platform = optimizationPreferences.platform || storedPlatform
  const defaultLink = getLinkById(nestedLinks, postsPreferences?.defaultLinkId) || storedDefaultLink

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
  const adAccountId = facebookIntegration?.adaccount_id
  const facebookPixelId = facebookIntegration?.pixel_id
  const hasSufficientBudget = (!hasSalesObjective && Boolean(dailyBudget)) || (hasSalesObjective && dailyBudget >= minReccomendedStories)

  // Get user context value
  const { user } = React.useContext(UserContext)

  // Get targeting context values
  const { locations } = React.useContext(TargetingContext)

  // Define profile setup conditions
  const profileSetupConditions = React.useMemo(() => [
    {
      name: profileStatus.objective,
      isComplete: Boolean(objective || wizardState?.objective),
    },
    {
      name: profileStatus.platform,
      isComplete: objective !== 'growth' || Boolean(platform || wizardState?.platform),
    },
    {
      name: profileStatus.defaultLink,
      isComplete: Boolean(defaultLink?.href || wizardState?.defaultLink?.href),
    },
    {
      name: profileStatus.connectProfile,
      isComplete: Boolean(user.artists.length),
    },
    {
      name: profileStatus.posts,
      isComplete: Boolean(enabledPosts.length),
    },
    {
      name: profileStatus.defaultPostPromotion,
      isComplete: defaultPromotionEnabled !== null,
    },
    {
      name: profileStatus.adAccount,
      isComplete: Boolean(adAccountId),
    },
    {
      name: profileStatus.facebookPixel,
      isComplete: objective === 'growth' || Boolean(facebookPixelId),
    },
    {
      name: profileStatus.location,
      isComplete: (Object.keys(locations || {}).length || artist.country_code),
    },
    {
      name: profileStatus.budget,
      isComplete: hasSufficientBudget,
    },
    {
      name: profileStatus.paymentMethod,
      isComplete: Boolean(defaultPaymentMethod),
    },
  ], [adAccountId, artist.country_code, defaultLink?.href, locations, defaultPromotionEnabled, facebookPixelId, hasSufficientBudget, objective, platform, enabledPosts, user.artists.length, wizardState?.defaultLink?.href, wizardState?.objective, wizardState?.platform, defaultPaymentMethod])

  const getProfileSetupStatus = () => {
    return profileSetupConditions.find((condition) => !condition.isComplete)?.name
  }

  return { getProfileSetupStatus, profileSetupConditions, setEnabledPosts }
}

export default useCheckProfileSetupStatus
