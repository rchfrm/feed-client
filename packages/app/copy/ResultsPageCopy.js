import * as ROUTES from '@/app/constants/routes'
import { formatNumber, getNestedObjectByValue } from '@/helpers/utils'
import moment from 'moment'

const optimisationsEventsDictionary = {
  omni_purchase: {
    name: 'Sales',
    fbEventName: 'Purchase',
    event: 'sale',
    detail: 'a sales ad',
  },
  lead: {
    name: 'Leads',
    fbEventName: 'Lead',
    event: 'lead',
    detail: 'a lead generation ad',
  },
  omni_complete_registration: {
    name: 'Registrations',
    fbEventName: 'CompleteRegistration',
    event: 'registration',
    detail: 'an ad about registering',
  },
  contact_total: {
    name: 'Contacts',
    fbEventName: 'Contact',
    event: 'new contact',
    detail: 'an ad about getting in contact',
  },
  subscribe_total: {
    name: 'Subscribers',
    fbEventName: 'Subscribe',
    event: 'subscriber',
    detail: 'an ad about subscribing',
  },
  omni_view_content: {
    name: 'Content Views',
    fbEventName: 'ViewContent',
    event: 'content view',
    detail: 'an ad about viewing more content',
  },
}

const versusLastMonth = (prevValue) => `, versus ${prevValue} last month`

const getFollowerStringByPlatform = (platform) => {
  if (platform === 'instagram') return 'Instagram followers'
  if (platform === 'facebook') return 'Facebook likes'
  if (platform === 'youtube') return 'Youtube subscribers'
  if (platform === 'spotify') return 'Spotify followers'
  if (platform === 'soundcloud') return 'SoundCloud followers'
}

