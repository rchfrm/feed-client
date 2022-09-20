import produce from 'immer'
import uniqBy from 'lodash/uniqBy'
import get from 'lodash/get'

import * as utils from '@/helpers/utils'
import * as api from '@/helpers/api'
import { requiredScopesSignup, requiredScopesAccount, requiredScopesAds } from '@/helpers/firebaseHelpers'

import brandColors from '@/constants/brandColors'
import moment from 'moment'

/**
 * @param {string} artist
 * @param {string} [token]
 * @returns {Promise<any>}
 */
export const createArtist = async (artist, plan, token) => {
  return api.post('/artists', {
    name: artist.name,
    location: null,
    integrations: {
      facebook: {
        page_id: artist.page_id,
        instagram_id: artist.instagram_id,
      },
    },
    plan,
  }, token)
}

const sanitiseDataSources = (dataSources) => {
  return uniqBy(dataSources, 'name')
}

/**
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getArtist = async (artistId) => {
  const artist = await api.get(`/artists/${artistId}`)
    .catch((error) => {
      return { error }
    })
  if (artist.error) return { error: artist.error }
  const dataSources = await api.get(`/artists/${artistId}/data_sources`, { fields: 'name', limit: 100 })
    .catch((error) => {
      return { error }
    })
  const sanitisedDataSources = sanitiseDataSources(dataSources)
  // Add data source info to artist
  artist._embedded = { dataSources: sanitisedDataSources }
  artist.URLs = utils.filterArtistUrls(artist)
  return { artist }
}

// Get all available ad accounts
/**
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getAdAccounts = async (artistId) => {
  const requestUrl = `/artists/${artistId}/available_adaccounts`
  const payload = {}
  const errorTracking = {
    category: 'Artist',
    action: 'Get available ad accounts',
  }
  return api.requestWithCatch('get', requestUrl, payload, errorTracking)
}

// Set ad account
/**
* @param {string} artistId
* @param {string} adAccountId
* @returns {Promise<object>} { res, error }
*/
export const setAdAccount = (artistId, adAccountId) => {
  const requestUrl = `/artists/${artistId}`
  const payload = {
    integrations: {
      facebook: {
        adaccount_id: adAccountId,
      },
    },
  }
  const errorTracking = {
    category: 'Artist',
    action: 'Set ad account',
  }
  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}

// Update ad account
/**
* @param {string} artistId
* @param {string} adAccountId
* @returns {Promise<object>} { res, error }
*/
export const updateAdAccount = (artistId, adAccountId) => {
  const requestUrl = `/artists/${artistId}/ad_account_update`
  const payload = {
    adAccountId,
  }
  const errorTracking = {
    category: 'Artist',
    action: 'Update ad account',
  }
  return api.requestWithCatch('post', requestUrl, payload, errorTracking)
}

// Get background tasks
/**
* @param {string} artistId
* @returns {Promise<object>} { res, error }
*/
export const getBackgroundTasks = (artistId) => {
  const requestUrl = `/artists/${artistId}/background_tasks`
  const payload = null
  const errorTracking = {
    category: 'Artist',
    action: 'Get background tasks',
  }
  return api.requestWithCatch('get', requestUrl, payload, errorTracking)
}

// Update country code
/**
* @param {string} artistId
* @param {string} countryCode
* @returns {Promise<object>} { res, error }
*/
export const updateLocation = (artistId, countryCode) => {
  const requestUrl = `/artists/${artistId}`
  const payload = { country_code: countryCode }
  const errorTracking = {
    category: 'Artist',
    action: 'Update country code',
  }
  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}

// Update access token
/**
* @param {string} artistId
* @returns {Promise<object>} { res, error }
*/
export const updateAccessToken = (artistId) => {
  const requestUrl = `/artists/${artistId}/access_token`
  const payload = null
  const errorTracking = {
    category: 'Artist',
    action: 'Update access token',
  }
  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}

