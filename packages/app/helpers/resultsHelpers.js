/* eslint-disable import/prefer-default-export */
import * as api from '@/helpers/api'

import brandColors from '@/constants/brandColors'
import resultsCopy from '@/app/copy/ResultsPageCopy'

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
    if (value?.asset && (key === 'on_platform' || key === 'unaware')) {
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

  if (highestValue < 50 && highestValue >= 25) {
    multiplier = 2
    maxValue = 50
  }

  if (highestValue < 25 && highestValue >= 2.5) {
    multiplier = 4
    maxValue = 25
  }

  if (highestValue < 2.5) {
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

export const getExistingAudienceData = (data) => {
  let isMainChart = false
  const prevPeriod = null
  let currPeriod = null
  let copy = ''

  const {
    on_platform: {
      ads_reach: { proportion: adsReachProportion, value: adsReachValue },
      organic_reach: { proportion: organicReachProportion },
    },
  } = data

  if (adsReachProportion && organicReachProportion && (adsReachProportion > organicReachProportion)) {
    const roundedAdsReachProportion = +(adsReachProportion * 100).toFixed(1)
    const roundedOrganicReachProportion = +(organicReachProportion * 100).toFixed(1)
    isMainChart = true

    return {
      isMainChart,
      copy: resultsCopy.existingAudienceMainDescription(roundedAdsReachProportion, roundedOrganicReachProportion),
      chartData: {
        adsReachProportion: roundedAdsReachProportion,
        organicReachProportion: roundedOrganicReachProportion,
      },
    }
  }

  if (!isMainChart) {
    if (adsReachValue) {
      currPeriod = adsReachValue
      copy = resultsCopy.existingAudienceFallbackSingle(adsReachValue)
    }
  }

  if (!prevPeriod || !currPeriod) return null

  const newAudienceData = {
    isMainChart,
    copy,
    chartData: [
      { type: 'prev', color: brandColors.green, value: prevPeriod },
      { type: 'curr', color: brandColors.redLight, value: currPeriod },
    ]
      .sort((a, b) => a.value - b.value),
  }
  return newAudienceData
}

export const getNewAudienceData = (data) => {
  let isMainChart = false
  let prevPeriod = null
  let currPeriod = null
  let copy = ''

  const {
    on_platform: { audience_size: audienceSize } = {},
    unaware: { engaged, reach } = {},
  } = data

  if ((audienceSize?.growth?.percentage * 100) >= 1) {
    isMainChart = true
    prevPeriod = audienceSize.prev_period
    currPeriod = audienceSize.curr_period
    copy = resultsCopy.newAudienceOnPlatformMainDescription(audienceSize.growth.percentage * 100)
  }

  if (!isMainChart) {
    if (engaged.curr_period >= 250 && engaged.prev_period) {
      prevPeriod = engaged.prev_period
      currPeriod = engaged.curr_period
      copy = resultsCopy.newAudienceUnawareFallbackEngagedDouble(engaged.curr_period, engaged.prev_period)
    }

    if (engaged.curr_period < 250 && reach.prev_period) {
      prevPeriod = reach.prev_period
      currPeriod = reach.curr_period
      copy = resultsCopy.newAudienceUnawareFallbackReachDouble(reach.curr_period, reach.prev_period)
    }

    if (engaged.curr_period >= 250 && !engaged.prev_period) {
      currPeriod = engaged.curr_period
      copy = resultsCopy.newAudienceUnawareFallbackEngagedSingle(engaged.curr_period)
    }

    if (engaged.curr_period < 250 && !reach.prev_period) {
      currPeriod = reach.curr_period
      copy = resultsCopy.newAudienceUnawareFallbackReachSingle(reach.curr_period)
    }
  }

  if (!prevPeriod || !currPeriod) return null

  const newAudienceData = {
    isMainChart,
    copy,
    chartData: [
      { type: 'prev', color: brandColors.blue, value: prevPeriod },
      { type: 'curr', color: brandColors.blueLight, value: currPeriod },
    ]
      .sort((a, b) => a.value - b.value),
  }
  return newAudienceData
}

// GET AD RESULTS SUMMARY
/**
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getAdResultsSummary = async (artistId) => {
  const endpoint = `/artists/${artistId}/ad_results_summary`
  const payload = {}
  const errorTracking = {
    category: 'Results',
    action: 'Get ad results summary',
  }
  const { res } = await api.requestWithCatch('get', endpoint, payload, errorTracking)
  const formattedData = res.summary ? formatResultsData(res.summary) : null
  return formattedData
}
