// IMPORT PACKAGES
// import React from 'react'
import moment from 'moment'
import getSymbolFromCurrency from 'currency-symbol-map'
import countries from '../../constants/countries'


const findPostMediaType = link => {
  let type

  if (link) {
    if (link.indexOf('.mp4') >= 0) {
      type = 'video'
    } else if (link.indexOf('youtube.com/embed/') >= 0) {
      const videoIdIndex = link.indexOf('youtube.com/embed/') + 18
      link = link.slice(videoIdIndex, videoIdIndex + 11)
      type = 'youtube_embed'
    } else {
      type = 'image'
    }
  }

  return type
}

const removeProtocolFromUrl = (url) => {
  const protocolEnd = url.indexOf('://') >= 0 ? url.indexOf('://') + 3 : 0
  return url.slice(protocolEnd)
}

const removeWWWFromUrl = url => {
  const wwwEnd = url.indexOf('www') >= 0 ? url.indexOf('www') + 4 : 0
  return url.slice(wwwEnd)
}

const capitalise = (string) => {
  return string[0].toUpperCase() + string.slice(1)
}

const extractDataSourcePlatform = string => {
  const lengthOfPlatform = string.indexOf('_')
  return string.slice(0, lengthOfPlatform)
}

export default {
  // Reused functions
  findPostMediaType,
  removeProtocolFromUrl,
  removeWWWFromUrl,
  capitalise,
  extractDataSourcePlatform,
  // Now the rest...
  abbreviateNumber: (number) => {
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
  },


  abbreviatePostText: message => {
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
  },


  arrToObjById: (array) => {
    // Stop here if no array or empty array
    if (!array || !array.length) return array
    return array.reduce((obj, item) => {
      const { id } = item
      return {
        ...obj,
        [id]: item,
      }
    }, {})
  },

  cleanSpotifyUrl: url => {
    if (!url) {
      return url
    }
    return url.slice(0, url.indexOf('?si='))
  },

  convertPlatformToPriorityDSP: platform => {
    if (platform === 'facebook') {
      return 'facebook_page_url'
    }

    return `${platform}_url`
  },

  extractPlatformFromPriorityDSP: priorityDSP => {
    if (priorityDSP === 'facebook_page_url') {
      return 'facebook'
    }

    const endOfPlatform = priorityDSP.indexOf('_url')

    return priorityDSP.slice(0, endOfPlatform)
  },

  filterArtistUrls: artist => {
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
  },

  findCountryName: twoLetterCode => {
    let countryName
    for (let i = 0; i < countries.length; i += 1) {
      if (countries[i].id === twoLetterCode) {
        countryName = countries[i].name
        break
      }
    }
    return countryName
  },

  findPostMedia: attachments => {
    if (!attachments) { return }

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
  },

  findPostThumbnail: attachments => {
    if (!attachments) { return }

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
  },

  /**
   * @param {number} number
   * @param {string} locale
   * @returns {string} value
   */
  formatNumber: (number, locale = navigator.language) => {
    if (!number) { return number }
    return new Intl.NumberFormat(locale).format(number)
  },

  generateMediaHTML: (media, thumbnail, message, handleError) => {
    const mediaType = findPostMediaType(media)
    // Remove autoplay on youtube embed
    switch (mediaType) {
      // If the media is a video, return an HTML5 video element
      case 'video':
      case 'video_inline':
      case 'video_direct_response':
        return (
          <video width="100%" controls playsInline className="center-image" src={media} type="video/mp4" poster={thumbnail} onError={handleError} />
        )

        // If the media is a YouTube video, return an iframe embed of the video
      case 'youtube_embed':
        return (
          <iframe
            title={message}
            width="100%"
            height="315"
            src={media.replace('autoplay=1', 'autoplay=0')}
            frameBorder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="center-image"
          />
        )

        // Otherwise return an image element
      default:
        return <img src={media} alt={message} className="center-image" onError={handleError} />
    }
  },

  hexToRGBA: (hex, opacity) => {
    const hexNumbers = hex.slice(1)
    const r = parseInt(hexNumbers.slice(0, 2), 16)
    const g = parseInt(hexNumbers.slice(2, 4), 16)
    const b = parseInt(hexNumbers.slice(4), 16)
    const a = opacity >= 0 && opacity <= 1 ? opacity : ''
    return `rgba(${r}, ${g}, ${b}, ${a})`
  },

  maxArrayValue: array => {
    let max = array[0]
    array.forEach(item => {
      if (item > max) {
        max = item
      }
    })
    return max
  },

  minArrayValue: array => {
    let min = array[0]
    array.forEach(item => {
      if (item < min) {
        min = item
      }
    })
    return min
  },

  closestNumberInArray: (array, target) => {
    // https://stackoverflow.com/a/19277804
    return array.reduce((prev, curr) => {
      return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev)
    })
  },

  returnArtistNameArray: obj => {
    if (obj === null) {
      return null
    }
    return Object.keys(obj).map((key) => obj[key].name)
  },

  returnLatestValue: data => {
    const timestamps = Object.keys(data).map(timestamp => Number(timestamp))
    const latestTimestamp = Math.max(...timestamps)
    return data[latestTimestamp]
  },

  selectPriorityDSP: artist => {
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
  },

  shortenUrl: url => {
    let shortenedUrl = removeProtocolFromUrl(url)
    shortenedUrl = removeWWWFromUrl(shortenedUrl)
    return shortenedUrl
  },

  sortAssetsChronologically: assets => {
    if (assets) {
      return assets.sort((a, b) => {
        const publishTimeA = Number(moment(a.published_time).format('X'))
        const publishTimeB = Number(moment(b.published_time).format('X'))
        return publishTimeB - publishTimeA
      })
    }
    return assets
  },

  sortDatesChronologically: dates => {
    if (dates) {
      return dates.sort((a, b) => {
        return moment(a) - moment(b)
      })
    }
    return dates
  },

  translate: phrase => {
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
  },

  translateDataSourceId: (dataSource, shouldCapitalise = true) => {
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
  },


  getLinkType: (href) => {
    if (href.startsWith('/')) return 'internal'
    if (href.startsWith('mailto:')) return 'email'
    return 'external'
  },

  /**
  * @param {string} currency
  * @returns {string}
  */
  getCurrencySymbol: (currency = 'GBP') => {
    return getSymbolFromCurrency(currency)
  },

  /**
  * @param {number} value
  * @param {string} currency
  * @param {string} locale
  * @returns {string}
  */
  formatCurrency: (value, currency = 'GBP', locale = navigator.language) => {
    currency = currency === null ? 'GBP' : currency
    return value.toLocaleString(locale, { style: 'currency', currency })
  },

  /**
   * @param {string} url To pass, url must include a protocol (ie, https?://)
   * @returns {boolean}
   */
  testValidUrl: (url) => {
    const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    const regex = new RegExp(expression)
    return !!url.match(regex)
  },

  testValidEmail: (email) => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  },

  /**
   * @param {string} key
   * @returns {string} value
   */
  setLocalStorage: (key, value) => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (e) {
      return false
    }
  },

  /**
   * @param {string} key
   */
  getLocalStorage: (key) => {
    try {
      return localStorage.getItem(key)
    } catch (e) {
      return null
    }
  },

  clearLocalStorage: () => {
    try {
      localStorage.clear()
      return true
    } catch (e) {
      return false
    }
  },
}
