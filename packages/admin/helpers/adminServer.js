import * as api from '@/helpers/api'

// UTILS
// -----------------------
const getEndpointWithRequestProps = (endpoint, requestProps = {}) => {
  return Object.entries(requestProps)
    .reduce((newEndpoint, [propName, propValue], index) => {
      const separator = index === 0 ? '?' : '&'
      // Add prop to endpoint
      return `${newEndpoint}${separator}${propName}=${propValue}`
    }, endpoint)
}

// GENERIC
// -----------------------
/**
 * @param {string} endpoint
 * @param {string} [token]
 * @returns {Promise<any>}
 */
export const getEndpoint = async (endpoint) => {
  return api.get(endpoint)
}

const isValidEntityType = entityType => {
  const allowedEntityTypes = ['artist', 'user', 'organization']
  if (!allowedEntityTypes.includes(entityType)) throw new Error('Invalid entity type provided')
}

export const getEntityCategory = async ({ entityType, entityId }) => {
  isValidEntityType(entityType)
  const endpoint = `${entityType}s/${entityId}/category`
  return api.get(endpoint)
}

export const getCategoryOptions = async ({ entityType }) => {
  isValidEntityType(entityType)
  const endpoint = `${entityType}s/categories`
  return api.get(endpoint)
}

export const saveEntityCategory = async (entityType, entityId, categoryInfo) => {
  isValidEntityType(entityType)
  const endpoint = `${entityType}s/${entityId}/category`
  return api.patch(endpoint, categoryInfo)
}

// ARTISTS
// -----------------------

// All artists
/**
 * @param {string} [token]
 * @param {string} [cursor]
 * @param {object} [requestProps]
 * @returns {Promise<any>}
 */
export const getAllArtists = async (cursor, requestProps = {}) => {
  const endpoint = 'artists/all'
  // Add cursor to request props
  const requestPropsWithCursor = cursor ? { ...requestProps, after: cursor } : requestProps
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestPropsWithCursor)
  return api.get(endpointWithProps)
}

// Single artist
/**
 * @param {string} [artistId]
 * @param {string} [cursor]
 * @param {object} [requestProps]
 * @returns {Promise<array>}
 */
export const getArtist = async (cursor, artistId, requestProps = {}) => {
  const endpoint = `/artists/${artistId}`
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestProps)
  // Convert result to array
  const artist = await api.get(endpointWithProps)
  return [artist]
}

// Update artist status
/**
 * @param {string} [artistId]
 * @param {string} [status] activate || suspend
 * @returns {Promise<any>}
 */
export const updateArtistStatus = async (artistId, status) => {
  const endpoint = `artists/${artistId}/${status}`
  return api.post(endpoint)
}

// Get Facebook integrations
/**
* @param {string} [artistId]
* @returns {Promise<any>}
*/
export const getAdminFacebookIntegration = (artistId) => {
  return api.get(`artists/${artistId}/integrations/facebook`)
}


/**
* @param {string} [artistId]
* @param {string} [instagramId]
* @returns {Promise<any>}
* Patch artist Instagram Business ID
*/
export const patchArtistBusinessId = async (artistId, instagramId) => {
  const res = await api.patch(`/artists/${artistId}`, {
    integrations: {
      facebook: {
        instagram_id: instagramId,
      },
    },
  })
    .catch((error) => { return { error } })
  if (res.error) {
    const { error } = res
    const errorMessage = typeof error.response === 'object' ? error.response.data.error : error.message
    return { error: { message: errorMessage } }
  }
  return res
}


// USERS
// -----------------------

/**
 * @param {string} [token]
 * @returns {Promise<array>}
 */
export const getUser = async (cursor, userId, requestProps = {}) => {
  const endpoint = userId ? `users/${userId}` : '/users/me'
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestProps)
  const user = await api.get(endpointWithProps)
  return [user]
}

/**
 * @param {string} [token]
 * @param {string} [cursor]
 * @returns {Promise<any>}
 */
export const getAllUsers = async (cursor, requestProps = {}) => {
  const endpoint = 'users'
  const requestPropsWithAll = { all: '1', ...requestProps }
  // const requestPropsWithAll = { all: '1' }
  const requestPropsWithCursor = cursor ? { ...requestPropsWithAll, after: cursor } : requestPropsWithAll
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestPropsWithCursor)
  return api.get(endpointWithProps)
}

// ORGANISATIONS
// -----------------------

/**
 * @param {string} [token]
 * @returns {Promise<array>}
 */
export const getOrganisation = async (cursor, orgId, requestProps = {}) => {
  const endpoint = `organizations/${orgId}`
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestProps)
  const organization = await api.get(endpointWithProps)
  return [organization]
}

/**
 * @param {string} [token]
 * @param {string} [cursor]
 * @returns {Promise<any>}
 */
export const getAllOrganisations = async (cursor, requestProps = {}) => {
  const endpoint = 'organizations/all'
  // Add cursor to request props
  const requestPropsWithCursor = cursor ? { ...requestProps, after: cursor } : requestProps
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestPropsWithCursor)
  return api.get(endpointWithProps)
}