export default {
  newAudienceOnPlatformMainDescription: (relativeValue) => `The total number that have engaged with your posts has grown **${relativeValue}%**.`,
  newAudienceUnawareFallbackEngaged: (currValue, prevValue) => `**${formatNumber(currValue)} engaged** with your posts${prevValue ? versusLastMonth(formatNumber(prevValue)) : ''}.`,
  newAudienceUnawareFallbackReach: (currValue, prevValue) => `**${formatNumber(currValue)} saw your posts**${prevValue ? versusLastMonth(formatNumber(prevValue)) : ''}.`,
  existingAudienceMainDescription: (adsValue, organicValue) => `Feed reached **${adsValue}%** of your audience, versus your
  organic posts which reached **${organicValue}%** on average.`,
  existingAudienceFallback: (currValue, prevValue) => `Feed has reached **${formatNumber(currValue)}** within your existing audience${prevValue ? versusLastMonth(formatNumber(prevValue)) : ''}.`,
  conversionMainDescription: (roas) => {
    const { name, event } = optimisationsEventsDictionary.omni_purchase
    return {
      title: name,
      description: `Feed’s conversion ads generated **${roas}x** more in sales than was spent.`,
      event,
    }
  },
  conversionFallbackSales: (currValue, prevValue) => {
    const { name, event } = optimisationsEventsDictionary.omni_purchase
    return {
      title: name,
      description: `Feed’s conversion ads generated **${currValue}** in sales${prevValue ? versusLastMonth(prevValue) : ''}.`,
      event,
    }
  },
  conversionFallbackOptimisationEvents: (eventCount, optimisationsEvent, prevValue) => {
    const { name, event } = optimisationsEventsDictionary[optimisationsEvent]
    return {
      title: name,
      description: `Feed’s conversion ads generated **${eventCount} ${eventCount === 1 ? event : `${event}s`}**${prevValue ? versusLastMonth(prevValue) : ''}.`,
      event: eventCount === 1 ? event : `${event}s`,
    }
  },
  conversionFallbackLandingPageViews: (currValue, facebookPixelEvent, prevValue) => {
    const optimisationsEvent = getNestedObjectByValue(optimisationsEventsDictionary, facebookPixelEvent)
    const { name, detail } = optimisationsEventsDictionary[optimisationsEvent]
    return {
      title: name,
      description: `**${currValue} people** have visited your website as a result of seeing ${detail}${prevValue ? versusLastMonth(prevValue) : ''}.`,
      event: currValue === 1 ? 'visit' : 'visits',
    }
  },
  conversionFallbackOutboundClicks: (currValue, facebookPixelEvent, prevValue) => {
    const optimisationsEvent = getNestedObjectByValue(optimisationsEventsDictionary, facebookPixelEvent)
    const { name, detail } = optimisationsEventsDictionary[optimisationsEvent]
    return {
      title: name,
      description: `**${currValue} people** clicked through to your website as a result of seeing ${detail}${prevValue ? versusLastMonth(prevValue) : ''}.`,
      event: currValue === 1 ? 'click' : 'clicks',
    }
  },
  conversionFallbackReach: (currValue, facebookPixelEvent, prevValue) => {
    const optimisationsEvent = getNestedObjectByValue(optimisationsEventsDictionary, facebookPixelEvent)
    const { name, detail } = optimisationsEventsDictionary[optimisationsEvent]
    return {
      title: name,
      description: `**${currValue} people** saw ${detail}${prevValue ? versusLastMonth(prevValue) : ''}.`,
      event: currValue === 1 ? 'view' : 'views',
    }
  },
  platformGrowth: ({
    platform,
    paidGrowthRate,
    organicGrowthRate,
    shouldUseAggregateGrowthRate,
    growthIncrease,
    spendingDaysCount,
  }) => {
    const growString = spendingDaysCount < 30 ? 'set to grow' : 'growing'
    if (organicGrowthRate > 0) {
      return `Your ${platform} following is ${growString} **${formatNumber(paidGrowthRate)}%** a month. **${growthIncrease.toFixed(1)}x** faster than ${shouldUseAggregateGrowthRate ? 'average' : 'your'} organic growth of ${formatNumber(organicGrowthRate)}%.`
    }

    if (organicGrowthRate === 0) {
      return `Your ${platform} following is ${growString} **${formatNumber(paidGrowthRate)}%** a month, this compares to no growth without spending.`
    }

    if (organicGrowthRate < 0) {
      return `Your ${platform} following is ${growString} **${formatNumber(paidGrowthRate)}%** a month, without spending it was shrinking **${formatNumber(organicGrowthRate)}%**.`
    }
  },
  platformGrowthFallback: ({
    platform,
    paidGrowthRate,
    totalGrowthAbsolute,
    estimatedMonthlyGrowthAbsolute,
    spendingDaysCount,
  }) => {
    if (paidGrowthRate === 0) {
      return `Your ${platform} following is set to stay the same from month to month.`
    }
    if (spendingDaysCount === 30) {
      return `Your ${platform} following is growing **${formatNumber(paidGrowthRate)}%** a month, that's **${formatNumber(totalGrowthAbsolute)}** new followers.`
    }
    if (spendingDaysCount < 30) {
      return `Your ${platform} is set to ${paidGrowthRate >= 0 ? 'grow' : 'shrink'} **${formatNumber(paidGrowthRate)}%** (${estimatedMonthlyGrowthAbsolute}) a month. After ${spendingDaysCount} days, you've gained ${totalGrowthAbsolute}. `
    }
  },
  platformGrowthTooltip: 'This is estimated based on your historical organic growth, and the organic growth of other similar profiles. We compare this data with how much you grow whilst using Feed to calculate the uplift.',
  statsNoData: 'Feed is setting up your ads',
  noResultsData: (isSpendingPaused, hasSetUpProfile) => {
    if (! hasSetUpProfile) {
      return `There is currently no results data available. Complete setting up your account [here](${ROUTES.GET_STARTED}).`
    }

    if (isSpendingPaused) {
      return `There is currently no results data available. Set a budget and start promoting your posts [here](${ROUTES.CONTROLS_BUDGET})!`
    }

    return 'Your results will appear here soon (within 24 hours of starting ads).'
  },
  quartileDescription: (quartile, percentile) => {
    if (quartile === 1) {
      return `Room to improve, but better than **${percentile}%** of others`
    }

    if (quartile === 2) {
      return `Better than **${percentile}%** of others - about average`
    }

    if (quartile === 3) {
      return `Better than most - **${percentile}%** to be precise!`
    }

    if (quartile === 4) {
      return `One of the best - top **${(100 - percentile).toFixed(1)}%**!`
    }
  },
  connectAccounts: `[Connect your accounts](${ROUTES.CONNECT_ACCOUNTS}) to see how you compare!`,
  followerGrowthHeaderTitle: (totalFollowersAddedInPeriod, platform, shouldShowCostPerFollower) => `${totalFollowersAddedInPeriod < 0 ? `${getFollowerStringByPlatform(platform)} lost` : `extra ${getFollowerStringByPlatform(platform)} added`}${shouldShowCostPerFollower ? ', at an estimated' : '.'}`,
  followerGrowthHeaderSubtitle: ({ period, startDate, endDate }) => {
    return `Based on Feed campaign${period !== 'campaign' ? 's' : ''} between **${moment(startDate).format('D MMMM')}** and **${moment(endDate).format('D MMMM YYYY')}**`
  },
  noCampaigns: 'There were **no active** Feed campaigns during this period.',
}
