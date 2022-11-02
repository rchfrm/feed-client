// import React from 'react'
import moment from 'moment'
import url from 'url'
import produce from 'immer'
import getVideoId from 'get-video-id'
import getSymbolFromCurrency from 'currency-symbol-map'
import get from 'lodash/get'

export const capitalise = (string) => {
  if (!string) return

  return string[0].toUpperCase() + string.slice(1)
}

// TODO: Use `truncate` instead: https://tailwindcss.com/docs/text-overflow
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

export const filterUnique = array => {
  return array.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
}

/**
* @param {string} currencyCode
* @returns {string}
*/
export const getCurrencySymbol = (currencyCode = 'GBP') => {
  return getSymbolFromCurrency(currencyCode)
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
    currencyDisplay: 'narrowSymbol',
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

export const addCommasToNumber = number => {
  if (typeof number !== 'number') return number
  const numberArray = Array.from(number.toString()).reverse()
  return numberArray.reduce((acc, digit, index) => {
    if (
      (index + 1) % 3 === 0
      && index < numberArray.length - 1
    ) {
      return [...acc, `,${digit}`]
    }
    return [...acc, digit]
  }, []).reverse().join('')
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

export const getLinkType = (href) => {
  if (href.startsWith('/')) return 'internal'
  if (href.startsWith('mailto:')) return 'email'
  return 'external'
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

export const getMaxSpendString = (currency, maxSpend) => {
  const currencySymbol = getCurrencySymbol(currency)
  const formattedSpend = addCommasToNumber(maxSpend)

  if (currencySymbol === 'kr') {
    return `${formattedSpend} ${currencySymbol}`
  }
  return `${currencySymbol}${formattedSpend}`
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const shuffleArray = (array) => {
  let currentIndex = array.length
  let randomIndex

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    /* eslint-disable-next-line no-plusplus */
    currentIndex--

    // And swap it with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}

export const convertUTCToLocalDate = (date) => {
  if (!date) {
    return date
  }

  date = new Date(date)
  date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  return date
}

export const convertLocalToUTCDate = (date) => {
  if (!date) {
    return date
  }

  date = new Date(date)
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return date
}