/**
 * Create sorted array of artist accounts
 * First show accounts that don't already exists, then sort name alphabetically
 * @param {object} artistAccounts
 * @returns {array}
 */
export const getSortedArtistAccountsArray = (artistAccounts) => {
  return artistAccounts.sort((a, b) => {
    return ((a.exists === b.exists) ? 0 : a.exists ? 1 : -1) || a.name.localeCompare(b.name)
  })
}

/**
 * @returns {Promise<any>}
 */
export const getArtistOnSignUp = async () => {
  const requestUrl = '/artists/available'
  const payload = null
  const errorTracking = {
    category: 'Artist',
    action: 'Get available artists',
  }
  return api.requestWithCatch('get', requestUrl, payload, errorTracking)
}

export const sortArtistsAlphabetically = (artists) => {
  return utils.sortArrayByKey(artists, 'name')
}

/**
 * @param {object} newArtists
 * @param {array} userArtists
 * @returns {object}
 */
export const removeAlreadyConnectedArtists = (newArtists, userArtists) => {
  return produce(newArtists, draftState => {
    userArtists.forEach(({ facebook_page_id }) => {
      delete draftState[facebook_page_id]
    })
  })
}

export const processArtists = async ({ artists }) => {
  const artistsProcessed = Object.values(artists).map((artist) => {
    const {
      instagram_username,
      picture,
      page_id,
      page_token,
    } = artist
    // Get the FB page url
    const facebookPageUrl = `https://www.facebook.com/${page_token || page_id}`
    // Get the Insta page url
    const instaPageUrl = instagram_username ? `https://www.instagram.com/${instagram_username}/` : ''

    // Return processed account
    return {
      ...artist,
      facebook_page_url: facebookPageUrl,
      instagram_url: instaPageUrl,
      picture: `${picture}?width=500`,
    }
  })

  return artistsProcessed
}

/**
 * Receives object of keyed artist account by ID
 * Converts empty strings to null
 * Returns newly formed artist account
 * @param {array} artistAccounts
 * @returns {object}
 */
export const sanitiseArtistAccountUrls = (artistAccount) => {
  return produce(artistAccount, draftState => {
    // Loop over artist props
    Object.entries(artistAccount).forEach(([key, value]) => {
      if (value === '') {
        artistAccount[key] = null
      }
    })
    return draftState
  })
}


/**
 * Gets the artist integration by platform ID
 * @param {object} artist
 * @param {string} platformId
 * @returns {object} integration
 */
export const getArtistIntegrationByPlatform = (artist, platformId) => {
  if (!artist || !artist.id) return null
  return artist.integrations.find(({ platform }) => platform === platformId)
}


// https://developers.facebook.com/tools/explorer/145634995501895/?method=GET&path=fb_page_categories&version=v8.0
export const musicianCategories = [
  {
    name: 'Musician',
    id: 1335670856447673,
  },
  {
    name: 'Musician/Band',
    id: 180164648685982,
  },
  {
    name: 'Band',
    id: 792007097567368,
  },
  {
    name: 'Orchestra',
    id: 103436486409265,
  },
  {
    name: 'Producer',
    id: 1108,
  },
  {
    name: 'Artist',
    id: 1601,
  },
  {
    name: 'Record label',
    id: 1211,
  },
  {
    name: 'Album',
    id: 1200,
  },
  {
    name: 'Choir',
    id: 1664274330313158,
  },
  {
    name: 'Music award',
    id: 1212,
  },
  {
    name: 'Music chart',
    id: 1213,
  },
  {
    name: 'Music video',
    id: 1207,
  },
  {
    name: 'Musical genre',
    id: 1203,
  },
  {
    name: 'Playlist',
    id: 1206,
  },
  {
    name: 'Podcast',
    id: 627651640670228,
  },
  {
    name: 'Record label',
    id: 1211,
  },
  {
    name: 'Song',
    id: 1201,
  },
  {
    name: 'Symphony',
    id: 181815448531059,
  },
  {
    name: 'Music production studio',
    id: 189483194405517,
  },
  {
    name: 'Music school',
    id: 186983191324114,
  },
]



