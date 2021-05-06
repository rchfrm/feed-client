import moment from 'moment'
import produce from 'immer'

import * as utils from '@/helpers/utils'
import { getArtistTournaments } from '@/helpers/sharedServer'
import { metricTooltips } from '@/app/copy/tournamentsCopy'


// FILTER TOURNAMENTS BY ADSET (and POST TYPE)
// -------------------------------------------
/**
 * @param {array} [tournaments]
 * @param {string} [audienceId]
 * @returns {array}
 */
export const filterTournaments = (tournaments, audienceId) => {
  return tournaments.reduce((tournamentsFiltered, tournament) => {
    const { status, adsetType } = tournament
    // Remove tournaments that don't match audience type
    if (adsetType !== audienceId) return tournamentsFiltered
    // Remove tournaments that are pending
    if (status === 'pending') return tournamentsFiltered
    // Build array
    return [...tournamentsFiltered, tournament]
  }, [])
}

// SORT TOURNAMENT ADS TO ALIGN STREAKS
// -------------------------------------

// SET STREAK POSITION ON LAST TOURNAMENT ADS
/**
 * @param {object} [lastTournament]
 * @param {object} [firstIncomingTournament]
 * @returns {object}
 */
export const setLastStreakPosition = (lastTournament, firstIncomingTournament) => {
  lastTournament.nextWinningAdId = firstIncomingTournament.winningAdId
  lastTournament.nextWinningAdIndex = firstIncomingTournament.winningAdIndex
  lastTournament.nextStreakWinnerId = firstIncomingTournament.streakWinnerId
  lastTournament.nextStreakWinnerIndex = firstIncomingTournament.streakWinnerIndex
  lastTournament.nextIsAdPair = firstIncomingTournament.isAdPair
}

// SET STREAK POSITIONS ON ADS
/**
 * @param {array} [tournaments]
 * @returns {array}
 */
export const setAdStreakPositions = (tournaments) => {
  return produce(tournaments, draftTournaments => {
    for (let i = 0; i < draftTournaments.length; i += 1) {
      const tournament = draftTournaments[i]
      const {
        winningAdId,
        winningAdIndex,
        streakWinnerId,
        streakWinnerIndex,
        isAdPair,
      } = tournament
      const previousTournament = draftTournaments[i - 1] || {}
      // STOP HERE IF AT START OF LIST
      if (!previousTournament.id) continue
      // Store current streak info on previous tournament
      // (this is useful to angle the line when there's only one ad in adset)
      previousTournament.nextWinningAdId = winningAdId
      previousTournament.nextWinningAdIndex = winningAdIndex
      previousTournament.nextStreakWinnerId = streakWinnerId
      previousTournament.nextStreakWinnerIndex = streakWinnerIndex
      previousTournament.nextIsAdPair = isAdPair
      const {
        streakWinnerId: previousStreakWinnerId,
        streakWinnerIndex: previousStreakWinnerIndex,
      } = previousTournament
      // FLIP THE ADS if...
      // Greater than one ad, and,
      // Winning Ad ID is the same is previous streak winner ID, and
      // Winning Ad index is not the same as the previous streak winner index
      if (
        tournament.adPosts.length > 1
        && winningAdId === previousStreakWinnerId
        && winningAdIndex !== previousStreakWinnerIndex
      ) {
        // Flip
        tournament.adPosts.reverse()
        // And update the index
        const updatedWinningIndex = winningAdIndex === 0 ? 1 : 0
        const updatedStreakWinnerIndex = streakWinnerIndex === 0 ? 1 : 0
        tournament.winningAdIndex = updatedWinningIndex
        tournament.streakWinnerIndex = updatedStreakWinnerIndex
        previousTournament.nextWinningAdIndex = updatedWinningIndex
        previousTournament.nextStreakWinnerIndex = updatedStreakWinnerIndex
      }
    }
  })
}

// LOAD DATA
// ------------------------------------
/**
  * @param {object}
  * @returns {Promise<object>} { res, error }
*/
export const fetchTournaments = ({
  artistId,
  audienceId,
  adTypeId,
  limit = 20,
  offset = 0,
  expand = true,
}) => {
  return getArtistTournaments({
    artistId,
    audienceId: `${audienceId}_${adTypeId}`,
    expand,
    limit,
    ...(offset && { offset }),
  })
}

