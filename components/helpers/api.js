import axios from 'axios'
import firebase from './firebase'
import host from './host'

/**
 * @param {string} method
 * @param {string} path
 * @param {object|string|false} [options]
 * @param {string|false} [token]
 * @returns {Promise<any>}
 */
export async function request(method, path, options, token) {
  if (typeof options === 'string' || options === false) {
    if (typeof token !== 'undefined') {
      throw new Error('token argument must not be set if passed in options argument')
    }
    token = options
    options = undefined
  }

  const query = options ? options.query : undefined

  if (typeof query !== 'undefined' && typeof query !== 'object') {
    throw new Error('query must be empty or an object')
  }

  if (token) {
    if (typeof token !== 'string') {
      throw new Error('token must be a string')
    }
  } else if (token !== false) {
    token = await firebase.getIdTokenOrFail()
  }

  let url = path.match(/^(?:https?:)?\/\//)
    ? path
    : `${host.replace(/\/$/, '')}/${path.replace(/^\//, '')}`

  if (query) {
    url += `?${Object.keys(query).map(key => `${key}=${query[key]}`).join('&')}`
  }

  const req = {
    method: method.toUpperCase(),
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (token !== false) {
    req.headers.Authorization = `Bearer ${token}`
  }

  if (options && options.data) {
    req.data = options.data
  }

  const res = await axios.request(req)

  return res.data
}

/**
 * @param {string} path
 * @param {object|string|false} [query]
 * @param {string|false} [token]
 * @returns {Promise<any>}
 */
export function get(path, query, token) {
  const options = {}
  if (typeof query !== 'object') {
    token = query
    query = undefined
  } else {
    options.query = query
  }
  return request('GET', path, options, token)
}

/**
 * @param {string} path
 * @param {object|string|false} data
 * @param {string|false} [token]
 * @returns {Promise<any>}
 */
export function patch(path, data, token) {
  const options = {}
  if (typeof data !== 'object') {
    token = data
    data = undefined
  } else {
    options.data = data
  }
  return request('PATCH', path, options, token)
}

/**
 * @param {string} path
 * @param {object|string|false} data
 * @param {string|false} [token]
 * @returns {Promise<any>}
 */
export function post(path, data, token) {
  const options = {}
  if (typeof data !== 'object') {
    token = data
    data = undefined
  } else {
    options.data = data
  }
  return request('POST', path, options, token)
}
