import moment from 'moment'
import produce from 'immer'

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
      const previousTournament = draftTournaments[i - 1] || {}
      if (!previousTournament.id) continue
      const {
        winningAdId,
        winningAdIndex,
        streakWinnerId,
        streakWinnerIndex,
        isAdPair,
      } = tournament
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
      // STOP HERE if only one ad
      if (tournament.adPosts.length === 1) continue
      // STOP HERE if current winner is not same as previous streak winner ID
      if (winningAdId !== previousStreakWinnerId) continue
      // STOP HERE if current winner index matches the previous streak winner index
      if (winningAdIndex === previousStreakWinnerIndex) continue
      // Else flip the ads...
      tournament.adPosts.reverse()
      // And update the index
      const updatedStreakWinnerIndex = streakWinnerIndex === 0 ? 1 : 0
      tournament.streakWinnerIndex = updatedStreakWinnerIndex
    }
  })
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

// GET WINNING AD
const getWinningAdId = (tournament) => {
  const { winner } = tournament
  if (!winner) return
  const { ad: { path } } = winner
  const pathParts = path.split('/')
  return pathParts[pathParts.length - 1]
}

// GET ARRAY of WINNING STATUSES
const getWinningResults = (ads, metric) => {
  const [adA, adB = {}] = ads
  const { engagement_score: scoreA, streak: streakA } = adA
  const { engagement_score: scoreB, streak: streakB } = adB
  const metricA = metric === 'score' ? scoreA : streakA
  const metricB = metric === 'score' ? scoreB : streakB
  if (!metricB) {
    if (metricA) return [true, false]
    return [false, false]
  }
  if (metricA === metricB) return [true, true]
  if (metricA > metricB) return [true, false]
  return [false, true]
}

// FORMAT AD DATA TO BE CONSUMED
/**
 * @param {array} [streakResults]
 * @param {array} [scoreResults]
 * @param {string} [currency]
* @param {object} [ad]
* @param {number} [index]
* @returns {object}
*/
const formatAdData = (streakResults, scoreResults, currency) => (ad, index) => {
  const {
    id,
    adcreatives,
    asset = {},
    summary,
    streak,
    engagement_score: score,
  } = ad
  const adCreative = Object.values(adcreatives)[0]
  const postContent = getPostContent(adCreative)
  // Format score and streak
  const streakWinner = streakResults[index]
  const scoreWinner = scoreResults[index]
  // Get clicks
  const clicks = summary && summary.outbound_clicks && summary.outbound_clicks.outbound_click
  // Get spend
  const spend = summary && parseFloat(summary.spend)
  // Build data obj
  const normalizedEsRounded = asset.normalized_es && asset.normalized_es.toFixed(2)
  const data = {
    clicks,
    spend,
    // streak: utils.formatNumber(streak),
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
    scoreWinner,
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
const formatTournamentData = (tournament, currency) => {
  const { ads, adset, created_at, status, id } = tournament
  const { identifier: adsetType } = adset
  // Convert ads to array
  const adsArray = Object.values(ads)
  const scoreResults = getWinningResults(adsArray, 'score')
  const streakResults = getWinningResults(adsArray, 'streak')
  const streakWinnerIndex = streakResults.indexOf(true)
  const { id: streakWinnerId } = adsArray[streakWinnerIndex] || {}
  // Get winning AD id
  const winningAdId = getWinningAdId(tournament)
  const winningAdIndex = adsArray.findIndex(({ id }) => id === winningAdId)
  // Format Ad
  const adPosts = adsArray.map(formatAdData(streakResults, scoreResults, currency))
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
 * @param {string} [currency]
 * @returns {array}
 */
export const handleNewTournaments = ({
  incomingTournaments,
  currency,
}) => {
  // Format tournament into consumable content
  const formattedIncoming = incomingTournaments.map((tournament) => {
    return formatTournamentData(tournament, currency)
  })
  // Add information about streak position
  const tournamentsWithStreakInfo = setAdStreakPositions(formattedIncoming)
  return tournamentsWithStreakInfo
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
  const detailsA = utils.getDataArray(metricsToDisplay, dataA, true)
  const detailsB = dataB ? utils.getDataArray(metricsToDisplay, dataB, true) : []
  const detailsObj = detailsA.reduce((data, detailA) => {
    const { name: nameA, value: valueA, key: keyA } = detailA
    // Get matching data from source B (with fallbacks)
    const detailB = detailsB.find(({ key }) => keyA === key) || {}
    const { name: nameB = nameA, value: valueB = '-' } = detailB
    // Get tooltip
    const tooltip = metricTooltips[keyA]
    // Set values for data type
    data[keyA] = {
      dataType: keyA,
      tooltip,
      a: { name: nameA, value: valueA, key: keyA },
      b: { name: nameB, value: valueB, key: `${keyA}-b` },
    }
    // return completed object
    return data
  }, {})
  return Object.values(detailsObj)
}
