/* eslint-disable quotes */
import { platforms, getPlatform } from '@/app/helpers/artistHelpers'
import { formatCurrency } from '@/helpers/utils'
import { pricingNumbers } from '@/constants/pricing'

export default {
  // CONTROLS OPTIONS
  controlsOptions: [
    {
      name: 'objective',
      title: 'Objective',
      hasDescription: true,
    },
    {
      name: 'budget',
      title: 'Budget',
      hasDescription: true,
    },
    {
      name: 'ads',
      title: 'Promotion Settings',
      hasDescription: true,
    },
    {
      name: 'targeting',
      title: 'Targeting',
      hasDefaultSidePanelButton: false,
      hasDescription: true,
    },
    {
      name: 'links',
      title: 'Links',
      hasDescription: true,
    },
    {
      name: 'integrations',
      title: 'Integrations',
      hasDescription: true,
    },
  ],
  optionsDescription: (name, hasSetUpProfile, objectiveString, isSpendingPaused, budget) => {
    if (name === 'objective') {
      if (hasSetUpProfile) {
        return `Feed is set-up for ${objectiveString}`
      }
      return 'Continue set-up to choose your objective'
    }
    if (name === 'budget') {
      if (hasSetUpProfile) {
        return `Promotion is ${isSpendingPaused ? 'paused' : `active and set to ${budget} a day`}`
      }
      return 'Continue set-up to set your budget'
    }
    if (name === 'ads') {
      if (hasSetUpProfile) {
        return 'Post selection, calls to action and ad settings'
      }
      return 'Continue set-up to manage post selection, calls to action and more'
    }
    if (name === 'targeting') {
      if (hasSetUpProfile) {
        return 'Control who sees your ads'
      }
      return 'Continue set-up to choose age, gender and location targeting'
    }
    if (name === 'links') return 'Add and edit the links that are used in your ads'
    if (name === 'integrations') return 'Connect Feed to other platforms'
  },
  // AD DEFAULTS
  globalToggleIntro: `Can Feed automatically select which recent posts (last 28 days) are promoted? You can still opt out specific posts from the posts page.

  If you choose “No”, you'll need to manually select posts for Feed to test.`,
  defaultLinkIntro: `By default, which link should be used in ads? This determines where people go when they click one of your ads.`,
  defaultCallToActionIntro: `By default, which call to action should appear on your ads?`,
  defaultCallToActionFooter: (recommendedCallToAction) => `"${recommendedCallToAction}" is recommended based on your objective`,
  facebookAdAccountIntro: 'This is the ad account Feed will use to set-up and run your ad campaigns.',
  facebookAdAccountFooter: "Can't find the ad account you're looking for? Email [help@tryfeed.co](mailto:help@tryfeed.co)",
  facebookPixelIntro: `Your Facebook Pixel can be used to track purchases and other events on your website. Find [instructions on how to install a Pixel here](https://www.facebook.com/business/help/952192354843755?id=1205376682832142).`,
  facebookPixelEventIntro: `Select an event to optimise for. The number in brackets shows how many times each event was triggered in the past 7 days.`,
  facebookPixelEventFooter: `"Purchase" is recommended based on your objective`,
  integrationLinksIntro: `Integrations are what Feed uses to connect with and show you data from other platforms.`,
  budgetFooter: (hasProPlan, budgetData) => {
    const {
      currency,
      hasBudgetBelowMinRecommendedStories,
      projectedMonthlyBudget,
      minRecommendedStoriesString,
    } = budgetData

    const { growth, pro } = pricingNumbers
    const growthPlanMaxMonthlySpend = growth.monthlyCost[currency] * growth.maxSpendMultiple
    const proPlanMaxMonthlySpend = pro.monthlyCost[currency] * pro.maxSpendMultiple

    if (hasBudgetBelowMinRecommendedStories) {
      return `To ensure both posts and stories can be promoted, increase your budget to at least ${minRecommendedStoriesString}`
    }

    if (!hasProPlan) {
      return `The reach cap for Growth is ${formatCurrency(growthPlanMaxMonthlySpend, currency, true)} per month.
Upgrade to <span className="text-insta font-bold">Pro</span> to raise the cap to ${formatCurrency(proPlanMaxMonthlySpend, currency, true)} per month.`
    }

    return `Your projected monthly ad budget is ${formatCurrency(projectedMonthlyBudget, currency)}. The reach cap for the <span className="text-insta font-bold">Pro</span> is ${formatCurrency(proPlanMaxMonthlySpend, currency, true)} per month - ads will stop after reaching this limit.
To increase your reach, [email](mailto:team@tryfeed.co) to arrange a call and discuss options.`
  },
  objectiveIntro: 'This is the outcome Feed is set-up to work towards.',
  alertPlatformTitle: 'Where would you like to grow?',
  alertPlatformDescription: `You can always change this later on. You'll also have the option to send people to multiple platforms using different posts.`,
  alertBudgetTitle: 'Adjust your daily budget',
  alertBudgetDescription: `You can change this at any time. We recommend spreading budget out over a longer period of time as consistency boosts ad performance.`,
  alertLinkTitle: (objective, platform) => {
    if (objective === 'sales') {
      return 'Enter the link to your store'
    }

    if (objective === 'traffic') {
      return 'Enter the link to your website'
    }

    const platformName = platforms.find(({ value }) => value === platform)?.name

    return `Connect to ${platformName}`
  },
  alertLinkDescription: (objective, platform) => {
    if (objective === 'sales') {
      return 'Set the homepage for now, you can choose to send people to specific product pages later on.'
    }

    if (objective === 'traffic') {
      return 'If you have multiple pages, set the homepage for now. You can choose to send people to different pages and/or change this setting later on.'
    }

    return `Enter your ${getPlatform(platform)} URL.`
  },
  alertNewPixelTitle: 'Create your Facebook Pixel',
  alertNewPixelDescription: `You can install this pixel on your website(s) for this profile. Don't worry if you can't install your pixel yet, there's no harm in including one in your ads anyway.`,
  alertSelectPixelTitle: 'Select your Facebook Pixel',
  alertSelectPixelDescription: `This is the pixel that you have installed on your website(s) for this profile. Don't worry if you haven't installed a pixel yet, there's no harm in including one in your ads anyway.`,
  disabledReason: (section, hasSetUpProfile) => {
    const setupBaseString = 'Continue set-up to'
    const planBaseString = `Upgrade to <span className="text-insta font-bold">${section === 'facebook-pixel' ? 'Pro' : 'Growth'}</span> to`

    if (!hasSetUpProfile) {
      if (section === 'objective') return `${setupBaseString} choose your objective`
      if (section === 'linkbank') return `${setupBaseString} add to the link bank`
      if (section === 'integrations') return `${setupBaseString} integrate other platforms`
      if (section === 'budget') return `${setupBaseString} choose your budget`
      if (section === 'targeting') return `${setupBaseString} adjust your targeting`
      if (section === 'promotion-settings') return `${setupBaseString} fill in these fields`
    }

    if (section === 'connect-accounts') return `${planBaseString} connect more profiles`
    if (section === 'objective-traffic') return `${planBaseString} use the website visits objective`
    if (section === 'default-promotion') return `${planBaseString} turn off Automated Post Selection`
    if (section === 'facebook-pixel') return `${planBaseString} use Meta (Facebook) pixel in your Feed ads`
    if (section === 'custom-locations') return `${planBaseString} add custom cities and countries`
    if (section === 'linkbank') return `${planBaseString} add and store links`
    if (section === 'post-link') return `${planBaseString} set custom links on specific posts`
    if (section === 'post-cta') return `${planBaseString} set custom CTAs on specific posts`
    if (section === 'post-caption') return `${planBaseString} edit caption of promoted posts`
  },
  objectivePlanRestriction: 'Upgrade to <span className="text-insta font-bold">Pro</span> to use the website sales objective.',
  objectiveManagedTier: `Currently only people on our <span className="text-insta font-bold">Managed</span> plan can set multiple objectives per profile.

  [Email](mailto:team@tryfeed.co) to find out more or [book a call now](https://meetings.hubspot.com/feed/managed)`,
}
