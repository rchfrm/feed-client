import axios from 'axios'
import firebase from '@/helpers/firebase'
import host from '@/helpers/host'

const axiosInstance = axios.create()

const retryConfig = {
  retry: 10,
  retryDelay: 200,
  httpMethodsToRetry: ['OPTIONS', 'GET', 'PATCH', 'POST', 'DELETE'],
  statusCodesToRetry: [[503, 503]],
}

/**
 * @param {AxiosRequestConfig} req
 */
async function requestWithRetries(req) {
  for (let attempt = 0; attempt < retryConfig.retry; attempt += 1) {
    try {
      if (attempt > 0) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise(resolve => setTimeout(resolve, retryConfig.retryDelay))
      }
      // eslint-disable-next-line no-await-in-loop
      return await axiosInstance.request(req)
    } catch (err) {
      // rethrow the error if there's no request
      if (!err.request) throw err

      // rethrow the error if it's not an allowable retry method
      if (retryConfig.httpMethodsToRetry.indexOf(req.method.toUpperCase()) === -1) throw err

      // if response is undefined a pre-flight check may have failed
      // ideally OPTIONS requests will always resolve correctly but
      // this is an issue in the current GCP configuration, allow the
      // retry attempt only if the request method is idempotent
      if (req.method.toUpperCase() !== 'OPTIONS' && req.method.toUpperCase() !== 'GET') throw err

      // assume the server response status is a 503 Service Unavailable
      // error if there's no response
      const status = err.response ? err.response.status : 503
      const isStatusMatch = retryConfig.statusCodesToRetry.filter(([min, max]) => min <= status && status <= max).length > 0
      if (!isStatusMatch) throw err

      // rethrow the error if it's the last attempt
      if (attempt === retryConfig.retry - 1) throw err
    }
  }
}

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

  const res = await requestWithRetries(req)

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
