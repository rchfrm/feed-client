/* eslint-disable quotes */
import { getPlatform } from '@/app/helpers/artistHelpers'
import { capitalise, formatCurrency } from '@/helpers/utils'

export default {
  objectiveSubtitle: 'What are you trying to achieve?',
  objectiveContact: 'Looking for Website sales or visits? [Get in touch](mailto:team@tryfeed.co)',
  defaultLinkSubtitle: (platform) => {
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
  locationSubtitle: 'Where are you based?',
  budgetSubtitle: 'What is your daily budget for advertising?',
  paymentMethodSubtitle: (defaultPaymentMethod, planPrefix, planPeriod, amount, isManaged) => {
    if (isManaged) {
      return `#### No payment method needed.

      Simply click next to complete the get started process.`
    }
    const baseString = defaultPaymentMethod ? 'Confirm your default card' : 'Add a card'

    if (planPrefix === 'free' || planPrefix === 'legacy') {
      if (defaultPaymentMethod) {
        return 'Confirm your default card and start running ads.'
      }

      return `#### Enter your card details below.

This is to cover Feed's 10% service fee. You won't be charged in months where you don't run ads.`
    }

    return `${baseString} to pay ${amount} for your first ${planPeriod === 'monthly' ? 'month' : 'year'} of <span className="text-insta font-bold">${capitalise(planPrefix)}</span> and start running ads.

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
    if (! objective) {
      return isDesktopLayout ? 'Grow or sell' : 'Objective'
    }

    return `${capitalise(platform)} growth`
  },
}
