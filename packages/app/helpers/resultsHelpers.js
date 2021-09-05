/* eslint-disable import/prefer-default-export */
import * as api from '@/helpers/api'
import brandColors from '@/constants/brandColors'

export const postResultsConfig = [
  {
    type: 'growth',
    color: brandColors.blue,
  },
  {
    type: 'reach',
    color: brandColors.green,
  },
  {
    type: 'convert',
    color: brandColors.redLight,
  },
]

const formatResultsData = (data) => {
  const formattedData = Object.entries(data).reduce((newObject, [key, value]) => {
    const { asset, ...stats } = value

    newObject[key] = stats
    if (key === 'on_platform' || key === 'unaware') {
      newObject.posts.push({
        ...value.asset,
      })
    }
    return newObject
  }, { posts: [] })

  return formattedData
}

export const convertChartValues = (adsReachProportion, organicReachProportion) => {
  const highestValue = Math.max(adsReachProportion, organicReachProportion)
  let multiplier = 1
  let maxValue = 100

  if (highestValue < 25 && highestValue >= 10) {
    multiplier = 2
    maxValue = 50
  }

  if (highestValue < 10 && highestValue >= 1) {
    multiplier = 4
    maxValue = 25
  }

  if (highestValue < 1) {
    multiplier = 40
    maxValue = 2.5
  }

  return {
    adsReachWidth: adsReachProportion * multiplier,
    organicReachWidth: organicReachProportion * multiplier,
    maxValue,
    highestValue,
  }
}

// GET AD RESULTS SUMMARY
/**
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getAdResultsSummary = async (artistId) => {
  // TODO: Switch endpoint when back-end is ready
  // const endpoint = `/artists/${artistId}/ad_results_summary`
  const endpoint = 'http://localhost:3000/stats.json'
  const payload = {}
  const errorTracking = {
    category: 'Results',
    action: 'Get ad results summary',
  }
  const { res } = await api.requestWithCatch('get', endpoint, payload, errorTracking)
  const formattedData = formatResultsData(res.summary)
  return formattedData
}