/**
 * Receives array of artist category objects and
 * returns bool if any category makes this account a musician
 * @param {array} artistCategories
 * @returns {boolean}
 */
export const testIfMusician = (artistCategories = []) => {
  const isMusician = artistCategories.some(({ id }) => {
    return musicianCategories.find(({ id: categoryId }) => {
      return id === categoryId.toString()
    })
  })
  return isMusician
}

/**
 * Test whether this account has spotify connected
 * @param {string} spotifyUrl
 * @returns {boolean}
 */
export const testIfSpotifyConnected = (integrations) => {
  const spotifyIntegration = getArtistIntegrationByPlatform({ integrations }, 'spotify')
  return !!spotifyIntegration?.accountId
}

/**
 * Gets the default link from the artist
 * @param {object} artist
 * @returns {string}
 */
export const getDefaultLinkId = (artist) => {
  return get(artist, ['preferences', 'posts', 'default_link_id'], '')
}

/**
 * Gets the preferences from the artist
 * @param {object} artist
 * @returns {object}
 */
export const getPreferences = (artist, type) => {
  const { preferences } = artist
  const formattedPreferencesResponse = {
    ...(type !== 'optimization' && { defaultLinkId: preferences[type].default_link_id, callToAction: preferences[type].call_to_action }),
    ...(type === 'conversions' && { facebookPixelEvent: preferences[type].facebook_pixel_event }),
    ...(type === 'posts' && {
      defaultPromotionEnabled: {
        post: preferences[type].promotion_enabled_default_per_type.post,
        story: preferences[type].promotion_enabled_default_per_type.story,
        reels: preferences[type].promotion_enabled_default_per_type.reels,
      },
    }),
    ...(type === 'optimization' && { objective: preferences[type].objective, platform: preferences[type].platform }),
  }
  return formattedPreferencesResponse
}

export const hasConnectedIntegration = (artist, platform) => {
  const integration = getArtistIntegrationByPlatform(artist, platform)

  return Boolean(integration?.accountId)
}

export const getMissingScopes = ({ grantedScopes, artist }) => {
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const authorizedScopes = (grantedScopes || facebookIntegration?.authorization.scopes).filter((scope) => scope !== 'public_profile')

  const filterRequiredScopes = (requiredScopes) => {
    return requiredScopes.filter((scope) => !authorizedScopes.includes(scope))
  }

  return {
    signUp: filterRequiredScopes(requiredScopesSignup),
    account: filterRequiredScopes(requiredScopesAccount),
    ads: filterRequiredScopes(requiredScopesAds),
  }
}

// Update optimization objective
/**
* @param {string} artistId
* @param {string} objective
* @returns {Promise<object>} { res, error }
*/
export const updateObjective = (artistId, objective) => {
  const requestUrl = `/artists/${artistId}`
  const payload = {
    preferences: {
      optimization: {
        objective,
      },
    },
  }

  const errorTracking = {
    category: 'Artist',
    action: 'Update optimization objective',
  }
  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}

// Update optimization platform
/**
* @param {string} artistId
* @param {string} platform
* @returns {Promise<object>} { res, error }
*/
export const updatePlatform = (artistId, platform) => {
  const requestUrl = `/artists/${artistId}`
  const payload = {
    preferences: {
      optimization: {
        platform,
      },
    },
  }

  const errorTracking = {
    category: 'Artist',
    action: 'Update optimization platform',
  }
  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}

// Update completed setup at
/**
* @param {string} artistId
* @returns {Promise<object>} { res, error }
*/
export const updateCompletedSetupAt = (artistId) => {
  const requestUrl = `/artists/${artistId}`
  const payload = {
    completed_setup_at: moment(),
  }

  const errorTracking = {
    category: 'Artist',
    action: 'Update setup completed date',
  }

  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}

