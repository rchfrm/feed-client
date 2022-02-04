import * as ROUTES from '@/app/constants/routes'
import { formatNumber, getNestedObjectByValue } from '@/helpers/utils'

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
  postDescription: (type, isPurchase) => {
    if (type === 'unaware') {
      return `The post that engaged the
      most new people:`
    }
    if (type === 'on_platform') {
      return `The post that reached the most people
      from your existing audience:`
    }
    return isPurchase ? (
      `The post that generated the
      most sales:`
    ) : (
      `The post that triggered the
      most pixel events:`
    )
  },
  postLabelText: (type, isPurchase) => {
    if (type === 'unaware') {
      return 'engaged'
    }
    if (type === 'on_platform') {
      return 'reached'
    }
    return isPurchase ? 'in sales' : 'events'
  },
  postDescriptionMobile: (type, value, isPurchase) => {
    if (type === 'unaware') {
      return `**${value}** new people engaged`
    }
    if (type === 'on_platform') {
      return `**${value}** people reached`
    }
    return `**${value}** ${isPurchase ? 'in sales' : 'pixel events triggered'}`
  },
  statsNoData: 'Feed is setting up your ads',
  postsStatsNoData: (isSpendingPaused) => {
    if (isSpendingPaused) {
      return `Your spending is currently paused. [Resume](${ROUTES.CONTROLS}) in order to see your most effective posts here.`
    }

    return `Once you’ve been using Feed for a few weeks,
  your most effective ads, and a month to month
  comparison will appear here.`
  },
  conversionsActivatorTitle: 'Use Feed to generate sales or sign-ups outside Facebook & Instagram.',
  conversionsActivatorDescription: 'Get started with generating sales or sign-ups!',
  conversionsTeaserTitle: 'Request access now',
  conversionsTeaserDescription: `Click to request access to conversion ads!

We’ll be in touch shortly after with more information.`,
  noResultsData: (isSpendingPaused) => {
    if (isSpendingPaused) {
      return `There is currently no results data available. Set a budget and start promoting your posts [here](${ROUTES.CONTROLS})!`
    }
    return 'Your results will appear here soon (within 24 hours of starting ads).'
  },
  noSpendReachDescription: (value, isMobile) => {
    if (isMobile) {
      return 'The percentage of your audience reached by a typical post.'
    }

    return `Your posts reach **${value}%** of your addressable audience.`
  },
  noSpendEngageDescription: (value) => `**${value}%** of your followers engage with each post on average.`,
  noSpendGrowthDescription: (value) => `You're adding **${value}** followers a month on average across Facebook & Instagram.`,
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
      return `One of the best - top **${100 - percentile}%**!`
    }
  },
  recentPostsChartTitle: (metricType) => {
    if (metricType === 'reach') {
      return 'Reach of your recent posts'
    }

    return 'Engagement rate of your recent posts'
  },
  recentPostsChartDescription: (metricType) => {
    if (metricType === 'reach') {
      return "See the estimated percentage of your audience your posts have reached in the last 30 days. Your audience isn't just followers, it’s also people who have engaged with you before but haven’t followed you yet."
    }

    return 'See the percentage of your followers that engaged with your posts from the last 30 days.'
  },
}
