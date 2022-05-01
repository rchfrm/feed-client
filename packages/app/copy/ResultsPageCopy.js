import * as ROUTES from '@/app/constants/routes'
import { capitalise, formatNumber, getNestedObjectByValue } from '@/helpers/utils'

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

export default {
  newAudienceOnPlatformMainDescription: (relativeValue) => `The total number that have engaged with your posts has grown **${relativeValue}%**.`,
  newAudienceUnawareFallbackEngaged: (currValue, prevValue) => `**${formatNumber(currValue)} engaged** with your posts${prevValue ? versusLastMonth(formatNumber(prevValue)) : ''}.`,
  newAudienceUnawareFallbackReach: (currValue, prevValue) => `**${formatNumber(currValue)} saw your posts**${prevValue ? versusLastMonth(formatNumber(prevValue)) : ''}.`,
  existingAudienceMainDescription: (adsValue, organicValue) => `Feed reached **${adsValue}%** of your audience, versus your
  organic posts which reached **${organicValue}%** on average.`,
  existingAudienceFallback: (currValue, prevValue) => `Feed has reached **${formatNumber(currValue)}** within your existing audience${prevValue ? versusLastMonth(formatNumber(prevValue)) : ''}.`,
  conversionMainDescription: (roas) => {
    const { name } = optimisationsEventsDictionary.omni_purchase
    return {
      title: name,
      description: `Feed’s conversion ads generated **${roas}x** more in sales than was spent.`,
    }
  },
  conversionFallbackSales: (currValue, prevValue) => {
    const { name } = optimisationsEventsDictionary.omni_purchase
    return {
      title: name,
      description: `Feed’s conversion ads generated **${currValue}** in sales${prevValue ? versusLastMonth(prevValue) : ''}.`,
    }
  },
  conversionFallbackOptimisationEvents: (eventCount, optimisationsEvent, prevValue) => {
    const { name, event } = optimisationsEventsDictionary[optimisationsEvent]
    return {
      title: name,
      description: `Feed’s conversion ads generated **${eventCount} ${eventCount === 1 ? event : `${event}s`}**${prevValue ? versusLastMonth(prevValue) : ''}.`,
    }
  },
  conversionFallbackLandingPageViews: (currValue, facebookPixelEvent, prevValue) => {
    const optimisationsEvent = getNestedObjectByValue(optimisationsEventsDictionary, facebookPixelEvent)
    const { name, detail } = optimisationsEventsDictionary[optimisationsEvent]
    return {
      title: name,
      description: `**${currValue} people** have visited your website as a result of seeing ${detail}${prevValue ? versusLastMonth(prevValue) : ''}.`,
    }
  },
  conversionFallbackOutboundClicks: (currValue, facebookPixelEvent, prevValue) => {
    const optimisationsEvent = getNestedObjectByValue(optimisationsEventsDictionary, facebookPixelEvent)
    const { name, detail } = optimisationsEventsDictionary[optimisationsEvent]
    return {
      title: name,
      description: `**${currValue} people** clicked through to your website as a result of seeing ${detail}${prevValue ? versusLastMonth(prevValue) : ''}.`,
    }
  },
  conversionFallbackReach: (currValue, facebookPixelEvent, prevValue) => {
    const optimisationsEvent = getNestedObjectByValue(optimisationsEventsDictionary, facebookPixelEvent)
    const { name, detail } = optimisationsEventsDictionary[optimisationsEvent]
    return {
      title: name,
      description: `**${currValue} people** saw ${detail}${prevValue ? versusLastMonth(prevValue) : ''}.`,
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
    if (organicGrowthRate > 0) {
      return `Your ${platform} following is growing **${formatNumber(paidGrowthRate)}%** a month, that's **${growthIncrease.toFixed(1)}x** faster than ${shouldUseAggregateGrowthRate ? 'average' : 'your'} organic growth of **${formatNumber(organicGrowthRate)}%**.`
    }

    if (organicGrowthRate === 0) {
      if (spendingDaysCount === 30) {
        return `Your ${platform} following is growing **${formatNumber(paidGrowthRate)}%** a month, this compares to no growth without spending.`
      }

      if (spendingDaysCount < 30) {
        return `Your ${platform} is now projected to grow **${formatNumber(paidGrowthRate)}%** a month, this compares to no growth without spending.`
      }
    }

    if (organicGrowthRate < 0) {
      if (spendingDaysCount === 30) {
        return `Your ${platform} following is growing **${formatNumber(paidGrowthRate)}%** a month, without spending it was actually shrinking **${formatNumber(organicGrowthRate)}%**.`
      }

      if (spendingDaysCount < 30) {
        return `Your ${platform} is now projected to grow **${formatNumber(paidGrowthRate)}%** a month, without spending it was actually shrinking **${formatNumber(organicGrowthRate)}%**.`
      }
    }
  },
  platformGrowthFallback: ({
    platform,
    paidGrowthRate,
    totalGrowthAbsolute,
    spendingDaysCount,
  }) => {
    if (spendingDaysCount === 30) {
      return `Your ${platform} following is growing **${formatNumber(paidGrowthRate)}%** a month, that's **${formatNumber(totalGrowthAbsolute)}** new followers.`
    }
    if (spendingDaysCount < 30) {
      return `Your ${platform} is set to ${formatNumber(paidGrowthRate) >= 0 ? 'grow' : 'shrink'} 1.65% a month, that means **~${formatNumber(totalGrowthAbsolute)}** new followers.`
    }
    if (paidGrowthRate === 0) {
      return `Your ${platform} is set to stay the same from month to month.`
    }
  },
  platformGrowthTooltip: 'This is estimated based on your historical organic growth, and the organic growth of other similar profiles. We compare this data with how much you grow whilst using Feed to calculate the uplift.',
  postDescription: (type, value, isPurchase) => {
    if (type === 'engagement') {
      return `This post was the most effective at growing your Instagram audience, engaging **${value}** new people.`
    }
    if (type === 'nurture') {
      return `This post was the most effective at growing your Instagram audience, with **${value}** people reached.`
    }
    return isPurchase ? (
      `This post was the most effective at generating sales with a total value of **${value}**.`
    ) : (
      `This post was the most effective at triggering your pixel events, with ${value} events fired.`
    )
  },
  statsNoData: 'Feed is setting up your ads',
  postsStatsNoData: (isSpendingPaused) => {
    if (isSpendingPaused) {
      return `Your spending is currently paused. [Resume](${ROUTES.CONTROLS_BUDGET}) in order to see your most effective posts here.`
    }

    return "Your most effective post isn't available yet, once you've been using Feed for a bit longer it will appear here."
  },
  conversionsActivatorTitle: 'Use the “sales” objective to get purchases on your website.',
  conversionsActivatorDescription: 'Use the "sales" objective to see results in this section!',
  noResultsData: (isSpendingPaused) => {
    if (isSpendingPaused) {
      return `There is currently no results data available. Set a budget and start promoting your posts [here](${ROUTES.CONTROLS_BUDGET})!`
    }
    return 'Your results will appear here soon (within 24 hours of starting ads).'
  },
  noSpendReachDescription: (value, hasNoProfiles, isMobile) => {
    if (hasNoProfiles) {
      return `On average, a post on Facebook or Instagram will reach **${value.toFixed(1)}%** of the total audience.`
    }

    if (isMobile) {
      return 'The percentage of your audience reached by a typical post.'
    }

    return `Your posts reach **${value.toFixed(1)}%** of your addressable audience.`
  },
  noSpendEngageDescription: (value, hasNoProfiles) => {
    if (hasNoProfiles) {
      return `**${value.toFixed(1)}%** of followers engage with the average post.`
    }

    return `**${value.toFixed(1)}%** of your followers engage with each post on average.`
  },
  noSpendGrowthDescription: (value, platform, rate, hasNoProfiles) => {
    const numberRate = Number(rate)
    if (hasNoProfiles) {
      if (numberRate < 0) {
        return 'Did you know the average Instagram profile is actually shrinking?'
      }

      if (numberRate === 0) {
        return "Did you know the average Instagram profile actually doesn't grow?"
      }

      return `The average Instagram grows **${rate}%** a month. With 5,000 followers, that's an extra **${value}**.`
    }

    if (value === 0) {
      return `Your ${capitalise(platform)} following is steady.`
    }

    const rateString = `_(${rate >= 0 ? '+' : ''}${rate}%)_`
    const changeDescription = value > 0 ? 'adding' : 'losing'

    return `You're ${changeDescription} **${value}** ${capitalise(platform)} followers a month on average ${rateString}.`
  },
  noSpendTotalFollowersDescription: "We don't have enough historical information yet, so check back later to see growth insights.",
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
  postsChartTitle: (metricType, hasNoProfiles) => {
    if (hasNoProfiles) {
      return 'Recent post performance'
    }

    if (metricType === 'reach') {
      return 'Reach of your recent posts'
    }

    return 'Engagement rate of your recent posts'
  },
  postsChartDescription: (metricType, hasNoProfiles) => {
    if (hasNoProfiles) {
      return 'Connect your Facebook and Instagram pages, to see how your recent posts compare to each other, and how you compare to other similar profiles.'
    }

    if (metricType === 'reach') {
      return "See the estimated percentage of your audience your posts have reached in the last 30 days. Your audience isn't just followers, it’s also people who have engaged with you before but haven’t followed you yet."
    }

    return 'See the percentage of your followers that engaged with your posts from the last 30 days.'
  },
  postsChartNoData: 'No posts found within the last 30 days.',
  growthChartDescription: 'See how your Facebook Likes and Instagram Followers are growing over time.',
  growthChartNoData: 'There is currently no follower growth data available.',
  headerMenuText: (resultsType, isLast30Days, dateFrom, dateTo) => {
    const resultsTypeString = `**<span className="green--underline">${capitalise(resultsType)}</span>** insights`

    if (!isLast30Days && (!dateFrom || !dateTo)) {
      return resultsTypeString
    }

    if (isLast30Days) {
      return `${resultsTypeString}, **last 30 days...**`
    }

    return `${resultsTypeString} from **${dateFrom}** to **${dateTo}**`
  },
  connectAccounts: `[Connect your accounts](${ROUTES.CONNECT_ACCOUNTS}) to see how you compare!`,
}
