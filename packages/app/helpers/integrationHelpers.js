import brandColors from '@/constants/brandColors'

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
  console.log('brandColors[platform]', brandColors[platform])
  switch (platform) {
    case 'facebook':
      return {
        title: 'Facebook',
        baseUrl: 'https://facebook.com/',
        color: brandColors[platform],
      }
    case 'instagram':
      return {
        title: 'Instagram',
        baseUrl: 'https://instagram.com/',
        color: brandColors[platform],
      }
    case 'soundcloud':
      return {
        title: 'Soundcloud',
        baseUrl: 'https://soundcloud.com/',
        color: brandColors[platform],
        musicOnly: true,
        editable: true,
      }
    case 'spotify':
      return {
        title: 'spotify',
        baseUrl: 'https://spotify.com/',
        color: brandColors[platform],
        musicOnly: true,
        editable: true,
      }
    case 'youtube':
      return {
        title: 'youtube',
        baseUrl: 'https://youtube.com/',
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
export const formatAndFilterIntegrations = (integrations, isMusician) => {
  return integrations.reduce((filteredList, integration) => {
    const integrationInfo = getIntegrationInfo(integration)
    const { musicOnly, baseUrl } = integrationInfo
    // Ignore music integration if not a musician
    if (musicOnly && !isMusician) return filteredList
    // Else add to list with title and url
    return [...filteredList, {
      ...integration,
      ...integrationInfo,
      link: getIntegrationUrl(integration, baseUrl),
    }]
  }, [])
}
