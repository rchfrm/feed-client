// IMPORT PACKAGES
// import React from 'react'
import moment from 'moment'
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


  arrToObjById: array => {
    if (array.length === 0) {
      return array
    }

    let obj = {}

    array.forEach(item => {
      obj = {
        ...obj,
        [item.id]: item,
      }
    })

    return obj
  },

  assignDataSourceType: string => {
    if (string.indexOf('follower_count') !== -1 || string.indexOf('facebook_likes') !== -1 || string.indexOf('subscriber_count') !== -1) {
      return 'cumulative'
    } if (string.indexOf('reach') !== -1 || string.indexOf('profile_views') !== -1 || string.indexOf('profile_view_count') !== -1 || string.indexOf('ad_spend') !== -1) {
      return 'daily'
    }
    if (string.indexOf('7d') !== -1) {
      return 'weekly'
    } if (string.indexOf('28d') !== -1) {
      return 'monthly'
    } if (string.indexOf('1y') !== -1) {
      return 'yearly'
    }
  },

  cleanSpotifyUrl: url => {
    if (!url) {
      return url
    }
    return url.slice(0, url.indexOf('?si='))
  },

  returnUniformDataSourceId: string => {
    let dataSourceId = string
    dataSourceId = dataSourceId.replace('likes', 'follower_count')
    dataSourceId = dataSourceId.replace('page_fans', 'follower_count')
    dataSourceId = dataSourceId.replace('audience', 'follower_count')
    dataSourceId = dataSourceId.replace('subscriber_count', 'follower_count')
    dataSourceId = dataSourceId.replace('views', 'view_count')
    return dataSourceId
  },

  extractDataSourceBreakdown: string => {
    let dataSourceBreakdown
    if (string.indexOf('city') !== -1) {
      dataSourceBreakdown = 'city'
    } else if (string.indexOf('country') !== -1) {
      dataSourceBreakdown = 'country'
    } else if (string.indexOf('gender_age') !== -1) {
      dataSourceBreakdown = 'gender_age'
    } else if (string.indexOf('1y') !== -1) {
      dataSourceBreakdown = 'year'
    } else if (string.indexOf('28d') !== -1) {
      dataSourceBreakdown = 'month'
    } else if (string.indexOf('7d') !== -1) {
      dataSourceBreakdown = 'week'
    } else if (string.indexOf('reach_7d') !== -1) {
      dataSourceBreakdown = 'week'
    }
    return dataSourceBreakdown
  },

  extractDataSourceName: (id, platform, breakdown) => {
    let endOfName
    if (breakdown === 'year') {
      endOfName = id.indexOf('1y') - 1
    } else if (breakdown === 'month') {
      endOfName = id.indexOf('28d') - 1
    } else if (breakdown === 'week') {
      endOfName = id.indexOf('7d') - 1
    } else if (breakdown) {
      endOfName = id.indexOf(breakdown) - 1
    }
    return id.slice(platform.length + 1, endOfName)
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

  formatNumber: (number) => {
    if (!number) { return number }
    const string = number.toString()
    if (string.length > 6) {
      const formattedString = []
      for (let i = 0; i < string.length; i += 1) {
        if (i === string.length - 3 || i === string.length - 6) {
          formattedString.push(',')
        }
        formattedString.push(string[i])
      }
      return formattedString.join('')
    } if (string.length > 3) {
      const formattedString = []
      for (let i = 0; i < string.length; i += 1) {
        if (i === string.length - 3) {
          formattedString.push(',')
        }
        formattedString.push(string[i])
      }
      return formattedString.join('')
    }
    return string
  },

  generateMediaHTML: (media, thumbnail, message, handleError) => {
    const mediaType = findPostMediaType(media)
    switch (mediaType) {
      // If the media is a video, return an HTML5 video element
      case 'video':
      case 'video_inline':
      case 'video_direct_response':
        return (
          <video width="100%" controls playsinline className="center-image" src={media} type="video/mp4" poster={thumbnail} onError={handleError} />
        )

        // If the media is a YouTube video, return an iframe embed of the video
      case 'youtube_embed':
        return (
          <iframe
            title={message}
            width="100%"
            height="315"
            src={media}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
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

  sortArtistsAlphabetically: artists => {
    let artistArr
    if (Array.isArray(artists)) {
      artistArr = artists
    } else {
      if (Object.keys(artists).length === 0) {
        return []
      }
      artistArr = Object.values(artists)
    }

    return artistArr.sort((a, b) => {
      const lowerA = a.name.toLowerCase()
      const lowerB = b.name.toLowerCase()
      if (lowerA === lowerB) {
        return 0
      }
      const array = [lowerA, lowerB].sort()
      if (array[0] === lowerA) {
        return -1
      }
      return 1
    })
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
}