// Update pricing plan
/**
* @param {string} artistId
* @returns {Promise<object>} { res, error }
*/
export const updatePricingPlan = (artistId, pricingPlan) => {
  const requestUrl = `/artists/${artistId}`
  const payload = {
    plan: pricingPlan,
  }

  const errorTracking = {
    category: 'Artist',
    action: 'Update pricing plan',
  }

  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}

export const getCallToAction = (objective, platform) => {
  if (platform === 'facebook' || platform === 'instagram' || objective === 'traffic') {
    return {
      name: 'Learn More',
      value: 'LEARN_MORE',
    }
  }

  if (platform === 'spotify' || platform === 'soundcloud') {
    return {
      name: 'Listen Now',
      value: 'LISTEN_NOW',
    }
  }

  if (platform === 'youtube') {
    return {
      name: 'Watch More',
      value: 'WATCH_MORE',
    }
  }

  if (objective === 'sales') {
    return {
      name: 'Shop Now',
      value: 'SHOP_NOW',
    }
  }
}

export const getArtistPayload = (data, artist) => {
  const { objective, defaultLink } = data

  const hasSalesObjective = objective === 'sales'
  const hasGrowthObjective = objective === 'growth'

  const hasConnectedInstagram = hasConnectedIntegration(artist, 'instagram')
  const defaultPlatform = hasConnectedInstagram ? 'instagram' : 'facebook'
  const platform = (hasGrowthObjective && data.platform === 'website') ? defaultPlatform : data.platform

  return {
    preferences: {
      optimization: {
        ...(objective && { objective }),
        ...(platform && { platform: (hasGrowthObjective && platform === 'website') ? 'facebook' : platform }),
      },
      posts: {
        default_link_id: defaultLink,
        ...(objective && platform && { call_to_action: getCallToAction(objective, platform)?.value }),
      },
      conversions: {
        ...(hasSalesObjective && { default_link_id: defaultLink }),
        ...(hasSalesObjective && objective && platform && { call_to_action: getCallToAction(objective, platform)?.value }),
        ...(hasSalesObjective && { facebook_pixel_event: 'Purchase' }),
      },
    },
  }
}

export const objectives = [
  {
    name: 'Audience growth',
    value: 'growth',
    color: 'green',
    plan: 'basic',
  },
  {
    name: 'Website visits',
    value: 'traffic',
    color: 'blue',
    plan: 'growth',
  },
  {
    name: 'Website sales',
    value: 'sales',
    color: 'insta',
    plan: 'pro',
  },
]

export const platforms = [
  {
    name: 'Instagram',
    value: 'instagram',
  },
  {
    name: 'Spotify',
    value: 'spotify',
  },
  {
    name: 'SoundCloud',
    value: 'soundcloud',
  },
  {
    name: 'YouTube',
    value: 'youtube',
  },
  {
    name: 'Facebook',
    value: 'facebook',
  },
]

export const getPlatform = (platform) => {
  if (platform === 'youtube') return 'Youtube channel'
  if (platform === 'spotify') return 'Spotify Artist page'
  if (platform === 'soundcloud') return 'SoundCloud account'
}

export const getPlatformNameByValue = (platform) => {
  if (!platform) return null

  return platforms.find(({ value }) => platform === value).name
}

export const profileStatus = {
  objective: 'objective',
  platform: 'platform',
  defaultLink: 'default-link',
  pricingPlan: 'pricing-plan',
  connectProfile: 'connect-profile',
  posts: 'posts',
  adAccount: 'ad-account',
  facebookPixel: 'facebook-pixel',
  location: 'location',
  budget: 'budget',
  paymentMethod: 'payment-method',
  confirmSetup: 'confirm-setup',
}

export const getObjectiveString = (objective, platform) => {
  if (!objective || !platform) return null

  const objectiveString = objectives.find(({ value }) => objective === value).name

  if (platform !== 'website') {
    const platformString = getPlatformNameByValue(platform)

    return `${platformString} growth`
  }

  return objectiveString
}

