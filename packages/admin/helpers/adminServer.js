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
 * @param {string} [id]
 * @param {string} [cursor]
 * @param {object} [requestProps]
 * @returns {Promise<array>}
 */
export const getArtist = async (cursor, id, requestProps = {}) => {
  const endpoint = `/artists/${id}`
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestProps)
  // Convert result to array
  const artist = await api.get(endpointWithProps)
  return [artist]
}

// Artist data source
/**
 * @param {string} [id]
 * @param {string} [dataSourceName]
 * @returns {Promise<Object>}
 */
export const getArtistDataSource = async (id, dataSourceName) => {
  const endpoint = `artists/${id}/data_sources`
  const payload = {
    name: dataSourceName,
  }
  const errorTracking = {
    category: 'Artist',
    action: `Get ${dataSourceName} for artist ${id}`,
  }
  return api.requestWithCatch('get', endpoint, payload, errorTracking)
}

// Update artist status
/**
 * @param {string} [id]
 * @param {string} [status] activate || suspend
 * @returns {Promise<any>}
 */
export const updateArtistStatus = async (id, status) => {
  const endpoint = `artists/${id}/${status}`
  return api.post(endpoint)
}

// Get Facebook integrations
/**
* @param {string} [id]
* @returns {Promise<any>}
*/
export const getAdminFacebookIntegration = (id) => {
  return api.get(`artists/${id}/integrations/facebook`)
}


/**
* @param {string} [id]
* @param {string} [instagramId]
* @returns {Promise<any>}
* Patch artist Instagram Business ID
*/
export const patchArtistBusinessId = async (id, instagramId) => {
  const res = await api.patch(`/artists/${id}`, {
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

export const patchArtistCampaignStatus = async (id, status) => {
  return api.patch(`/artists/${id}/targeting`, {
    status,
  })
}


// USERS
// -----------------------

/**
 * @returns {Promise<array>}
 * @param cursor
 * @param id
 * @param requestProps
 */
export const getUser = async (cursor, id, requestProps = {}) => {
  const endpoint = id ? `users/${id}` : '/users/me'
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestProps)
  const user = await api.get(endpointWithProps)
  user.full_name = `${user.first_name} ${user.last_name}`
  return [user]
}

/**
 * @param {string} [cursor]
 * @param requestProps
 * @returns {Promise<any>}
 */
export const getAllUsers = async (cursor, requestProps = {}) => {
  const endpoint = 'users'
  const requestPropsWithAll = { all: '1', ...requestProps }
  // const requestPropsWithAll = { all: '1' }
  const requestPropsWithCursor = cursor ? { ...requestPropsWithAll, after: cursor } : requestPropsWithAll
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestPropsWithCursor)
  const users = await api.get(endpointWithProps)
  return users.map((user) => {
    const { first_name, last_name } = user
    const full_name = `${first_name} ${last_name}`
    return { ...user, full_name }
  })
}

// ORGANIZATIONS
// -----------------------

/**
 * @returns {Promise<array>}
 * @param cursor
 * @param id
 * @param requestProps
 */
export const getOrganization = async (cursor, id, requestProps = {}) => {
  const endpoint = `organizations/${id}`
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestProps)
  const organization = await api.get(endpointWithProps)
  return [organization]
}

/**
 * @param {string} [cursor]
 * @param requestProps
 * @returns {Promise<any>}
 */
export const getAllOrganizations = async (cursor, requestProps = {}) => {
  const endpoint = 'organizations/all'
  // Add cursor to request props
  const requestPropsWithCursor = cursor ? { ...requestProps, after: cursor } : requestProps
  // Add request props
  const endpointWithProps = getEndpointWithRequestProps(endpoint, requestPropsWithCursor)
  return api.get(endpointWithProps)
}
