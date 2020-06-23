// IMPORT PACKAGES
// import React from 'react'
import moment from 'moment'
import url from 'url'
import getSymbolFromCurrency from 'currency-symbol-map'
import countries from '~/constants/countries'


export const removeProtocolFromUrl = (url) => {
  const protocolEnd = url.indexOf('://') >= 0 ? url.indexOf('://') + 3 : 0
  return url.slice(protocolEnd)
}

export const removeWWWFromUrl = (url) => {
  const wwwEnd = url.indexOf('www') >= 0 ? url.indexOf('www') + 4 : 0
  return url.slice(wwwEnd)
}

export const capitalise = (string) => {
  return string[0].toUpperCase() + string.slice(1)
}

export const extractDataSourcePlatform = string => {
  const lengthOfPlatform = string.indexOf('_')
  return string.slice(0, lengthOfPlatform)
}


// Now the rest...
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

  const endOfPlatform = priorityDSP.indexOf('_url')

  return priorityDSP.slice(0, endOfPlatform)
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

/**
 * @param {number} number
 * @param {object} options https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
 * @param {string} locale
 * @returns {string} value
 */
export const formatNumber = (number, options = {}, locale = navigator.language) => {
  if (!number) { return number }
  return new Intl.NumberFormat(locale, options).format(number)
}

export const getPostMediaType = (src) => {
  let type

  if (src) {
    if (src.indexOf('.mp4') >= 0) {
      type = 'video'
    } else if (src.indexOf('youtube.com/embed/') >= 0) {
      const videoIdIndex = src.indexOf('youtube.com/embed/') + 18
      src = src.slice(videoIdIndex, videoIdIndex + 11)
      type = 'youtube_embed'
    } else {
      type = 'image'
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

export const closestNumberInArray = (array, target) => {
  // https://stackoverflow.com/a/19277804
  return array.reduce((prev, curr) => {
    return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev)
  })
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

export const selectPriorityDSP = (artist) => {
  if (artist.spotify_url) {
    return 'spotify'
  }

  if (artist.website_url) {
    return 'website'
  }

  if (artist.instagram_url) {
    return 'instagram'
  }

  if (artist.bandcamp_url) {
    return 'bandcamp'
  }

  if (artist.facebook_page_url) {
    return 'facebook'
  }

  if (artist.youtube_url) {
    return 'youtube'
  }

  if (artist.twitter_url) {
    return 'twitter'
  }

  if (artist.soundcloud_url) {
    return 'soundcloud'
  }

  if (artist.apple_url) {
    return 'apple'
  }
}

export const shortenUrl = (url) => {
  let shortenedUrl = removeProtocolFromUrl(url)
  shortenedUrl = removeWWWFromUrl(shortenedUrl)
  return shortenedUrl
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
export const formatCurrency = (value, currency = 'GBP', locale = navigator.language) => {
  currency = currency === null ? 'GBP' : currency
  return value.toLocaleString(locale, { style: 'currency', currency })
}

/**
* @param {number} amount
* @param {string} currencyCode
* @param {number} currencyOffset
* @returns {string}
*/
export const getMinBudget = (amount, currencyCode, currencyOffset) => {
  const adjustedMin = ((amount / 0.9) * 3) / currencyOffset
  const exponent = Math.round(adjustedMin).toString().length - 1
  const multiplier = 10 ** exponent
  const roundedNumber = Math.ceil(adjustedMin / multiplier) * multiplier
  // Format and return
  return formatCurrency(roundedNumber, currencyCode)
}


/**
 * @param {string} url To pass, url must include a protocol (ie, https?://)
 * @returns {boolean}
 */
export const testValidUrl = (url) => {
  const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
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

export const clearLocalStorage = () => {
  try {
    localStorage.clear()
    return true
  } catch (e) {
    return false
  }
}


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
  if (!urlString) return
  const { pathname, query } = url.parse(urlString)
  if (!query) {
    return {
      pathname,
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
    queryString: query,
    query: queryObject,
  }
}
