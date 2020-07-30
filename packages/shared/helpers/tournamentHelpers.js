import moment from 'moment'

import * as utils from '@/helpers/utils'
import brandColors from '@/constants/brandColors'
import { metricTooltips } from '@/app/copy/tournamentsCopy'


// AUDIENCE and TOURNMANET PROPS
// ------------------------------
export const audienceTypes = [
  {
    id: 'remind_traffic',
    title: 'Warm',
    color: brandColors.red,
    activeTextColor: brandColors.white,
  },
  {
    id: 'entice_traffic',
    title: 'Cool',
    color: brandColors.soundcloud.bg,
    activeTextColor: brandColors.soundcloud.text,
  },
  {
    id: 'entice_engage',
    title: 'Cold',
    color: brandColors.twitter.bg,
    activeTextColor: brandColors.twitter.text,
  },
]

export const tournamentTypes = [
  { id: 'posts', title: 'Posts' },
  { id: 'stories', title: 'Stories' },
]

export const metricsToDisplay = [
  'score',
  'streak',
  'spend',
  'reach',
  'impressions',
  'clicks',
  // 'score',
  // 'shares',
  // 'likes',
  // 'views',
  // 'normalized_es',
  // 'subtype',
]


// FILTER TOURNAMENTS BY ADSET (and POST TYPE)
// -------------------------------------------
/**
 * @param {array} [tournaments]
 * @param {string} [audienceId]
 * @returns {array}
 */
export const filterTournaments = (tournaments, audienceId) => {
  return tournaments.reduce((tournamentsFiltered, tournament) => {
    const { status, adset: { identifier } } = tournament
    // Remove tournaments that don't match audience type
    if (identifier !== audienceId) return tournamentsFiltered
    // Remove tournaments that are pending
    if (status === 'pending') return tournamentsFiltered
    // Build array
    return [...tournamentsFiltered, tournament]
  }, [])
}


// FORMAT DATA
// -------------------------------------

// GET POST CONTENT
/**
  * @param {object} [adCreative]
  * @returns {object}
*/
const getPostContent = (adCreative) => {
  const { object_type, object_story_spec, instagram_actor_id, instagram_permalink_url, image_url, thumbnail_url } = adCreative
  const baseContent = {
    postLink: instagram_permalink_url,
  }
  // Insta video
  if (object_type === 'VIDEO' && instagram_actor_id) {
    const { video_data: { message, image_url: imageSrc } } = object_story_spec
    const thumbnailOptions = [imageSrc, image_url, thumbnail_url]
    return { ...baseContent, message, thumbnailOptions }
  }
  // Insta share
  if (object_type === 'SHARE' && instagram_actor_id) {
    const { link_data: { message, picture: imageSrc, link: adLink } } = object_story_spec
    const thumbnailOptions = [imageSrc, image_url, thumbnail_url]
    return { ...baseContent, message, adLink, thumbnailOptions }
  }
  return {}
}


// FORMAT TOURNAMENT DATA TO BE CONSUMED
/**
 * @param {object} [tournament]
 * @returns {object}
 */
export const formatTournamentData = (tournament, currency) => {
  const { ads, created_at, status } = tournament
  const adsArray = Object.values(ads)
  // Sort posts by score
  const adsArraySorted = adsArray.sort((a, b) => {
    const { engagement_score: scoreA } = a
    const { engagement_score: scoreB } = b
    return scoreB - scoreA
  })
  // Get Post content
  const adPosts = adsArraySorted.map((ad) => {
    const {
      id,
      adcreatives,
      asset,
      summary,
      streak,
      engagement_score: score,
    } = ad
    const adCreative = Object.values(adcreatives)[0]
    const postContent = getPostContent(adCreative)
    // Format score and streak
    // Get clicks
    const clicks = summary && summary.outbound_clicks && summary.outbound_clicks.outbound_click
    // Get spend
    const spendFormatted = summary && utils.formatCurrency(summary.spend, currency)
    // Build data obj
    const normalizedEsRounded = asset.normalized_es && asset.normalized_es.toFixed(2)
    const data = {
      clicks,
      score: utils.formatNumber(score),
      streak: utils.formatNumber(streak),
      spend: spendFormatted,
      impressions: summary ? summary.impressions : null,
      reach: asset.reach,
      shares: asset.shares,
      likes: asset.likes,
      views: asset.views,
      normalized_es: normalizedEsRounded,
      subtype: asset.subtype,
    }
    return {
      ...postContent,
      id,
      score,
      streak: utils.formatNumber(streak),
      streakInt: streak,
      data,
    }
  })
  // Format time data
  const dateCreated = moment(created_at).format('D MMM YYYY')
  const timeCreated = moment(created_at).format('HH[:]mm')
  return {
    status,
    adPosts,
    dateCreated,
    timeCreated,
  }
}

// GET ARRAY OF WINNING STATUSES for Score and Streak
/**
* @param {string} [key]
* @param {boolean} [isAdPair]
* @param {array} [streakResults]
* @returns {array}
*/
const getWinningStatuses = (key, isAdPair, streakResults) => {
  if (key === 'score' && isAdPair) return [true, false]
  if (key === 'streak') return streakResults
  return [null, null]
}


// GET ARRAY OF WINNING Streak WINNERS
/**
* @param {object} [adA]
* @param {object} [adB]s]
* @returns {array}
*/
export const getStreakResults = (adA = {}, adB = {}) => {
  const { streakInt: streakA } = adA
  const { streakInt: streakB } = adB
  if (!streakB) {
    if (streakA) return [true, false]
    return [false, false]
  }
  if (streakA === streakB) return [true, true]
  if (streakA > streakB) return [true, false]
  return [false, true]
}


// CREATE AD METRICS ARRAY to iterate over
/**
 * @param {object} [dataA]
 * @param {object} [dataB]
 * @param {boolean} [isAdPair]
 * @param {array} [streakResults]
 * @returns {array}
 */
export const getAdMetrics = (dataA, dataB, isAdPair, streakResults) => {
  const detailsA = utils.getDataArray(metricsToDisplay, dataA)
  const detailsB = dataB ? utils.getDataArray(metricsToDisplay, dataB) : []
  const detailsObj = detailsA.reduce((data, detailA) => {
    const { name: nameA, value: valueA, key: keyA } = detailA
    // Get matching data from source B (with fallbacks)
    const detailB = detailsB.find(({ key }) => keyA === key) || {}
    const { name: nameB = nameA, value: valueB = '-' } = detailB
    // Get winner status for score and streak
    const [winnerA, winnerB] = getWinningStatuses(keyA, isAdPair, streakResults)
    // Get tooltip
    const tooltip = metricTooltips[keyA]
    // Set values for data type
    data[keyA] = {
      dataType: keyA,
      tooltip,
      a: { name: nameA, value: valueA, key: keyA, winner: winnerA },
      b: { name: nameB, value: valueB, key: `${keyA}-b`, winner: winnerB },
    }
    // return completed object
    return data
  }, {})
  return Object.values(detailsObj)
}
