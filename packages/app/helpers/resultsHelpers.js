/* eslint-disable import/prefer-default-export */
import * as api from '@/helpers/api'

import brandColors from '@/constants/brandColors'
import resultsCopy from '@/app/copy/ResultsPageCopy'

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
    key: 'sales_value',
    color: brandColors.redLight,
  },
]

export const optimisationsEvents = {
  lead: {
    name: 'Leads',
    key: 'lead',
    event: 'leads',
    detail: 'a lead generation ad',
  },
  omni_complete_registration: {
    name: 'Registrations',
    key: 'omni_complete_registration',
    event: 'registrations',
    detail: 'an ad about registering',
  },
  contact_total: {
    name: 'Contacts',
    event: 'new contacts',
    detail: 'an ad about getting in contact',
  },
  subscribe_total: {
    name: 'Subscribers',
    event: 'subscribers',
    detail: 'an ad about subscribing',
  },
  omni_purchase: {
    name: 'Sales',
    event: 'sales',
    detail: 'a sales ad',
  },
}

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

export const getExistingAudienceData = (data) => {
  let isMainChart = false
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

  if (adsReachPrevValue && adsReachCurrValue) {
    prevPeriod = adsReachPrevValue
    currPeriod = adsReachCurrValue
    copy = resultsCopy.existingAudienceFallbackDouble(adsReachPrevValue, adsReachCurrValue)
  }

  if (!adsReachPrevValue && adsReachCurrValue) {
    currPeriod = adsReachCurrValue
    copy = resultsCopy.existingAudienceFallbackSingle(adsReachCurrValue)
  }

  if (!currPeriod) return null

  return {
    isMainChart,
    copy,
    chartData: [
      { type: 'prev', value: prevPeriod },
      { type: 'curr', value: currPeriod },
    ],
  }
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
    copy = resultsCopy.newAudienceOnPlatformMainDescription(+(audienceSize.growth.percentage * 100).toFixed(1))
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

  if (!currPeriod) return null

  return {
    isMainChart,
    copy,
    chartData: [
      { type: 'prev', value: prevPeriod },
      { type: 'curr', value: currPeriod },
    ],
  }
}

const getOptimisationsEvents = (data) => {
  return Object.entries(data).reduce((object, [key, value]) => {
    if (!value?.curr_period?.count) return object
    return { ...object, [key]: value }
  }, {})
}

export const getConversionData = (data) => {
  let chartType = 'fallback'
  let prevPeriod = 0
  let currPeriod = 0
  let copy = ''

  const optimisationsEvents = getOptimisationsEvents(data.conversions)
  const hasGeneratedOptimisationEvents = Object.keys(optimisationsEvents).length > 0
  const hasPurchaseOptimisationEvent = Object.keys(optimisationsEvents).includes('omni_purchase')

  const {
    conversions: {
      omni_purchase,
      spend,
      landing_page_views,
      unique_outbound_clicks,
      reach,
    },
  } = data
  const roas = omni_purchase.curr_period.value / spend.curr_period

  if (roas > 1) {
    chartType = 'main'
    prevPeriod = spend.curr_period
    currPeriod = omni_purchase.curr_period.value
    copy = resultsCopy.conversionMainDescription(roas)
  }

  if (roas <= 1 && omni_purchase.prev_period) {
    prevPeriod = omni_purchase.prev_period.value
    currPeriod = omni_purchase.curr_period.value
    copy = resultsCopy.conversionFallbackSalesDouble(omni_purchase.prev_period.value, omni_purchase.curr_period.value)
  }

  if (roas <= 1 && !omni_purchase.prev_period) {
    currPeriod = omni_purchase.curr_period.value
    copy = resultsCopy.conversionFallbackSalesSingle(omni_purchase.curr_period.value)
  }

  if (!hasPurchaseOptimisationEvent && hasGeneratedOptimisationEvents) {
    chartType = 'optimisationEvents'
    copy = resultsCopy.conversionFallbackOptimisationEvents()
  }

  if (!hasGeneratedOptimisationEvents && landing_page_views.prev_period) {
    prevPeriod = landing_page_views.prev_period
    currPeriod = landing_page_views.curr_period
    copy = resultsCopy.conversionFallbackLandingPageViews(landing_page_views.curr_period)
  }

  if (!hasGeneratedOptimisationEvents && !landing_page_views.prev_period) {
    currPeriod = landing_page_views.curr_period
    copy = resultsCopy.conversionFallbackLandingPageViews(landing_page_views.curr_period)
  }

  if (unique_outbound_clicks.curr_period && unique_outbound_clicks.prev_period) {
    prevPeriod = unique_outbound_clicks.curr_period
    currPeriod = unique_outbound_clicks.prev_period
    copy = resultsCopy.conversionFallbackOutboundClicks(unique_outbound_clicks.curr_period)
  }

  if (unique_outbound_clicks.curr_period && !unique_outbound_clicks.prev_period) {
    currPeriod = unique_outbound_clicks.curr_period
    copy = resultsCopy.conversionFallbackOutboundClicks(unique_outbound_clicks.curr_period)
  }

  if (reach.curr_period && reach.prev_period) {
    prevPeriod = reach.prev_period
    currPeriod = reach.curr_period
    copy = resultsCopy.conversionFallbackReach(reach.prev_period, reach.curr_period)
  }

  if (reach.curr_period && !reach.prev_period) {
    currPeriod = reach.curr_period
    copy = resultsCopy.conversionFallbackReach(reach.curr_period)
  }

  return {
    chartType,
    copy,
    chartData: [
      { type: 'prev', value: prevPeriod },
      { type: 'curr', value: currPeriod },
    ],
  }
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
