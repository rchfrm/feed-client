/* eslint-disable import/prefer-default-export */
import * as api from '@/helpers/api'
import moment from 'moment'
import brandColors from '@/constants/brandColors'
import resultsCopy from '@/app/copy/ResultsPageCopy'
import { formatCurrency, capitalise } from '@/helpers/utils'
import { getDataSourceValue } from '@/app/helpers/appServer'
import { getPlatformNameByValue } from '@/app/helpers/artistHelpers'
import insightDataSources from '@/constants/insightDataSources'
import countries from '@/constants/countries'

export const formatServerData = ({ dailyData, dates = {}, currentDataSource, currentPlatform, projection }) => {
  // Convert dates object to array
  const dataArray = Object.entries(dailyData)
    // Sort by dates, chronologically
    .sort(([dateA], [dateB]) => {
      return moment(dateA) - moment(dateB)
    })
  // Get details about data source
  const {
    title,
    subtitle,
    period,
    dataType,
    currency,
  } = insightDataSources[currentDataSource]
  // Get most recent and earliest data
  const mostRecentData = dataArray[dataArray.length - 1]
  const earliestData = dataArray[0]
  // Output formatted data
  return {
    dailyData,
    title: `${title} (${subtitle || period})`,
    shortTitle: title,
    subtitle,
    period,
    cumulative: dataType === 'cumulative',
    source: currentDataSource,
    platform: currentPlatform,
    dataType,
    currency,
    mostRecent: {
      date: mostRecentData[0],
      value: mostRecentData[1],
    },
    earliest: {
      date: earliestData[0],
      value: earliestData[1],
    },
    today: dailyData[dates.today],
    yesterday: dailyData[dates.yesterday],
    twoDaysBefore: dailyData[dates.twoDaysBefore],
    sevenDaysBefore: dailyData[dates.sevenDaysBefore],
    oneMonthBefore: dailyData[dates.oneMonthBefore],
    startOfYear: dailyData[dates.startOfYear],
    projection,
  }
}

export const adMetricTypes = [
  {
    name: 'engagement',
    key: 'unaware',
    valueKey: 'engaged',
    color: brandColors.gradient[1].dark,
  },
  {
    name: 'nurture',
    key: 'on_platform',
    valueKey: 'reach',
    color: brandColors.gradient[7].dark,
  },
  {
    name: 'growth',
    key: 'conversions',
    valueKey: ['sales_value', 'events_count'],
    color: brandColors.gradient[11].dark,
  },
]
export const instagramDataSources = {
  all: 'instagram_follower_count',
  gender: 'instagram_audience_gender_age',
  country: 'instagram_audience_country',
  city: 'instagram_audience_city',
}

export const followerGrowthDataSources = {
  facebook: 'facebook_likes',
  instagram: instagramDataSources.all,
  soundcloud: 'soundcloud_follower_count',
  spotify: 'spotify_follower_count',
  youtube: 'youtube_subscriber_count',
}

export const dataSourceOptions = [
  {
    name: 'All',
    value: instagramDataSources.all,
  },
  {
    name: 'Gender and age',
    value: instagramDataSources.gender,
  },
  {
    name: 'Country',
    value: instagramDataSources.country,
  },
  {
    name: 'City',
    value: instagramDataSources.city,
  },
]