// FORMAT DATA
// -------------------------------------

// GET POST CONTENT
/**
  * @param {object} [adCreative]
  * @returns {object}
*/
export const getPostContent = (adCreative, adAsset = {}) => {
  const { body, object_type, object_story_spec, instagram_actor_id, instagram_permalink_url, image_url, thumbnail_url } = adCreative
  const baseContent = {
    postLink: instagram_permalink_url,
  }

  const adsetThumbnails = adAsset.thumbnails ? adAsset.thumbnails.map(({ url }) => url) : []

  if (!object_story_spec) {
    const imageSrc = (/(w|h)=\d+&?/).test(thumbnail_url)
      ? thumbnail_url.replace(/(w|h)(=)\d+(&?)/g, '$1$2720$3') // convert 64x64 thumbnail into 720x720 thumbnail
      : ''

    const thumbnailOptions = [...adsetThumbnails, imageSrc, image_url, thumbnail_url]
    return { ...baseContent, message: body, thumbnailOptions }
  }

  // Insta video
  if (object_type === 'VIDEO' && instagram_actor_id) {
    const { video_data: { message, image_url: imageSrc } } = object_story_spec
    const thumbnailOptions = [...adsetThumbnails, imageSrc, image_url, thumbnail_url]
    return { ...baseContent, message, thumbnailOptions }
  }
  // Insta share
  if (object_type === 'SHARE' && instagram_actor_id) {
    const { link_data: { message, picture: imageSrc, link: adLink } } = object_story_spec
    const thumbnailOptions = [...adsetThumbnails, imageSrc, image_url, thumbnail_url]
    return { ...baseContent, message, adLink, thumbnailOptions }
  }
  return {}
}

// GET WINNING AD
const getWinningAdId = (tournament) => {
  const { winner } = tournament
  if (!winner) return
  const { ad: { path } } = winner
  const pathParts = path.split('/')
  return pathParts[pathParts.length - 1]
}

// GET ARRAY of WINNING STATUSES
const getStreakResults = (ads) => {
  if (!ads.length) return [false, false]
  const [adA = {}, adB = {}] = ads
  const { streak: streakA } = adA
  const { streak: streakB } = adB
  if (!streakB) {
    if (streakA) return [true, false]
    return [false, false]
  }
  if (streakA === streakB) return [true, true]
  if (streakA > streakB) return [true, false]
  return [false, true]
}

// CALCULATE REACH
const calculateReach = (ad) => {
  const { lifetime_metrics: lifetimeMetrics, summary } = ad
  const lifetimeDates = Object.keys(lifetimeMetrics || {}).sort()
  let reach = 0
  if (lifetimeDates.length >= 2) {
    const reachStart = lifetimeMetrics[lifetimeDates.shift()].reach || 0
    const reachEnd = lifetimeMetrics[lifetimeDates.pop()].reach || 0
    reach = reachEnd - reachStart
  }
  if (reach <= 0) {
    const reachFallback = (summary ? summary.impressions : 0) || 0
    reach = reachFallback
  }
  return reach
}

// FORMAT AD DATA TO BE CONSUMED
/**
* @param {array} [streakResults]
* @param {array} [scoreResults]
* @param {object} [ad]
* @param {number} [index]
* @returns {object}
*/
const formatAdData = (streakResults) => (ad, index) => {
  const {
    id,
    adcreatives,
    asset = {},
    summary,
    streak,
    engagement_score: score,
  } = ad
  const adCreative = Object.values(adcreatives)[0]
  const postContent = getPostContent(adCreative, asset)
  // Format score and streak
  const streakWinner = streakResults[index]
  // Get clicks
  const clicks = summary && summary.outbound_clicks && summary.outbound_clicks.outbound_click
  // Get engagement
  const engagement = summary && summary.actions && summary.actions.post_engagement
  // Get spend
  const spend = summary && parseFloat(summary.spend)
  // Get reach
  const reach = calculateReach(ad)
  // Build data obj
  const normalizedEsRounded = asset.normalized_es && asset.normalized_es.toFixed(2)
  const data = {
    clicks,
    engagement,
    spend,
    impressions: summary ? summary.impressions : null,
    reach,
    shares: asset.shares,
    likes: asset.likes,
    views: asset.views,
    normalized_es: normalizedEsRounded,
    subtype: asset.subtype,
  }
  return {
    ...postContent,
    id,
    streakWinner,
    score,
    scoreString: utils.formatNumber(score),
    streak,
    streakString: utils.formatNumber(streak),
    data,
  }
}

