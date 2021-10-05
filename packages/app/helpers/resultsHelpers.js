/* eslint-disable import/prefer-default-export */
import * as api from '@/helpers/api'

import brandColors from '@/constants/brandColors'
import resultsCopy from '@/app/copy/ResultsPageCopy'
import { formatCurrency } from '@/helpers/utils'

export const postResultsConfig = [
  {
    type: 'engage',
    key: 'engaged',
    color: brandColors.blue,
  },
  {
    type: 'reach',
    key: 'reach',
    color: brandColors.green,
  },
  {
    type: 'convert',
    key: ['sales_value', 'events_count'],
    color: brandColors.redLight,
  },
]

const formatResultsData = (data) => {
  const formattedData = Object.entries(data).reduce((newObject, [key, value]) => {
    const { asset, ...stats } = value

    newObject[key] = stats
    if (value?.asset && (key !== 'spend')) {
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

export const makeStatsObject = ({ chartType, isPurchase = false, prevPeriod = null, currPeriod = null, copy }) => {
  return {
    chartType,
    isPurchase,
    chartData: [
      { type: 'prev', value: prevPeriod },
      { type: 'curr', value: currPeriod },
    ],
    copy,
  }
}

export const getExistingAudienceData = (data) => {
  let chartType = 'fallback'
  let prevPeriod = null
  let currPeriod = null
  let copy = ''

  const {
    on_platform: {
      ads_reach: { proportion: adsReachProportion, prev_period: adsReachPrevValue, curr_period: adsReachCurrValue },
      organic_reach: { proportion: organicReachProportion },
    },
  } = data

  if (adsReachProportion && organicReachProportion && (adsReachProportion > organicReachProportion)) {
    const roundedAdsReachProportion = +(adsReachProportion * 100).toFixed(1)
    const roundedOrganicReachProportion = +(organicReachProportion * 100).toFixed(1)
    chartType = 'main'

    return {
      chartType,
      copy: resultsCopy.existingAudienceMainDescription(roundedAdsReachProportion, roundedOrganicReachProportion),
      chartData: {
        adsReachProportion: roundedAdsReachProportion,
        organicReachProportion: roundedOrganicReachProportion,
      },
    }
  }

  if (adsReachPrevValue && adsReachCurrValue) {
    prevPeriod = adsReachPrevValue
    currPeriod = adsReachCurrValue
    copy = resultsCopy.existingAudienceFallback(adsReachCurrValue, adsReachPrevValue)
  }

  if (!adsReachPrevValue && adsReachCurrValue) {
    currPeriod = adsReachCurrValue
    copy = resultsCopy.existingAudienceFallback(adsReachCurrValue)
  }

  if (!currPeriod) return null

  return makeStatsObject({ chartType, prevPeriod, currPeriod, copy })
}

export const getNewAudienceData = (data) => {
  let chartType = 'fallback'
  let prevPeriod = null
  let currPeriod = null
  let copy = ''

  const {
    on_platform: { audience_size: audienceSize } = {},
    unaware: { engaged, reach } = {},
  } = data

  if ((audienceSize?.growth?.percentage * 100) >= 1) {
    chartType = 'main'
    prevPeriod = audienceSize.prev_period
    currPeriod = audienceSize.curr_period
    copy = resultsCopy.newAudienceOnPlatformMainDescription(+(audienceSize.growth.percentage * 100).toFixed(1))
  }

  if (chartType !== 'main') {
    if (engaged.curr_period >= 250 && engaged.prev_period) {
      prevPeriod = engaged.prev_period
      currPeriod = engaged.curr_period
      copy = resultsCopy.newAudienceUnawareFallbackEngaged(engaged.curr_period, engaged.prev_period)
    }

    if (engaged.curr_period < 250 && reach.prev_period) {
      prevPeriod = reach.prev_period
      currPeriod = reach.curr_period
      copy = resultsCopy.newAudienceUnawareFallbackReach(reach.curr_period, reach.prev_period)
    }

    if (engaged.curr_period >= 250 && !engaged.prev_period) {
      currPeriod = engaged.curr_period
      copy = resultsCopy.newAudienceUnawareFallbackEngaged(engaged.curr_period)
    }

    if (engaged.curr_period < 250 && !reach.prev_period) {
      currPeriod = reach.curr_period
      copy = resultsCopy.newAudienceUnawareFallbackReach(reach.curr_period)
    }
  }

  if (!currPeriod) return null

  return makeStatsObject({ chartType, prevPeriod, currPeriod, copy })
}

export const getOptimisationsEvents = (data) => {
  return Object.entries(data).reduce((array, [key, value]) => {
    if (!value?.curr_period?.count) return array
    return [...array, { ...value, event: key }]
  }, [])
}

export const getConversionData = (data) => {
  let chartType = 'fallback'
  let prevPeriod = 0
  let currPeriod = 0
  let copy = ''
  let isPurchase = false

  const optimisationsEvents = getOptimisationsEvents(data.conversions)
  const currentOptimisationEvent = optimisationsEvents.sort((a, b) => b.curr_period.count - a.curr_period.count)[0]

  const {
    conversions: {
      omni_purchase,
      spend,
      landing_page_views,
      unique_outbound_clicks,
      reach,
    },
    facebookPixelEvent,
    currency,
  } = data
  const roas = +(omni_purchase.curr_period.value / spend.curr_period).toFixed(1)

  if (roas > 1) {
    chartType = 'main'
    isPurchase = true
    prevPeriod = spend.curr_period
    currPeriod = omni_purchase.curr_period.value
    copy = resultsCopy.conversionMainDescription(roas)
    return makeStatsObject({ chartType, isPurchase, prevPeriod, currPeriod, copy })
  }

  if (!omni_purchase.prev_period.value && omni_purchase.curr_period.value) {
    isPurchase = true
    currPeriod = omni_purchase.curr_period.value
    copy = resultsCopy.conversionFallbackSales(formatCurrency(currPeriod, currency))
    return makeStatsObject({ chartType, isPurchase, currPeriod, copy })
  }

  if (omni_purchase.prev_period.value && omni_purchase.curr_period.value) {
    isPurchase = true
    prevPeriod = omni_purchase.prev_period.value
    currPeriod = omni_purchase.curr_period.value
    copy = resultsCopy.conversionFallbackSales(formatCurrency(currPeriod, currency), formatCurrency(prevPeriod, currency))
    return makeStatsObject({ chartType, isPurchase, prevPeriod, currPeriod, copy })
  }

  if (optimisationsEvents.length > 0) {
    chartType = 'optimisationEvents'
    prevPeriod = currentOptimisationEvent.prev_period.count
    currPeriod = currentOptimisationEvent.curr_period.count
    copy = resultsCopy.conversionFallbackOptimisationEvents(currPeriod, currentOptimisationEvent.event, prevPeriod)
    return makeStatsObject({ chartType, currPeriod, copy })
  }

  if (!landing_page_views.prev_period && landing_page_views.curr_period) {
    currPeriod = landing_page_views.curr_period
    copy = resultsCopy.conversionFallbackLandingPageViews(currPeriod, facebookPixelEvent)
    return makeStatsObject({ chartType, currPeriod, copy })
  }

  if (landing_page_views.prev_period && landing_page_views.curr_period) {
    prevPeriod = landing_page_views.prev_period
    currPeriod = landing_page_views.curr_period
    copy = resultsCopy.conversionFallbackLandingPageViews(currPeriod, facebookPixelEvent, prevPeriod)
    return makeStatsObject({ chartType, prevPeriod, currPeriod, copy })
  }

  if (!unique_outbound_clicks.prev_period && unique_outbound_clicks.curr_period) {
    currPeriod = unique_outbound_clicks.curr_period
    copy = resultsCopy.conversionFallbackOutboundClicks(currPeriod, facebookPixelEvent)
    return makeStatsObject({ chartType, currPeriod, copy })
  }

  if (unique_outbound_clicks.curr_period && unique_outbound_clicks.prev_period) {
    prevPeriod = unique_outbound_clicks.prev_period
    currPeriod = unique_outbound_clicks.curr_period
    copy = resultsCopy.conversionFallbackOutboundClicks(currPeriod, facebookPixelEvent, prevPeriod)
    return makeStatsObject({ chartType, prevPeriod, currPeriod, copy })
  }

  if (reach.curr_period && reach.prev_period) {
    prevPeriod = reach.prev_period
    currPeriod = reach.curr_period
    copy = resultsCopy.conversionFallbackReach(currPeriod, facebookPixelEvent, prevPeriod)
    return makeStatsObject({ chartType, prevPeriod, currPeriod, copy })
  }

  if (reach.curr_period && !reach.prev_period) {
    currPeriod = reach.curr_period
    copy = resultsCopy.conversionFallbackReach(currPeriod, facebookPixelEvent)
    return makeStatsObject({ chartType, currPeriod, copy })
  }

  return null
}

export const getStatsData = (data) => {
  return {
    newAudienceData: getNewAudienceData(data),
    existingAudienceData: getExistingAudienceData(data),
    conversionData: getConversionData(data),
  }
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
  if (formattedData) {
    formattedData.dateRange = {
      from: res.date_from,
      to: res.date_to,
    }
  }
  return formattedData
}