export const getObjectiveColor = (objective, platform) => {
  if (objective === 'growth' && platform) {
    return brandColors[platform]?.bg
  }

  if (objective === 'sales') {
    return brandColors.instagram.bg
  }

  if (objective === 'traffic') {
    return brandColors.green
  }
}

export const getPreferencesObject = (updatedArtist) => {
  const { preferences } = updatedArtist
  const { objective, platform } = preferences.optimization

  return {
    postsPreferences: {
      callToAction: preferences.posts.call_to_action,
      defaultLinkId: preferences.posts.default_link_id,
      promotionEnabled: preferences.posts.promotion_enabled_default_per_type,
    },
    optimizationPreferences: {
      objective,
      platform,
    },
    conversionsPreferences: {
      callToAction: preferences.conversions.call_to_action,
      defaultLinkId: preferences.conversions.default_link_id,
      facebookPixelEvent: preferences.conversions.facebook_pixel_event,
    },
  }
}

const objective = 'objective'
const pricingPlan = 'pricing-plan'
const postPromotion = 'post-promotion'
const adAccount = 'ad-account'
const targeting = 'targeting'

export const getStartedSections = {
  objective,
  pricingPlan,
  postPromotion,
  adAccount,
  targeting,
}

export const hasGrowthPlan = (plan) => {
  if (!plan) return false

  return plan.includes('growth') || plan.includes('pro') || plan.includes('legacy')
}

export const hasProPlan = (plan) => {
  if (!plan) return false

  return plan.includes('pro') || plan.includes('legacy')
}

export const hasLegacyPlan = (plan) => {
  if (!plan) return false

  return plan.includes('legacy')
}

export const hasAllProfilesOnLegacyPlan = (organisationArtists) => {
  if (!organisationArtists.length) {
    return false
  }

  return organisationArtists.every(({ plan }) => plan === 'legacy_monthly')
}

export const hasAllProfilesOnNoPlan = (organisationArtists) => {
  if (!organisationArtists.length) {
    return false
  }

  return organisationArtists.every(({ plan }) => !plan)
}

export const hasAProfileOnGrowthOrPro = (organisationArtists) => {
  return organisationArtists.some(({ plan }) => {
    const [planPrefix] = plan?.split('_') || []

    return planPrefix === 'growth' || planPrefix === 'pro'
  })
}

// Update artist
/**
* @param {string} artistId
* @param {object} data
* @returns {Promise<object>} { res, error }
*/
export const updateArtist = (artist, data) => {
  const { id } = artist
  const requestUrl = `/artists/${id}`
  const payload = getArtistPayload(data, artist)

  const errorTracking = {
    category: 'Artist',
    action: 'Update artist',
  }
  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}

/**
 * @param {string} artistId
 * @param {boolean} defaultPromotionStatus
 * @param {string} postType
 * @returns {Promise<any>}
 */
export const batchTogglePromotionEnabled = async (artistId, postType, defaultPostStatus) => {
  const requestUrl = '/actions/batchSetPromotionEnabled'
  const payload = {
    artist_id: artistId,
    enabled: defaultPostStatus[postType],
    type: postType,
  }
  const errorTracking = {
    category: 'Posts',
    action: 'Batch toggle promotion enabled',
  }

  return api.requestWithCatch('post', requestUrl, payload, errorTracking)
}

/**
 * @param {string} artistId
 * @param {boolean} enabled
 * @returns {Promise<any>}
 */
export const updateDefaultPromotionStatus = async (artistId, postType, defaultPostStatus) => {
  const requestUrl = `/artists/${artistId}`
  const payload = {
    preferences: {
      posts: {
        promotion_enabled_default_per_type: {
          [postType]: defaultPostStatus[postType],
        },
      },
    },
  }
  const errorTracking = {
    category: 'Posts',
    action: 'Update default promotion status',
  }

  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}
