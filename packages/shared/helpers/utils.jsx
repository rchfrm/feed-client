// IMPORT PACKAGES
// import React from 'react'
import moment from 'moment'
import url from 'url'
import produce from 'immer'
import getVideoId from 'get-video-id'
import getSymbolFromCurrency from 'currency-symbol-map'
import countries from '@/constants/countries'
import get from 'lodash/get'

export const capitalise = (string) => {
  if (!string) return

  return string[0].toUpperCase() + string.slice(1)
}

export const extractDataSourcePlatform = string => {
  const lengthOfPlatform = string.indexOf('_')
  return string.slice(0, lengthOfPlatform)
}



// CONVERT DATE TO n TIME AGO
/**
 * @param {object} dateMoment
 * @returns {String}
 */
export const dateToTimePassed = (dateMoment) => {
  if (typeof dateMoment !== 'object') {
    console.error('Please pass the date as a moment object')
    return
  }
  const fromNow = dateMoment.fromNow()
  return fromNow
}

export const abbreviatePostText = (message) => {
  let shortenedText = message
  const text = []
  if (shortenedText) {
    if (shortenedText.length > 100) {
      shortenedText = shortenedText.slice(0, 100)
      shortenedText = shortenedText.charAt(shortenedText.length) === '\n' ? `${shortenedText.slice(0, shortenedText.length - 1)}...` : `${shortenedText}...`
    }
    const lineArray = shortenedText.split('\n')
    const numberOfLines = lineArray.length < 3 ? lineArray.length : 3
    for (let i = 0; i < numberOfLines; i += 1) {
      text.push(lineArray[i])
    }
  }
  return text
}

export const arrToObjById = (array) => {
  // Stop here if no array or empty array
  if (!array || !array.length) return array
  return array.reduce((obj, item) => {
    const { id } = item
    return {
      ...obj,
      [id]: item,
    }
  }, {})
}

export const removeItemFromArray = ({ array, item, index }) => {
  // If index is provided, return trimmed array
  if (typeof index === 'number' && index > -1) {
    array.splice(index, 1)
    return array
  }
  // If item is provided, get index...
  const itemIndex = array.indexOf(item)
  // Then trim array
  if (itemIndex > -1) {
    array.splice(index, 1)
  }
  return array
}

