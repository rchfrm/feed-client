import * as ROUTES from '@/app/constants/routes'
import { formatNumber, getNestedObjectByValue } from '@/helpers/utils'

const optimisationsEventsDictionary = {
  omni_purchase: {
    name: 'Sales',
    fbEventName: 'Purchase',
    event: 'sales',
    detail: 'a sales ad',
  },
  lead: {
    name: 'Leads',
    fbEventName: 'Lead',
    event: 'leads',
    detail: 'a lead generation ad',
  },
  omni_complete_registration: {
    name: 'Registrations',
    fbEventName: 'CompleteRegistration',
    event: 'registrations',
    detail: 'an ad about registering',
  },
  contact_total: {
    name: 'Contacts',
    fbEventName: 'Contact',
    event: 'new contacts',
    detail: 'an ad about getting in contact',
  },
  subscribe_total: {
    name: 'Subscribers',
    fbEventName: 'Subscribe',
    event: 'subscribers',
    detail: 'an ad about subscribing',
  },
}

export default {
  newAudienceOnPlatformMainDescription: (relativeValue) => `The total number that have engaged with your posts has grown **${relativeValue}%**.`,
  newAudienceUnawareFallbackEngagedDouble: (currValue, prevValue) => `**${formatNumber(currValue)} engaged** with your posts, versus ${formatNumber(prevValue)} last month.`,
  newAudienceUnawareFallbackReachDouble: (currValue, prevValue) => `**${formatNumber(currValue)} saw your posts**, versus ${formatNumber(prevValue)} last month.`,
  newAudienceUnawareFallbackEngagedSingle: (currValue) => `**${formatNumber(currValue)} engaged** with your posts.`,
  newAudienceUnawareFallbackReachSingle: (currValue) => `**${formatNumber(currValue)} saw your posts.**`,
  existingAudienceMainDescription: (adsValue, organicValue) => `Feed reached **${adsValue}%** of your audience, versus your
  organic posts which reached **${organicValue}%** on average.`,
  existingAudienceFallbackSingle: (currValue) => `Feed has reached **${formatNumber(currValue)}** within your existing audience.`,
  existingAudienceFallbackDouble: (prevValue, currValue) => `Feed has reached **${formatNumber(currValue)}** within your existing audience, versus **${formatNumber(prevValue)}** last month.`,
  conversionMainDescription: (roas) => {
    const { name } = optimisationsEventsDictionary.omni_purchase
    return {
      title: name,
      description: `Feed’s conversion ads generated **${roas}x** more in sales than was spent.`,
    }
  },
  conversionFallbackSalesSingle: (currValue) => {
    const { name } = optimisationsEventsDictionary.omni_purchase
    return {
      title: name,
      description: `Feed’s conversion ads generated **${currValue}** in sales.`,
    }
  },
  conversionFallbackSalesDouble: (prevValue, currValue) => {
    const { name } = optimisationsEventsDictionary.omni_purchase
    return {
      title: name,
      description: `Feed’s conversion ads generated **${currValue}** in sales versus ${prevValue} last month.`,
    }
  },
  conversionFallbackOptimisationEvents: (eventCount, optimisationsEvent) => {
    const { name, event } = optimisationsEventsDictionary[optimisationsEvent]
    return {
      title: name,
      description: `Feed’s conversion ads generated **${eventCount} ${event}**.`,
    }
  },
  conversionFallbackLandingPageViews: (currValue, facebookPixelEvent) => {
    const optimisationsEvent = getNestedObjectByValue(optimisationsEventsDictionary, facebookPixelEvent)
    const { name, detail } = optimisationsEventsDictionary[optimisationsEvent]
    return {
      title: name,
      description: `**${currValue} people** have visited your website as a result of seeing ${detail}.`,
    }
  },
  conversionFallbackOutboundClicks: (currValue, facebookPixelEvent) => {
    const optimisationsEvent = getNestedObjectByValue(optimisationsEventsDictionary, facebookPixelEvent)
    const { name, detail } = optimisationsEventsDictionary[optimisationsEvent]
    return {
      title: name,
      description: `**${currValue} people** clicked through to your website as a result of seeing ${detail}.`,
    }
  },
  conversionFallbackReach: (currValue, facebookPixelEvent) => {
    const optimisationsEvent = getNestedObjectByValue(optimisationsEventsDictionary, facebookPixelEvent)
    const { name, detail } = optimisationsEventsDictionary[optimisationsEvent]
    return {
      title: name,
      description: `**${currValue} people** saw ${detail}.`,
    }
  },
  postDescription: (type) => {
    if (type === 'engage') {
      return `The post that engaged the
      most new people:`
    }
    if (type === 'reach') {
      return `The post that reached the most people
      from your existing audience:`
    }
    return `The post that generated the
    most sales:`
  },
  postLabelText: (type) => {
    if (type === 'engage') {
      return 'engaged'
    }
    if (type === 'reach') {
      return 'reached'
    }
    return 'in sales'
  },
  postDescriptionMobile: (type, value) => {
    if (type === 'engage') {
      return `**${value}** new people engaged`
    }
    if (type === 'reach') {
      return `**${value}** people reached`
    }
    return `**${value}** in sales`
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
  noResultsData: `There is currently no results data available. Set a budget and start promoting your posts [here](${ROUTES.CONTROLS})!`,
}