const formatResultsData = (data) => {
  const formattedData = Object.entries(data).reduce((newObject, [key, value]) => {
    const { asset, ...stats } = value
    const metricType = adMetricTypes.find((type) => type.key === key)

    newObject[key] = stats

    if (value?.asset && (key !== 'spend')) {
      newObject.posts.push({
        ...value.asset,
        ...metricType,
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

  if (! adsReachPrevValue && adsReachCurrValue) {
    currPeriod = adsReachCurrValue
    copy = resultsCopy.existingAudienceFallback(adsReachCurrValue)
  }

  if (! currPeriod) return null

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

    if (engaged.curr_period >= 250 && ! engaged.prev_period) {
      currPeriod = engaged.curr_period
      copy = resultsCopy.newAudienceUnawareFallbackEngaged(engaged.curr_period)
    }

    if (engaged.curr_period < 250 && ! reach.prev_period) {
      currPeriod = reach.curr_period
      copy = resultsCopy.newAudienceUnawareFallbackReach(reach.curr_period)
    }
  }

  if (! currPeriod) return null

  return makeStatsObject({ chartType, prevPeriod, currPeriod, copy })
}

export const getOptimisationsEvents = (data) => {
  return Object.entries(data).reduce((array, [key, value]) => {
    if (! value?.curr_period?.count) return array
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

  if (! omni_purchase.prev_period.value && omni_purchase.curr_period.value) {
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

  if (! landing_page_views.prev_period && landing_page_views.curr_period) {
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

  if (! unique_outbound_clicks.prev_period && unique_outbound_clicks.curr_period) {
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

  if (reach.curr_period && ! reach.prev_period) {
    currPeriod = reach.curr_period
    copy = resultsCopy.conversionFallbackReach(currPeriod, facebookPixelEvent)
    return makeStatsObject({ chartType, currPeriod, copy })
  }

  return null
}

const getQuartile = (percentile, audience) => {
  if (percentile <= 25) {
    return {
      value: 1,
      position: 'left',
      ...(audience && { copy: audience === 'growth' ? 'Slow' : 'Low' }),
    }
  }
  if (percentile > 25 && percentile <= 50) {
    return {
      value: 2,
      position: 'center',
      ...(audience && { copy: 'Average' }),
    }
  }
  if (percentile > 50 && percentile <= 75) {
    return {
      value: 3,
      position: 'center',
      ...(audience && { copy: audience === 'growth' ? 'Solid' : 'Good' }),
    }
  }
  if (percentile > 75) {
    return {
      value: 4,
      position: 'right',
      ...(audience && { copy: audience === 'growth' ? 'Fast' : 'High' }),
    }
  }
}

export const getPlatformData = (adData, aggregatedAdData, platform) => {
  if (platform !== 'instagram' && platform !== 'spotify') {
    return null
  }

  const platformGrowthKey = `${platform}_growth`

  if (! adData[platformGrowthKey]) {
    return null
  }

  const {
    '30d': {
      paid,
    },
    '180d': {
      organic,
    },
  } = adData[platformGrowthKey]

  const {
    '180d': {
      organic: aggregatedOrganic,
    },
  } = aggregatedAdData[platformGrowthKey]

  const paidGrowthRate = paid.rate.value
  const shouldUseAggregateGrowthRate = organic.number_of_days.value < 7
  const organicGrowthRate = shouldUseAggregateGrowthRate ? aggregatedOrganic.rate.value : organic.rate.value
  const totalGrowthAbsolute = paid.absolute.value
  const growthIncrease = paidGrowthRate / organicGrowthRate

  const paidGrowthEstimate = Math.round(totalGrowthAbsolute * ((paidGrowthRate - organicGrowthRate) / paidGrowthRate))
  const organicGrowthEstimate = totalGrowthAbsolute - paidGrowthEstimate
  const paidGrowthPercentile = (paid.rate.percentile * 100).toFixed(1)

  const spendingDaysCount = paid.number_of_days.value
  const estimatedMonthlyGrowthAbsolute = Math.round(totalGrowthAbsolute / (spendingDaysCount / 30))

  const copyData = {
    platform: getPlatformNameByValue(platform),
    paidGrowthRate: paidGrowthRate * 100,
    organicGrowthRate: organicGrowthRate * 100,
    shouldUseAggregateGrowthRate,
    growthIncrease,
    totalGrowthAbsolute,
    estimatedMonthlyGrowthAbsolute,
    spendingDaysCount,
  }

  if (paidGrowthRate >= organicGrowthRate && paidGrowthEstimate > 0 && paidGrowthRate > 0) {
    return makeStatsObject({
      prevPeriod: organicGrowthEstimate,
      currPeriod: totalGrowthAbsolute,
      copy: resultsCopy.platformGrowth(copyData),
      chartType: 'main',
    })
  }

  return {
    chartType: 'fallback',
    chartData: {
      currValue: totalGrowthAbsolute,
      percentile: paidGrowthPercentile,
      quartile: getQuartile(paidGrowthPercentile),
    },
    copy: resultsCopy.platformGrowthFallback(copyData),
  }
}

export const getStatsData = (adData, aggregatedAdData, platform) => {
  return {
    newAudienceData: getNewAudienceData(adData),
    existingAudienceData: getExistingAudienceData(adData),
    conversionData: getConversionData(adData),
    platformData: getPlatformData(adData, aggregatedAdData, platform),
  }
}

export const getDataSources = async (dataSources, artistId) => {
  const data = await getDataSourceValue(dataSources, artistId)

  const formattedData = Object.entries(data).reduce((result, [key, dataSource]) => {
    return {
      ...result,
      [key]: formatServerData({
        currentDataSource: dataSource.name,
        currentPlatform: dataSource.platform,
        dailyData: dataSource.daily_data,
      }),
    }
  }, {})

  return formattedData
}

export const formatDataSources = (dataSources, dataSourceName) => {
  const sortedDataSources = Object.values(dataSources).sort((a, b) => Object.keys(a.dailyData).length - Object.keys(b.dailyData).length)
  const intersectingKeys = Object.keys(sortedDataSources[0].dailyData).filter((key) => Object.keys(sortedDataSources[1].dailyData).includes(key))

  const filterDataSource = ({ dailyData }) => {
    return Object.keys(dailyData)
      .filter((key) => intersectingKeys.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: dailyData[key],
        }
      }, {})
  }

  return {
    adSpend: filterDataSource(dataSources.facebook_ad_spend_feed),
    followerGrowth: filterDataSource(dataSources[dataSourceName]),
  }
}

const sliceDataSource = (dataSource, start, end) => {
  return Object.fromEntries(Object.entries(dataSource).slice(start, end))
}

export const getSpendingPeriodIndexes = (adSpend, minConsecutiveDays) => {
  const array = Object.values(adSpend)
  const indexes = []
  let end

  for (let index = array.length; index >= 0; index -= 1) {
    if (! end && (array.slice(index - minConsecutiveDays, index).every((spend) => Boolean(spend)))) {
      end = index
    }

    if (end && ! array[index - 1]) {
      indexes.push([index, end])
      end = null
    }
  }

  return indexes
}

export const sumAddedFollowers = (followerGrowth, spendingPeriodIndexes) => {
  const array = Object.values(followerGrowth)

  const result = spendingPeriodIndexes.reduce((total, [start, end]) => {
    return (array[end === array.length ? end - 1 : end] - array[start]) + total
  }, 0)

  return result
}

const getLatestCampaign = (initialDataSources) => {
  const [start, end] = getSpendingPeriodIndexes(initialDataSources.adSpend, 2)[0]

  return Object.entries(initialDataSources).reduce((result, [key, dataSource]) => ({
    ...result,
    [key]: sliceDataSource(dataSource, start, end + 1),
  }), {})
}

const getLastThirtyDays = (initialDataSources) => {
  const getLastThirtyDaysIndexes = (dataSource) => {
    const keys = Object.keys(dataSource)
    const mostRecentDate = keys[keys.length]
    const thirtyDaysFromMostRecentDate = moment(mostRecentDate).subtract(30, 'days').format('YYYY-MM-DD')
    const thirtyDaysFromMostRecentDateIndex = keys.findIndex((dateKey) => dateKey === thirtyDaysFromMostRecentDate)

    return [thirtyDaysFromMostRecentDateIndex, keys.length + 1]
  }

  const [start, end] = getLastThirtyDaysIndexes(initialDataSources.adSpend)

  return Object.entries(initialDataSources).reduce((result, [key, dataSource]) => ({
    ...result,
    [key]: sliceDataSource(dataSource, start, end),
  }), {})
}

export const getSlicedDataSources = (period, initialDataSources) => {
  if (period === 'all') {
    return initialDataSources
  }

  if (period === 'campaign') {
    return getLatestCampaign(initialDataSources)
  }

  return getLastThirtyDays(initialDataSources)
}

export const formatBreakdownOptionValues = (key, dataSourceName) => {
  if (dataSourceName === instagramDataSources.gender) {
    return capitalise(key.replaceAll('_', ' '))
  }

  if (dataSourceName === instagramDataSources.country) {
    return countries.find((country) => country.id === key)?.name
  }

  return key
}

export const calculateMinAndMaxGrowthProjection = (initialDataSources, artist) => {
  const campaign = getLatestCampaign(initialDataSources)
  const campaignDateKeys = Object.keys(campaign.followerGrowth)
  const allDateKeys = Object.keys(initialDataSources.followerGrowth)

  // Before campaign start
  const campaignStartDate = campaignDateKeys[0]
  const followerCountAtCampaignStart = campaign.followerGrowth[campaignStartDate]
  const followerCountOneWeekBeforeCampaignStart = initialDataSources.followerGrowth[moment(campaignStartDate).subtract(7, 'days').format('YYYY-MM-DD')]
  const followerCountOneMonthBeforeCampaignStart = initialDataSources.followerGrowth[moment(campaignStartDate).subtract(30, 'days').format('YYYY-MM-DD')]

  const oneHundredEightyDaysAgo = moment().subtract(180, 'days')
  const artistCreatedAt = moment(artist.created_at)
  const dateLastCampaignEnded = moment(campaignDateKeys[campaignDateKeys.length - 1])
  const calculationStartDate = moment.max([oneHundredEightyDaysAgo, artistCreatedAt, dateLastCampaignEnded]).format('YYYY-MM-DD')

  const followerCountAtCalculationStartDate = initialDataSources.followerGrowth[calculationStartDate]
  const numberOfDaysInPeriodBeforeCampaignStart = moment(calculationStartDate).diff(moment(campaignStartDate), 'days')

  const dailyGrowthRateSevenDaysBeforeCampaignStart = (1 + ((followerCountAtCampaignStart - followerCountOneWeekBeforeCampaignStart) / followerCountOneWeekBeforeCampaignStart)) ** (1 / 7)
  const dailyGrowthRateThirtyDaysBeforeCampaignStart = (1 + ((followerCountAtCampaignStart - followerCountOneMonthBeforeCampaignStart) / followerCountOneMonthBeforeCampaignStart)) ** (1 / 30)
  const dailyGrowthRateMaxBeforeCampaignStart = (1 + ((followerCountAtCampaignStart - followerCountAtCalculationStartDate) / followerCountAtCalculationStartDate)) ** (1 / numberOfDaysInPeriodBeforeCampaignStart)

  // After campaign end
  const campaignEndDate = campaignDateKeys[campaignDateKeys.length - 1]
  const followerCountAtCampaignEnd = campaign.followerGrowth[campaignEndDate]
  const followerCount1WeekAfterCampaignEnd = initialDataSources.followerGrowth[moment(campaignStartDate).add(7, 'days').format('YYYY-MM-DD')]
  const followerCount1MonthAfterCampaignEnd = initialDataSources.followerGrowth[moment(campaignStartDate).add(30, 'days').format('YYYY-MM-DD')]

  const oneHundredEightyDaysAfterCampaignEnd = moment(campaignEndDate).add(180, 'days')
  // TODO: fill in these two values
  const dateOfMostRecentData = moment()
  const dateNextCampaignStarted = moment()
  const calculationEndDate = moment.min([oneHundredEightyDaysAfterCampaignEnd, dateOfMostRecentData, dateNextCampaignStarted]).format('YYYY-MM-DD')

  const followerCountAtCalculationEndDate = initialDataSources.followerGrowth[calculationEndDate]
  const numberOfDaysInPeriodAfterCampaignEnd = moment(calculationEndDate).diff(moment(campaignEndDate), 'days')

  const dailyGrowthRateSevenDaysAfterCampaignEnd = (1 + ((followerCount1WeekAfterCampaignEnd - followerCountAtCampaignEnd) / followerCountAtCampaignEnd)) ** (1 / 7)
  const dailyGrowthRateThirtyDaysAfterCampaignEnd = (1 + ((followerCount1MonthAfterCampaignEnd - followerCountAtCampaignEnd) / followerCountAtCampaignEnd)) ** (1 / 30)
  const dailyGrowthRateMaxAfterCampaignEnd = (1 + ((followerCountAtCalculationEndDate - followerCountAtCampaignEnd) / followerCountAtCampaignEnd)) ** (1 / numberOfDaysInPeriodAfterCampaignEnd)

  const dailyGrowthRates = [
    dailyGrowthRateSevenDaysBeforeCampaignStart,
    dailyGrowthRateThirtyDaysBeforeCampaignStart,
    dailyGrowthRateMaxBeforeCampaignStart,
    dailyGrowthRateSevenDaysAfterCampaignEnd,
    dailyGrowthRateThirtyDaysAfterCampaignEnd,
    dailyGrowthRateMaxAfterCampaignEnd,
  ].filter(Boolean)

  const lowestDailyGrowthRate = Math.min(...dailyGrowthRates)
  const highestDailyGrowthRate = Math.max(...dailyGrowthRates)

  const [minProjection, maxProjection] = [lowestDailyGrowthRate, highestDailyGrowthRate].map((dailyGrowthRate) => {
    return Object.entries(campaign.followerGrowth).reduce((result, [key]) => {
      const calculationStartDate = moment.max([moment(campaignStartDate), moment(allDateKeys[0])]).format('YYYY-MM-DD')
      const daysSinceCalculationStartDate = moment(key).diff(moment(calculationStartDate), 'days')
      const followerCountAtCalculationStartDate = initialDataSources.followerGrowth[calculationStartDate]

      return {
        ...result,
        [key]: (followerCountAtCalculationStartDate * (1 + dailyGrowthRate) ** daysSinceCalculationStartDate),
      }
    }, {})
  })

  return {
    minProjection,
    maxProjection,
  }
}

// GET AD BENCHMARK
/**
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getAdBenchmark = async (artistId) => {
  const endpoint = `/artists/${artistId}/ad_benchmark`
  const payload = {}
  const errorTracking = {
    category: 'Results',
    action: 'Get ad benchmark',
  }
  const { res, error } = await api.requestWithCatch('get', endpoint, payload, errorTracking)

  if (error) return { error }

  const formattedData = res.data ? formatResultsData(res.data) : null
  if (formattedData) {
    formattedData.dateRange = {
      from: res.date_from,
      to: res.date_to,
    }
  }
  return { res: formattedData }
}

// GET AGGREGATED AD BENCHMARK
/**
 * @returns {Promise<any>}
 */
export const getAggregatedAdBenchmark = async () => {
  const endpoint = '/ad_benchmarks/aggregated'
  const payload = {}
  const errorTracking = {
    category: 'Results',
    action: 'Get aggregated ad benchmark',
  }
  const { res, error } = await api.requestWithCatch('get', endpoint, payload, errorTracking)

  return { res: res.data, error }
}
