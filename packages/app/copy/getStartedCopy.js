/* eslint-disable quotes */
import { platforms, getPlatform } from '@/app/helpers/artistHelpers'
import { capitalise, formatCurrency } from '@/helpers/utils'

export default {
  profileStatus: (status, objective, platform) => {
    if (status === 'objective') return `What's your objective?`
    if (status === 'platform') return 'Select the platform to grow'
    if (status === 'default-link') {
      if (objective === 'growth' && (platform !== 'facebook' && platform !== 'instagram')) {
        const platformName = platforms.find(({ value }) => value === platform)?.name

        return `Connect to ${platformName}`
      }

      return 'Enter your website link'
    }
    if (status === 'pricing-plan') return 'Select your pricing plan'
    if (status === 'connect-profile') return 'Connect to Facebook'
    if (status === 'posts') return 'Select the posts to promote'
    if (status === 'ad-account') return 'Select your ad account'
    if (status === 'facebook-pixel') return 'Select your Facebook pixel'
    if (status === 'location') return 'Where are you based?'
    if (status === 'budget') return 'How much would you like to spend?'
    if (status === 'payment-method') return 'Add a payment method'

    return ''
  },
  objectiveSubtitle: 'What are you trying to achieve?',
  objectivePlanFooter: (plan) => {
    if (plan === 'basic') return 'Available in all plans'
    if (plan === 'growth') return 'Growth and above'
    if (plan === 'pro') return 'Pro exclusive'
  },
  platformSubtitle: 'Which platform would you like to focus on initially?',
  defaultLinkSubtitle: (objective, platform) => {
    if (objective !== 'growth') {
      return 'Enter the link to your website or landing page'
    }
    return `Enter the link to your ${getPlatform(platform)}`
  },
  pricingSubtitle: 'Select the features and pricing to suit you',
  invalidLinkReason: (reason) => {
    const errorString = 'Error saving the link, the provided link'
    if (reason === 1) return `${errorString} contains a redirect`
    if (reason === 2) return `${errorString} returns an error. Double check the link or [contact us](mailto:team@tryfeed.co) in case you think the link is correct`
    if (reason === 3) return `${errorString} is inaccessible`
  },
  facebookConnectSubtitle: 'Connect to Facebook and Instagram',
  facebookConnectMultipleProfilesSubtitle: "You've connected multiple profiles, which would you like to set-up first?",
  postsSelectionSubtitle: (hasEnabledPosts, postType) => {
    if (hasEnabledPosts && postType === 'promotion_enabled') {
      return "The posts you've selected for promotion..."
    }

    return 'These are the posts we recommend promoting first...'
  },
  adAccountSubtitle: 'Which Facebook ad account would you like Feed to use?',
  facebookPixelSubtitle: (pixels, shouldShowPixelSelector, defaultLinkHref) => {
    if (shouldShowPixelSelector) {
      if (pixels.length) {
        return `Which Meta pixel is installed on ${defaultLinkHref}?`
      }
      return 'How should your Facebook Pixel be named?'
    }

    return "Looks like you don't have a Facebook Pixel! Happy for us to create one?"
  },
  locationSubtitle: 'Where are you based?',
  budgetSubtitle: 'What is your daily budget for advertising?',
  paymentMethodSubtitle: (planPrefix, planPeriod, amount) => {
    if (planPrefix === 'basic') {
      return `#### Enter your card details below.

This is to cover Feed's 10% service fee. You won't be charged in months where you don't run ads.`
    }

    return `Add a card to pay ${amount} for your first ${planPeriod === 'monthly' ? 'month' : 'year'} of <span className="text-insta font-bold">${capitalise(planPrefix)}</span> and start running ads.

You will be invoiced separately by Facebook for the ad spend.`
  },
  budgetFooter: (minBaseUnrounded, currency) => {
    const lowestMultiplier = 3.7
    const highestMultiplier = 8.8
    const lowestAmountString = (minBaseUnrounded * lowestMultiplier).toFixed(1)
    const highestAmountString = (minBaseUnrounded * highestMultiplier).toFixed(1)

    return `Most people start with a budget of ${formatCurrency(lowestAmountString, currency)} - ${formatCurrency(highestAmountString, currency)} a day.`
  },
  pricingPlan: (pricingPlan) => {
    const [plan] = pricingPlan.split('_')

    return `the ${capitalise(plan)}`
  },
  disabledPricingPlan: (pricingPlan, objective) => {
    return `${capitalise(pricingPlan)} is unavailable with the website ${objective} objective.`
  },
  inSufficientBudget: (minBudget) => `Budget must be at least ${minBudget} to set your objective to sales.`,
  reviewDescription: 'Feed has submitted your ads for approval!',
  objectiveSummary: (objective, platform, isDesktopLayout) => {
    if (!objective) {
      return isDesktopLayout ? 'Grow, sell or drive traffic' : 'Objective'
    }

    if (objective && objective === 'growth') {
      return `${platform !== 'website' ? capitalise(platform) : `Audience`} growth`
    }

    return `${capitalise(platform)} ${objective}`
  },
}