export const sortArrayByKey = (arr, key, sortDirection = 'asc') => {
  return produce(arr, draftArr => {
    draftArr.sort((a, b) => {
      const aValue = a[key]
      const bValue = b[key]
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  })
}

export const cleanSpotifyUrl = (url) => {
  if (!url) {
    return url
  }
  return url.slice(0, url.indexOf('?si='))
}

export const convertPlatformToPriorityDSP = (platform) => {
  if (platform === 'facebook') {
    return 'facebook_page_url'
  }

  return `${platform}_url`
}

export const extractPlatformFromPriorityDSP = (priorityDSP) => {
  if (priorityDSP === 'facebook_page_url') {
    return 'facebook'
  }
  return priorityDSP.replace('_url', '')
}

export const filterArtistUrls = (artist) => {
  const artistKeys = Object.keys(artist)
  // Create an array of links
  const links = []
  artistKeys.forEach(key => {
    if (key.indexOf('_url') >= 0) {
      links.push(key)
    }
  })
  // Turn the array into an object of link names and values
  let linksObj = {}
  links.forEach(link => {
    linksObj = {
      ...linksObj,
      [link]: artist[link],
    }
  })
  return linksObj
}

export const findCountryName = (twoLetterCode) => {
  let countryName
  for (let i = 0; i < countries.length; i += 1) {
    if (countries[i].id === twoLetterCode) {
      countryName = countries[i].name
      break
    }
  }
  return countryName
}

export const findPostMedia = (attachments) => {
  if (!attachments) return

  let obj
  let link

  if (attachments.subattachments) {
    // eslint-disable-next-line
    obj = attachments.subattachments[0]
  } else {
    obj = attachments
  }

  if (obj.media) {
    if (obj.media.source) {
      link = obj.media.source
    } else if (obj.media.image) {
      link = obj.media.image.src
    } else if (obj.media.video) {
      link = obj.media.video.src
    }
  }

  return link
}

export const findPostThumbnail = (attachments) => {
  if (!attachments) return

  let obj
  let thumbnail

  if (attachments.subattachments) {
    // eslint-disable-next-line
    obj = attachments.subattachments[0]
  } else {
    obj = attachments
  }

  if (obj.media) {
    if (obj.media.image) {
      if (obj.media.image.source) {
        thumbnail = obj.media.image.source
      } else if (obj.media.image.src) {
        thumbnail = obj.media.image.src
      }
    }
  }

  return thumbnail
}

export const getPostMediaType = (src) => {
  let type = 'video'

  if (src) {
    if (src.indexOf('youtube.com/embed/') >= 0) {
      const videoIdIndex = src.indexOf('youtube.com/embed/') + 18
      src = src.slice(videoIdIndex, videoIdIndex + 11)
      type = 'iframe'
    }
  }

  return type
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

/**
* @param {string} currency
* @returns {string}
*/
export const getCurrencySymbol = (currency = 'GBP') => {
  return getSymbolFromCurrency(currency)
}

/**
* @param {number} value
* @param {string} currency
* @param {string} locale
* @returns {string}
*/
export const formatCurrency = (value, currency = 'GBP', hideMinorUnits) => {
  if (value === null || typeof value === 'undefined' || Number.isNaN(value) || typeof window === 'undefined') return
  const locale = navigator.language
  const currencyToUse = currency === null ? 'GBP' : currency
  const valueFloat = parseFloat(value)
  return valueFloat.toLocaleString(locale, {
    style: 'currency',
    currency: currencyToUse,
    ...(hideMinorUnits && { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
  })
}

/**
 * @param {number} number
 * @param {object} options https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
 * @param {string} locale
 * @returns {string} value
 */
export const formatNumber = (number, options = {}, locale = navigator.language) => {
  if (typeof number !== 'number') { return number }
  return new Intl.NumberFormat(locale, options).format(number)
}

// Abbreviate number
export const abbreviateNumber = (number) => {
  if (!number) { return 0 }

  if (number < 10) {
    return number
  }
  if (number < 1000) {
    return `${Math.round(Number(number))}`
  }

  if (number < 10000) {
    return `${(number / 1000).toFixed(1)}k`
  }

  if (number >= 10000) {
    return `${(number / 1000).toFixed(0)}k`
  }
}

// Use this to sort and convert an object of data into an array of
// { name, value, key } objects
/**
* @param {array} propsToDisplay
* @param {object} data
* @param {object} options
* @returns {array}
*/
export const getDataArray = (propsToDisplay, data, options = {}) => {
  const { preserveRawNumber, showZeroValues } = options
  const dateKeys = ['created_at', 'updated_at', 'start_time', 'stop_time', 'last_ad_spend_date']
  return propsToDisplay.reduce((arr, detailName) => {
    const detailKeys = detailName.split('.')
    const rawValue = get(data, detailKeys, null)
    // STOP HERE if no data matching key
    if (rawValue === null) return arr
    // STOP HERE if data === 0 and not forcing to show zeroes
    if (rawValue === 0 && !showZeroValues) return arr
    // Convert dates (if necessary)
    const isDate = dateKeys.includes(detailName)
    const value = preserveRawNumber ? rawValue
      // Parse date, or
      : isDate ? moment(rawValue).format('DD MMM YYYY')
      // Format number, or
        : typeof rawValue === 'number' ? formatNumber(rawValue)
        // Just convert to string
          : rawValue.toString()
    // Name is final data key
    let name = detailKeys[detailKeys.length - 1]
    // Replace underscore with space
    name = name.replace(/_/g, ' ')
    // Capitalize first letter
    name = capitalise(name)
    // Capitalize ES
    name = name.replace(' es', ' ES')
    const detail = {
      name,
      value,
      key: detailName,
    }
    return [...arr, detail]
  }, [])
}

export const closestNumberInArray = (array, target) => {
  // https://stackoverflow.com/a/19277804
  return array.reduce((prev, curr) => {
    return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev)
  })
}

/**
 * @param {array} baseArray
 * @param {array} comparisonArray
 * @returns {array}
 * Removes elements from the baseArray that occur in the comparisonArray
 */
export const removeArrayOverlap = (baseArray = [], comparisonArray = []) => {
  return baseArray.reduce((arr, item) => {
    // If item is in the comparison array, don't inlcude
    if (comparisonArray.includes(item)) {
      return arr
    }
    // Else include item
    return [...arr, item]
  }, [])
}

export const returnArtistNameArray = (obj) => {
  if (obj === null) {
    return null
  }
  return Object.keys(obj).map((key) => obj[key].name)
}

export const returnLatestValue = (data) => {
  const timestamps = Object.keys(data).map(timestamp => Number(timestamp))
  const latestTimestamp = Math.max(...timestamps)
  return data[latestTimestamp]
}


/**
* @param {string} url
* @returns {Object.<string>} eg: { id: 'eG1uDU0rSLw', service: 'youtube' }
}
*/
export const getVideoDetails = (url) => {
  return getVideoId(url)
}


/**
* @param {url} string
* @param {quality} string
* @returns {string}
*/
export const getVideoThumb = (url, quality = 'hqdefault') => {
  const { id, service } = getVideoDetails(url)
  // Thumb types: https://stackoverflow.com/a/2068371/993297
  if (service === 'youtube') return `https://img.youtube.com/vi/${id}/${quality}.jpg`
  return ''
}


export const sortAssetsChronologically = (assets) => {
  if (assets) {
    return assets.sort((a, b) => {
      const publishTimeA = Number(moment(a.published_time).format('X'))
      const publishTimeB = Number(moment(b.published_time).format('X'))
      return publishTimeB - publishTimeA
    })
  }
  return assets
}

export const sortDatesChronologically = (dates) => {
  if (dates) {
    return dates.sort((a, b) => {
      return moment(a) - moment(b)
    })
  }
  return dates
}

export const translate = (phrase) => {
  let newPhrase = phrase.replace('_count', 's')
  newPhrase = newPhrase.replace('reach', 'reached')
  newPhrase = newPhrase.replace('ad_spend', 'spent')
  const wordArray = newPhrase.split('_')
  const capitalisedArray = wordArray.map(word => {
    switch (word) {
      case 'facebook':
      case 'instagram':
      case 'twitter':
      case 'spotify':
      case 'apple':
        return capitalise(word)
      case 'youtube':
        return 'YouTube'
      case 'soundcloud':
        return 'SoundCloud'
      default:
        return word
    }
  })
  return capitalisedArray.join(' ')
}

export const translateDataSourceId = (dataSource, shouldCapitalise = true) => {
  let phrase = dataSource
  const platform = extractDataSourcePlatform(phrase)
  phrase = phrase.slice(platform.length + 1)
  phrase = phrase.replace('_count', 's')
  if (phrase.indexOf('engaged') === -1) {
    phrase = phrase.replace('_7d', ' (rolling 7 day total)')
    phrase = phrase.replace('_30d', ' (rolling 30 day total)')
  } else {
    phrase = phrase.replace('_7d', ' (in last week)')
    phrase = phrase.replace('_28d', ' (in last 4 weeks)')
    phrase = phrase.replace('_1y', ' (in last year)')
  }
  switch (dataSource) {
    case `${platform}_reach`:
    case `${platform}_profile_view_count`:
      phrase += ' (daily)'
      break
    case `${platform}_views`:
      phrase += ' (lifetime)'
      break
    default:
      break
  }
  phrase = phrase.replace('ad_', 'daily ')
  phrase = phrase.replace('_feed', ' (through Feed)')
  phrase = phrase.replace(/_/g, ' ')
  if (shouldCapitalise) {
    phrase = capitalise(phrase)
  }
  return phrase
}

export const getLinkType = (href) => {
  if (href.startsWith('/')) return 'internal'
  if (href.startsWith('mailto:')) return 'email'
  return 'external'
}

// Round a number to the nearest n^10
/**
* @param {number} n
* @returns {number}
*/
export const roundToFactorOfTen = (n, roundType = 'ceil') => {
  const exponent = Math.round(n).toString().length - 1
  const multiplier = 10 ** exponent
  const rounded = Math[roundType](n / multiplier) * multiplier
  return rounded
}


// EXTERNAL URL helpers
// ---------------------


export const trimTrailingSlash = (url) => {
  return url.replace(/\/$/, '')
}

export const removeProtocolFromUrl = (url, trimSlash = true) => {
  const protocolEnd = url.indexOf('://') >= 0 ? url.indexOf('://') + 3 : 0
  const trimmedUrl = url.slice(protocolEnd)
  if (trimSlash) {
    return trimTrailingSlash(trimmedUrl)
  }
  return trimmedUrl
}

export const removeWWWFromUrl = (url) => {
  const wwwEnd = url.indexOf('www') >= 0 ? url.indexOf('www') + 4 : 0
  return url.slice(wwwEnd)
}

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

// Removes any URL protocal
/**
 * @param {string} url
 * @returns {string}
 */
export const trimUrlProtocol = (url) => {
  return url.replace(/(^\w+:|^)\/\//, '')
}

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

export const testValidEmail = (email) => {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const shortenUrl = (url) => {
  let shortenedUrl = removeProtocolFromUrl(url)
  shortenedUrl = removeWWWFromUrl(shortenedUrl)
  return shortenedUrl
}

/**
 * @param {string} key
 * @returns {string} value
 */
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (e) {
    return false
  }
}

/**
 * @param {string} key
 */
export const getLocalStorage = (key) => {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    return null
  }
}

export const clearLocalStorage = () => {
  try {
    localStorage.clear()
    return true
  } catch (e) {
    return false
  }
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
  const { pathname, query, host } = url.parse(urlString)
  if (!query) {
    return {
      pathname,
      host,
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
    pathname,
    host,
    queryString: query,
    query: queryObject,
  }
}

export const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

export const getNestedObjectByValue = (object, value) => {
  return Object.keys(object).find(key => Object.values(object[key]).includes(value))
}

export const getStringFromChildrenProp = (children) => {
  if (!children) {
    return ''
  }

  if (typeof children === 'string') {
    return children
  }

  if (typeof children?.props?.children === 'string') {
    return children.props.children
  }

  const getString = (children) => children.filter(child => typeof child === 'string').join('')

  if (children?.props?.children && Array.isArray(children?.props?.children)) {
    return getString(children.props.children)
  }

  if (Array.isArray(children)) {
    return getString(children)
  }

  return ''
}

// Add array cast type to query object keys
export const addArrayCastTypeToQuery = (object) => {
  return Object.entries(object).reduce((result, [key, value]) => {
    if (!value.length) return result

    return {
      ...result,
      [`${key}${value.length > 1 ? ':array' : ''}`]: value,
    }
  }, {})
}

export const isObject = (value) => {
  return (
    typeof value === 'object'
    && !Array.isArray(value)
    && value !== null
  )
}

export const isBooleanString = (value) => {
  if (typeof value !== 'string') return false

  return value === 'true' || value === 'false'
}

export const checkAndConvertBooleanString = (value) => {
  return isBooleanString(value) ? JSON.parse(value) : value
}
