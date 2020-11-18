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
    case 'soundcloud':
      return {
        title: 'Soundcloud',
        titleVerbose: 'Soundcloud profile',
        baseUrl: 'https://soundcloud.com/',
        placeholderUrl: 'https://soundcloud.com/< account ID>',
        accountIdKey: 'username',
        color: brandColors[platform],
        musicOnly: true,
        editable: true,
      }
    case 'spotify':
      return {
        title: 'Spotify',
        titleVerbose: 'Spotify profile',
        baseUrl: 'https://spotify.com/',
        placeholderUrl: 'https://spotify.com/artist/<artist ID>',
        accountIdKey: 'artist_id',
        color: brandColors[platform],
        musicOnly: true,
        editable: true,
      }
    case 'twitter':
      return {
        title: 'Twitter',
        titleVerbose: 'Twitter profile',
        baseUrl: 'https://twitter.com/',
        placeholderUrl: 'https://twitter.com/<username>',
        accountIdKey: 'username',
        color: brandColors[platform],
        musicOnly: false,
        editable: true,
        hidden: true,
      }
    case 'youtube':
      return {
        title: 'YouTube',
        titleVerbose: 'YouTube channel',
        baseUrl: 'https://youtube.com/',
        placeholderUrl: 'https://youtube.com/channel/<channel ID>',
        channelIdKey: 'channel_id',
        userIdKey: 'user_id',
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
  if (!platform) return null
  const { accountIdKey, channelIdKey, userIdKey } = integrationInfo || getIntegrationInfo({ platform })
  // Handle YouTube
  if (platform === 'youtube') {
    return integration[userIdKey] ?? integration[channelIdKey]
  }
  // Handle the rest
  return integration[accountIdKey]
}

// Get account ID KEY from integration
const getAccountIdKey = (integration, href) => {
  const { platform, accountIdKey } = integration
  // If key is already defined on integration, return it
  if (accountIdKey) return accountIdKey
  const integrationInfo = getIntegrationInfo(integration)
  // Fetch key for youtube
  if (platform === 'youtube') {
    const { channelIdKey, userIdKey } = integrationInfo
    if (href.includes('/user/')) return userIdKey
    return channelIdKey
  }
  // Fetch key for the rest
  return integrationInfo.accountIdKey
}

// Placeholders for empty integrations
const integrationPlaceholders = {
  facebook: null,
  instagram: null,
  spotify: null,
  soundcloud: null,
  twitter: null,
  youtube: null,
}

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
    const isEmpty = !accountId
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

const getIntegrationRegex = (platform) => {
  switch (platform) {
    // https://regexr.com/5et04
    case 'spotify':
      return /^(?:(?:(?:https?:)?\/\/)?open.spotify.com\/|spotify:)(artist)(?:\/|:)([A-Za-z0-9]+)/
    // https://regexr.com/5et0m
    case 'soundcloud':
      return /^(?:(?:https?:)?\/\/)?(?:soundcloud.com|snd.sc)\/([^/]+)/
    case 'youtube':
      return /((http|https):\/\/|)(www\.|)youtube\.com\/(channel\/|c\/|user\/)([a-zA-Z0-9-]+)/
    default:
      return false
  }
}

// TEST FOR VALID INTEGRATION LINK
export const testValidIntegration = (url, platform) => {
  const regexExpression = getIntegrationRegex(platform)
  if (!regexExpression) return false
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
  const accountId = integrationRegex[integrationRegex.length - 1]
  const accountIdKey = getAccountIdKey(integration, href)
  return appServer.updateIntegration(artistId, [{ platform, accountIdKey, value: accountId }])
}