// FORMAT TOURNAMENT DATA TO BE CONSUMED
/**
 * @param {object} [tournament]
 * @returns {object}
 */
const formatTournamentData = (tournament) => {
  const { ads, adset, created_at, status, id } = tournament
  const { identifier: adsetType } = adset
  // Convert ads to array
  const adsArray = Object.values(ads)
  // Get streak info
  const streakResults = getStreakResults(adsArray)
  const streakWinnerIndex = streakResults.indexOf(true)
  const { id: streakWinnerId } = adsArray[streakWinnerIndex] || {}
  // Get winning AD id
  const winningAdId = getWinningAdId(tournament)
  const winningAdIndex = adsArray.findIndex(({ id }) => id === winningAdId)
  // Format Ad
  const adPosts = adsArray.map(formatAdData(streakResults))
  // Format time data
  const dateCreated = moment(created_at).format('D MMM YYYY')
  const timeCreated = moment(created_at).format('HH[:]mm')
  return {
    id,
    adsetType,
    status,
    adPosts,
    isAdPair: adPosts.length === 2,
    dateCreated,
    timeCreated,
    winningAdId,
    winningAdIndex,
    streakWinnerIndex,
    streakWinnerId,
  }
}


/**
 * @param {array} [incomingTournaments]
 * @param {array} [previousTournaments]
 * @param {array} [previousTournamentIds]
 * @returns {array}
 */
export const handleNewTournaments = ({
  incomingTournaments,
}) => {
  // Format tournament into consumable content
  const formattedIncoming = incomingTournaments.map((tournament) => {
    return formatTournamentData(tournament)
  })
  // Add information about streak position
  const tournamentsWithStreakInfo = setAdStreakPositions(formattedIncoming)
  return tournamentsWithStreakInfo
}


// METRICS
// -------------------------------------

// METRICS PROPS
export const metricsToDisplay = [
  'spend',
  'reach',
  'engagement',
  'clicks',
  // 'impressions',
  // 'score',
  // 'shares',
  // 'likes',
  // 'views',
  // 'normalized_es',
  // 'subtype',
]

// CALCULTE METRICS AS PERCENTAGE A vs B
const getRelativeMetrics = (valueA = 0, valueB = 0) => {
  if (!valueB) return [100, 0]
  const total = valueA + valueB
  const percentA = (valueA / total) * 100
  const percentB = 100 - percentA
  return [percentA, percentB]
}


// CREATE AD METRICS ARRAY to iterate over
/**
 * @param {object} [dataA]
 * @param {object} [dataB]
 * @param {boolean} [isAdPair]
 * @param {array} [streakResults]
 * @returns {array}
 */
export const getAdMetrics = (dataA, dataB, isAdPair) => {
  const dataArrayOptions = { preserveRawNumber: true, showZeroValues: true }
  const detailsA = utils.getDataArray(metricsToDisplay, dataA, dataArrayOptions)
  const detailsB = dataB ? utils.getDataArray(metricsToDisplay, dataB, dataArrayOptions) : []
  const metricKeys = [...detailsA, ...detailsB].reduce((keys, { key }) => {
    if (keys.includes(key)) return keys
    keys.push(key)
    return keys
  }, [])
  const detailsObj = metricKeys.reduce((data, key) => {
    // Get matching data from sources (with fallbacks)
    const { name: nameA, value: valueA } = detailsA.find(({ key: detailKey }) => detailKey === key) || {}
    const { name: nameB, value: valueB } = detailsB.find(({ key: detailKey }) => detailKey === key) || {}
    // Get tooltip
    const tooltip = metricTooltips[key]
    // Get data rows
    const name = nameA || nameB
    const [percentA, percentB] = getRelativeMetrics(valueA, valueB)
    const aData = { name, value: valueA, percent: percentA, key }
    const bData = isAdPair ? { name, value: valueB, percent: percentB, key: `${key}-b` } : null
    // Set values for data type
    data[key] = {
      dataType: key,
      name,
      tooltip,
      a: aData,
      b: bData,
    }
    // return completed object
    return data
  }, {})
  return Object.values(detailsObj)
}
