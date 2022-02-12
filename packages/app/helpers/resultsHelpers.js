/* eslint-disable import/prefer-default-export */
import * as api from '@/helpers/api'
import moment from 'moment'

import brandColors from '@/constants/brandColors'
import resultsCopy from '@/app/copy/ResultsPageCopy'
import { formatCurrency } from '@/helpers/utils'
import { getDataSourceValue } from '@/app/helpers/appServer'

import * as server from '@/app/helpers/appServer'
import { formatServerData } from '@/app/helpers/insightsHelpers'

export const postResultsConfig = [
  {
    type: 'unaware',
    key: 'engaged',
    color: brandColors.blue,
  },
  {
    type: 'on_platform',
    key: 'reach',
    color: brandColors.green,
  },
  {
    type: 'conversions',
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
        type: key,
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
      ads_reach: {
        prev_period: {
          value: adsReachPrevValue,
        },
        curr_period: {
          proportion: adsReachProportion,
          value: adsReachCurrValue,
        },
      },
      organic_reach: {
        curr_period: {
          proportion: organicReachProportion,
        },
      },
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

export const noSpendMetricTypes = {
  reach: {
    type: 'reach',
    color: brandColors.blue,
  },
  engagement: {
    type: 'engagement',
    color: brandColors.green,
  },
  growth: {
    type: 'growth',
    color: brandColors.instagram.bg,
  },
}

export const noSpendDataSources = [
  {
    platform: 'facebook',
    source: 'facebook_likes',
  },
  {
    platform: 'instagram',
    source: 'instagram_follower_count',
  },
]

export const getStatsData = (data) => {
  return {
    newAudienceData: getNewAudienceData(data),
    existingAudienceData: getExistingAudienceData(data),
    conversionData: getConversionData(data),
  }
}

const getQuartile = (percentile, audience) => {
  if (percentile <= 25) {
    return {
      value: 1,
      position: 'left',
      copy: audience === 'growth' ? 'Slow' : 'Low',
    }
  }
  if (percentile > 25 && percentile <= 50) {
    return {
      value: 2,
      position: 'center',
      copy: 'Average',
    }
  }
  if (percentile > 50 && percentile <= 75) {
    return {
      value: 3,
      position: 'center',
      copy: audience === 'growth' ? 'Solid' : 'Good',
    }
  }
  if (percentile > 75) {
    return {
      value: 4,
      position: 'right',
      copy: audience === 'growth' ? 'Fast' : 'High',
    }
  }
}

export const getDataSourceValues = async (artistId) => {
  const dataSources = noSpendDataSources.map(({ source }) => source)
  const {
    facebook_likes,
    instagram_follower_count,
  } = await getDataSourceValue(dataSources, artistId)

  return {
    dailyFacebookData: facebook_likes?.daily_data,
    dailyInstagramData: instagram_follower_count?.daily_data,
  }
}

const getFollowerCount = (platform, data) => {
  return data.followers[platform].number_of_followers.value
}

export const getOrganicBenchmarkData = ({ data }) => {
  const igFollowers = getFollowerCount('instagram', data)
  const fbFollowers = getFollowerCount('facebook', data)
  const largestPlatform = igFollowers >= fbFollowers ? 'instagram' : 'facebook'
  const {
    aggregated: {
      reach_rate,
      engagement_rate,
    },
    followers: {
      [largestPlatform]: {
        growth_absolute,
        growth_rate,
        number_of_followers,
      },
    },
  } = data


  const reachRateMedianValue = (reach_rate.median.value * 100).toFixed(1)
  const reachRateMedianPercentile = (reach_rate.median.percentile * 100).toFixed(1)

  const reachData = {
    value: reachRateMedianValue,
    percentile: reachRateMedianPercentile,
    quartile: getQuartile(reachRateMedianPercentile, 'reach'),
    copy: resultsCopy.noSpendReachDescription(reachRateMedianValue),
  }

  const engagementRateMedianValue = (engagement_rate.median.value * 100).toFixed(1)
  const engagementRateMedianPercentile = (engagement_rate.median.percentile * 100).toFixed(1)

  const engageData = {
    value: engagementRateMedianValue,
    percentile: engagementRateMedianPercentile,
    quartile: getQuartile(engagementRateMedianPercentile, 'engagement'),
    copy: resultsCopy.noSpendEngageDescription(engagementRateMedianValue),
  }

  let growthData = {}

  if (growth_absolute.value) {
    const followersGrowthAbsoluteMedianValue = growth_absolute.value
    const followersGrowthRateValue = (growth_rate.value * 100).toFixed(1)
    const followersGrowthRateMedianPercentile = (growth_rate.percentile * 100).toFixed(1)

    growthData = {
      value: followersGrowthAbsoluteMedianValue,
      percentile: followersGrowthRateMedianPercentile,
      quartile: getQuartile(followersGrowthRateMedianPercentile, 'growth'),
      platform: largestPlatform,
      copy: resultsCopy.noSpendGrowthDescription(followersGrowthAbsoluteMedianValue, largestPlatform, followersGrowthRateValue),
      hasGrowth: true,
    }
  } else {
    growthData = {
      value: number_of_followers.value,
      copy: resultsCopy.noSpendTotalFollowersDescription,
      hasGrowth: false,
    }
  }

  return { reach: reachData, engagement: engageData, growth: growthData }
}

export const formatAggregatedOrganicBenchmarkData = ({ data }) => {
  const {
    aggregated: {
      reach_rate,
      engagement_rate,
    },
  } = data

  const reachRateMedianValue = (reach_rate.median.value * 100).toFixed(1)
  const reachData = {
    value: reachRateMedianValue,
  }

  const engagementRateMedianValue = (engagement_rate.median.value * 100).toFixed(1)
  const engageData = {
    value: engagementRateMedianValue,
  }

  return { reach: reachData, engagement: engageData }
}

export const formatRecentPosts = (posts) => {
  const formattedPosts = posts.map((post) => {
    const media = post.display?.media?.original?.source || post.display?.media?.original?.picture
    const thumbnailUrls = post.display?.thumbnails?.map((thumbnail) => thumbnail.url) || []
    const thumbnails = [
      post.display?.media?.media_library?.source,
      post.display?.thumbnail_url,
      ...thumbnailUrls,
    ]

    return {
      id: post.id,
      publishedTime: moment(post.published_time).format('YYYY-MM-DD'),
      reach: (post.reach_rate * 100).toFixed(1),
      engagement: (post.engagement_rate * 100).toFixed(1),
      media,
      thumbnails,
      postType: post.subtype || post.type,
    }
  })

  return formattedPosts
}

export const getRecentPosts = async (artistId, platform) => {
  const res = await server.getPosts({
    artistId,
    filterBy: {
      date_from: [moment().subtract(30, 'days')],
      date_to: [moment()],
      platform: [platform],
      internal_type: ['post'],
    },
    limit: 100,
  })
  const formattedRecentPosts = formatRecentPosts(res)

  return formattedRecentPosts
}

export const getFollowerGrowth = async (artistId) => {
  const {
    dailyFacebookData,
    dailyInstagramData,
  } = await getDataSourceValues(artistId)

  const formattedData = [dailyFacebookData, dailyInstagramData].map((dailyData, index) => {
    if (!dailyData || !Object.keys(dailyData).length) {
      return
    }

    const { source, platform } = noSpendDataSources[index]

    return formatServerData({
      dailyData,
      currentDataSource: source,
      currentPlatform: platform,
    })
  })

  if (!formattedData.filter(data => data).length) {
    return
  }

  return formattedData
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
  const { res, error } = await api.requestWithCatch('get', endpoint, payload, errorTracking)

  if (error) return { error }

  const formattedData = res.summary ? formatResultsData(res.summary) : null
  if (formattedData) {
    formattedData.dateRange = {
      from: res.date_from,
      to: res.date_to,
    }
  }
  return { res: formattedData }
}

// GET ORGANIC BENCHMARK
/**
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getOrganicBenchmark = async (artistId) => {
  const endpoint = `/artists/${artistId}/organic_benchmark`
  const payload = {}
  const errorTracking = {
    category: 'Results',
    action: 'Get organic benchmark',
  }
  const { res, error } = await api.requestWithCatch('get', endpoint, payload, errorTracking)

  return { res, error }
}

// GET AGGREGATED ORGANIC BENCHMARK
/**
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getAggregatedOrganicBenchmark = async () => {
  const endpoint = '/organic_benchmarks/aggregated'
  const payload = {}
  const errorTracking = {
    category: 'Results',
    action: 'Get aggregated organic benchmark',
  }
  const { res, error } = await api.requestWithCatch('get', endpoint, payload, errorTracking)

  return { res, error }
}

export const getAverages = async () => {
  const { res, error } = await getAggregatedOrganicBenchmark()

  if (error) return { error }

  const aggregatedOrganicBenchmarkData = formatAggregatedOrganicBenchmarkData(res)

  return { res: aggregatedOrganicBenchmarkData }
}
