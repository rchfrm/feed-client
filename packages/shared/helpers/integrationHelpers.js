import brandColors from '@/constants/brandColors'
import * as utils from '@/helpers/utils'

import * as appServer from '@/app/helpers/appServer'

// INTEGRATION UTILS
// ------------------

// Get integration info from handle
export const getIntegrationInfo = (integration) => {
  const { platform } = integration
  switch (platform) {
    case 'facebook':
      return {
        title: 'Facebook',
        titleVerbose: 'Facebook page',
        baseUrl: 'https://facebook.com/',
        placeholderUrl: 'https://facebook.com/<page ID>',
        accountIdKey: 'page_id',
        color: brandColors[platform],
      }
    case 'instagram':
      return {
        title: 'Instagram',
        titleVerbose: 'Instagram profile',
        baseUrl: 'https://instagram.com/',
        placeholderUrl: 'https://instagram.com/<username>',
        accountIdKey: 'username', // TODO
        color: brandColors[platform],
      }
    case 'spotify':
      return {
        title: 'Spotify',
        titleVerbose: 'Spotify profile',
        baseUrl: 'https://spotify.com/',
        placeholderUrl: 'https://open.spotify.com/artist/<artist ID>',
        accountIdKey: 'artist_id',
        color: brandColors[platform],
        musicOnly: true,
        editable: true,
      }
    case 'tiktok':
      return {
        title: 'TikTok',
        titleVerbose: 'TikTok profile',
        baseUrl: 'https://tiktok.com/',
        placeholderUrl: 'https://tiktok.com/<username>',
        accountIdKey: 'username',
        color: brandColors[platform],
        editable: true,
      }
    default:
      return {}
  }
}

// Get URL from integration
export const getIntegrationUrl = (integration, baseUrl) => {
  const { accountId, url } = integration
  if (url) return url
  const initialUrl = baseUrl || getIntegrationInfo(integration).baseUrl
  return `${initialUrl}${accountId}`
}

// Get account ID from integration
const getAccountId = (integration = {}, integrationInfo) => {
  const { platform } = integration
  if (! platform) return null
  const { accountIdKey } = integrationInfo || getIntegrationInfo({ platform })
  // TODO: Once we've build the functionality to ask the user which advertiser to use, return the real account id
  if (platform === 'tiktok' && Object.prototype.hasOwnProperty.call(integration, 'advertiser_id')) {
    return 'tikTokAccountId'
  }
  // Handle the rest
  return integration[accountIdKey]
}

// Get account ID KEY from integration
const getAccountIdKey = (integration) => {
  const { accountIdKey } = integration
  // If key is already defined on integration, return it
  if (accountIdKey) return accountIdKey
  const integrationInfo = getIntegrationInfo(integration)
  // Fetch key for the rest
  return integrationInfo.accountIdKey
}

// Placeholders for empty integrations
const integrationPlaceholders = {
  facebook: null,
  instagram: null,
  spotify: null,
  tiktok: null,
}

export const dummyIntegrations = [
  {
    platform: 'facebook',
    title: 'Facebook',
    color: '',
  },
  {
    platform: 'instagram',
    title: 'Instagram',
    color: '',
  },
  {
    platform: 'spotify',
    title: 'Spotify',
    color: '',
  },
  {
    platform: 'tiktok',
    title: 'TikTok',
    color: '',
  },
]

export const dummyIntegrationLinks = [
  {
    platform: 'facebook',
    href: 'not connected',
    titleVerbose: 'Facebook page',
  },
  {
    platform: 'instagram',
    href: 'not connected',
    titleVerbose: 'Instagram profile',
  },
  {
    platform: 'spotify',
    href: 'not connected',
    titleVerbose: 'Spotify profile',
  },
  {
    platform: 'tiktok',
    href: 'not connected',
    titleVerbose: 'TikTok profile',
  },
]

// Remove non-musician INTs and add more info
export const formatAndFilterIntegrations = (integrations, isMusician, ignoreEmpty = false) => {
  // Fill in missing server Ints with placeholders
  const integrationsMerged = {
    ...integrationPlaceholders,
    ...integrations,
  }
  const integrationsArray = Object.entries(integrationsMerged).reduce((filteredIntegrations, [platform, integration]) => {
    const integrationInfo = getIntegrationInfo({ platform })
    const accountId = getAccountId({ ...integration, platform }, integrationInfo)
    const isEmpty = ! accountId
    if (ignoreEmpty && isEmpty) return filteredIntegrations
    // Else add to list with title and url
    return [...filteredIntegrations, {
      ...integration,
      ...integrationInfo,
      platform,
      accountId,
    }]
  }, [])
  return utils.sortArrayByKey(integrationsArray, 'platform')
}


// INEGRATRION SANITISATION
// -------------------------

// Get integration regex
/**
 * @param {string} platform handle of platform
 * @param {boolean} trim true if regex is used to trim off URL
 * @returns {string}
 */
export const getIntegrationRegex = (platform, trim) => {
  switch (platform) {
    // https://regexr.com/5et04
    case 'spotify':
      if (trim) return /^(?:(?:(?:https?:)?\/\/)?open.spotify.com\/|spotify:)(artist)(?:\/|:)/
      return /^(?:(?:(?:https?:)?\/\/)?open.spotify.com\/|spotify:)(artist)(?:\/|:)([A-Za-z0-9]+)/
    case 'instagram':
      if (trim) return /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\//
      return /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_.]+)/
    case 'facebook':
      if (trim) return /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?/
      return /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?([\w-]*)?/
    default:
      return false
  }
}

// TEST FOR VALID INTEGRATION LINK
export const testValidIntegration = (url, platform) => {
  const regexExpression = getIntegrationRegex(platform)
  if (! regexExpression) return false
  const reqexTest = new RegExp(regexExpression)
  return url.match(reqexTest)
}


// SAVE/EDIT INTEGRATIONS
export const updateIntegration = async (artistId, integration, href, action = 'add') => {
  const { platform } = integration
  // DELETE
  if (action === 'delete') {
    return appServer.updateIntegration(artistId, [{ platform, value: null }])
  }
  const integrationRegex = testValidIntegration(href, platform)
  const accountId = integrationRegex.filter(Boolean).pop()
  const accountIdKey = getAccountIdKey(integration)
  return appServer.updateIntegration(artistId, [{ platform, accountIdKey, value: accountId }])
}
