import brandColors from '@/constants/brandColors'
import * as utils from '@/helpers/utils'

export const dummyIntegrations = [
  {
    platform: 'facebook',
    accountId: 'mouseworks',
    url: 'https://facebook.com/mouseworks',
  },
  {
    platform: 'instagram',
    accountId: 'mouseworksPhoto',
  },
  {
    platform: 'soundcloud',
    accountId: 'mouseworksSounds',
  },
  {
    platform: 'spotify',
    accountId: null,
  },
  {
    platform: 'youtube',
    accountId: null,
  },
]

// INTEGRATION UTILS
// ------------------

// Get integration info from handle
export const getIntegrationInfo = (integration) => {
  const { platform } = integration
  switch (platform) {
    case 'facebook':
      return {
        title: 'Facebook',
        baseUrl: 'https://facebook.com/',
        placeholderUrl: 'https://facebook.com/<page ID>',
        color: brandColors[platform],
      }
    case 'instagram':
      return {
        title: 'Instagram',
        baseUrl: 'https://instagram.com/',
        placeholderUrl: 'https://instagram.com/accountName',
        color: brandColors[platform],
      }
    case 'soundcloud':
      return {
        title: 'Soundcloud',
        baseUrl: 'https://soundcloud.com/',
        placeholderUrl: 'https://soundcloud.com/accountName',
        color: brandColors[platform],
        musicOnly: true,
        editable: true,
      }
    case 'spotify':
      return {
        title: 'Spotify',
        baseUrl: 'https://spotify.com/',
        placeholderUrl: 'https://spotify.com/artist/<artist ID>',
        color: brandColors[platform],
        musicOnly: true,
        editable: true,
      }
    case 'youtube':
      return {
        title: 'YouTube',
        baseUrl: 'https://youtube.com/',
        placeholderUrl: 'https://youtube.com/channel/channelId',
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

// Remove non-musician INTs and add more info
export const formatAndFilterIntegrations = (integrations, isMusician, ignoreEmpty = false) => {
  return integrations.reduce((filteredList, integration) => {
    const integrationInfo = getIntegrationInfo(integration)
    const { musicOnly, baseUrl } = integrationInfo
    const isEmpty = !integration.accountId
    // Ignore music integration if not a musician (and not already filled)
    if (musicOnly && !isMusician && isEmpty) return filteredList
    if (ignoreEmpty && isEmpty) return filteredList
    // Else add to list with title and url
    return [...filteredList, {
      ...integration,
      ...integrationInfo,
      link: getIntegrationUrl(integration, baseUrl),
    }]
  }, [])
}


// SAVE/EDIT INTEGRATIONS
export const saveIntegration = (integration, link, action = 'add') => {
  const sanitisedLink = utils.enforceUrlProtocol(link, true)
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('save integration:', integration.platform, `action: ${action}`, `link: ${sanitisedLink}`)
      resolve({ res: true, error: false })
    }, 500)
  })
}
