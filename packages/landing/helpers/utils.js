import url from 'url'

export const getLinkType = (href) => {
  if (href.startsWith('/')) return 'internal'
  if (href.startsWith('#')) return 'pageAnchor'
  if (href.startsWith('mailto:')) return 'email'
  return 'external'
}

export const hexToRGBA = (hex, opacity) => {
  const hexNumbers = hex.slice(1)
  const r = parseInt(hexNumbers.slice(0, 2), 16)
  const g = parseInt(hexNumbers.slice(2, 4), 16)
  const b = parseInt(hexNumbers.slice(4), 16)
  const a = opacity >= 0 && opacity <= 1 ? opacity : ''
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export const maxArrayValue = (array) => {
  let max = array[0]
  array.forEach(item => {
    if (item > max) {
      max = item
    }
  })
  return max
}

export const minArrayValue = (array) => {
  let min = array[0]
  array.forEach(item => {
    if (item < min) {
      min = item
    }
  })
  return min
}

// Use this to parse local URLs to get path and queries
/**
 * @param {array} arr the array to sort
 * @param {string} key the value of the prop to sort by
 * @param {string} sortDirection
 * @returns {array}
 */
export const sortArrayByKey = (arr, key, sortDirection = 'asc') => {
  return arr.sort((a, b) => {
    const aValue = a[key]
    const bValue = b[key]
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })
}

// Use this to parse local URLs to get path and queries
/**
 * @param {string} urlString
 * @returns {object} {
 *  pathname,
 *  queryString,
 *  query: {
 *    queryName: 'queryValue',
 *    ...
 *  }
 * }
 */
export const parseUrl = (urlString) => {
  if (!urlString) return {}
  const {
    host,
    protocol,
    pathname,
    query,
  } = url.parse(urlString)
  const basicUrl = `${protocol}//${host}${pathname}`
  const res = {
    host,
    protocol,
    pathname,
    basicUrl,
  }
  if (!query) {
    return {
      ...res,
      queryString: '',
      query: null,
    }
  }
  // Format query into key value object
  const queryValues = query.split('&')
  const queryObject = queryValues.reduce((result, query) => {
    const [queryKey, queryValue = ''] = query.split('=')
    result[queryKey] = queryValue
    return result
  }, {})
  // Return result
  return {
    ...res,
    queryString: query,
    query: queryObject,
  }
}

// ENFORCE URL PROTOCOL
// Add a protocol if missing, else leaves the same
/**
 * @param {string} url
 * @returns {string}
 */
export const enforceUrlProtocol = (url, forceSSH = false) => {
  if (!url) return ''
  const protocolTest = /^https?:\/\//i
  const containsProtocol = protocolTest.test(url)
  if (containsProtocol) return url
  const protocol = forceSSH ? 'https://' : 'http://'
  return `${protocol}${url}`
}

// TEST VALID URL
/**
 * @param {string} url To pass, url must include a protocol (ie, https?://)
 * @param {boolean} addUrlProtocol if true, adds a protocol
 * @returns {boolean}
 */
export const testValidUrl = (urlString = '', addUrlProtocol) => {
  if (!urlString) return false
  const url = addUrlProtocol ? enforceUrlProtocol(urlString) : urlString
  const expression = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
  const regex = new RegExp(expression)
  return !!url.match(regex)
}

// TEST VALID EMAIL
export const testValidEmail = (email) => {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// GET INTEGRATION REGEX
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
    // https://regexr.com/5et0m
    case 'soundcloud':
      if (trim) return /^(?:(?:https?:)?\/\/)?(?:soundcloud.com|snd.sc)\//
      return /^(?:(?:https?:)?\/\/)?(?:soundcloud.com|snd.sc)\/([^/]+)/
    case 'twitter':
      return /^(?:(?:https?:)?\/\/)?(?:twitter.com)\/([^/]+)/
    case 'youtube':
      if (trim) return /((http|https):\/\/|)(www\.|)youtube\.com\/(channel\/|c\/|user\/)/
      return /((http|https):\/\/|)(www\.|)youtube\.com\/(channel\/|c\/|user\/)([a-zA-Z0-9-_]+)/
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
