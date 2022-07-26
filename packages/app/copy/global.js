
/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

import { capitalise, formatCurrency } from '@/helpers/utils'
import { pricingNumbers } from '@/constants/pricing'

export default {
  noArtists: `It looks like you haven't connected any Facebook pages yet. Please finish the sign up process [here](${ROUTES.GET_STARTED}).`,

  unverifiedEmails: ({ emails = [], isAccountPage }) => {
    return `It looks like you have ${emails.length === 1 ? `an unverified email: **${emails[0]}**` : `some unverified emails: ${emails.join(', ')}`}.

Please check your inbox to confirm. ${!isAccountPage ? `Or change the email address on the [Account Page](${ROUTES.ACCOUNT}).` : ''}`
  },
  fbRedirectError: (errorReason) => {
    if (errorReason === 'user_denied') {
      return `Looks like you didn't complete the process of connecting to Facebook. Click Continue with Facebook to try again, or [email us](mailto:help@tryfeed.co) for help.`
    }
    return `Something went wrong. Please try connecting with Facebook again.`
  },
  pricingUpgradeIntroTitle: (section) => {
    const baseString = 'Looking to'
    function getSectionIntro(section) {
      switch (section) {
        case 'connect-accounts':
          return 'manage multiple profiles'
        case 'priority-post':
          return 'prioritise a post'
        case 'post-link':
          return 'select another link'
        case 'post-cta':
          return 'select a different CTA'
        case 'post-caption':
          return 'edit the caption'
        case 'single-post-page':
          return 'edit the post settings'
        case 'objective-traffic':
          return 'choose another objective'
        case 'objective-sales':
          return 'use conversion ads'
        case 'default-promotion':
          return 'disable automatic promotion'
        case 'facebook-pixel':
          return 'add a Meta pixel'
        case 'custom-locations':
          return 'target another location'
        case 'linkbank':
          return 'save more links'
        case 'insights':
          return 'get some insights'
        case 'budget':
          return 'increase your budget'
        case 'set-budget':
          return 'set a budget'
        default:
          return section
      }
    }
    return `${baseString} ${getSectionIntro(section)}?`
  },
  pricingUpgradeIntroDescription: (section, currency = 'GBP') => {
    const maxSpendGrowth = pricingNumbers.growth.monthlyCost[currency] * pricingNumbers.growth.maxSpendMultiple
    const maxSpendPro = pricingNumbers.pro.monthlyCost[currency] * pricingNumbers.pro.maxSpendMultiple
    function getSectionDescription(section) {
      switch (section) {
        case 'connect-accounts':
          return 'Feed allows you to run ads for more than one profile at once.'
            + '\n\n You can switch between profiles, setting individual budgets, objectives and viewing the results.'
        case 'priority-post':
          return 'The double chevron in the top left corner of each post allows you to mark it as a priority.'
            + '\n\n This means Feed will create ads based on that post and submit them for review within 15 minutes.'
            + '\n\n The ads are usually approved by Meta within a few hours. Once they are, the prioritised post will start to run on its own, with any ads that were running turned off.'
        case 'post-link':
          return 'By default, when turning a post into an ad, Feed will set the link based on the your objective.'
            + '\n\n If your objective is Instagram Growth this will be the link to your profile page.'
            + '\n\n This section allows you to set links for individual posts. This means some could point to your YouTube channel and others to your Instagram profile.'
        case 'post-cta':
          return 'The CTA (or call-to-action) appears over the image or video in your ads. This is the button people click to go to the link you\'ve selected.'
            + '\n\n Feed selects the most appropriate CTA for your objective and applies it to each ad by default. If you\'ve chosen Spotify Growth, then this default CTA will be "Listen Now".'
            + '\n\n There are other options available for the CTA, such as:  "Shop Now", "Sign Up" or "Watch More". This section allows you to choose a CTA specific to the post and create ads that use different CTAs.'
        case 'post-caption':
          return 'When turning a post into an ad, Feed copies the original caption over too.'
            + '\n\n For engagement ads, this means any paid and organic likes get added together. So if there were 10 organic likes, and 10 paid likes, the post in your Feed will show 20 total likes.  This is great for "social proof".'
            + '\n\n Of course, the original caption might not always be quite right for an ad. The caption may refer to an event that is now in the past, or include lots of hashtags. Editing the caption enables you to use a different message in the ads.'
        case 'single-post-page':
          return 'By default, Feed will set the link and CTA (call-to-action) on your ads based on your objective.'
            + '\n\n Then copy the caption over from the original post.'
            + '\n\n It is possible to make edits to these for individual posts.'
            + '\n\n As an example: you could have one post that links to your YouTube channel with a CTA of "Watch More", and another that links to Spotify with a "Listen More" CTA.'
        case 'objective-traffic':
          return 'Beyond audience growth there are two other objectives in Feed: traffic or sales.'
            + '\n\n The traffic objective will focus on link clicks, so sending people to your website. Encouraging people off Facebook or Instagram helps you have a more direct relationship.'
            + '\n\n The sales objective focusses on purchases from your online shop. By adding a Meta Pixel, Feed will be able to report back the value of purchases made as a direct result of the ads.'
        case 'objective-sales':
          return 'The sales objective allows you to run ads geared towards purchases on your site.'
            + '\n\n You\'ll be able to track both the number and value of sales on your site as a direct result of Feed\'s ads.'
            + '\n\n This means Feed can then calculate your ROAS, or return on ad spend.'
            + '\n\n A 3x ROAS would mean that you made 3x more in revenue from purchases than you spent on the ads that drove those sales.'
        case 'default-promotion':
          return 'By default, each one of your posts will be eligible for promotion. Feed will prioritise the posts based on score, and run continuous A/B testing to ensure the best results.'
            + '\n\n The more posts Feed has to choose from the better, as it is often surprising which posts perform the best!'
            + '\n\n Disabling automated post selection toggles off every post by default. This means you\'ll need to toggle on each of the posts you\'d like to promote.'
            + '\n\n In exchange for spending a few extra minutes choosing posts, you gain finer control over your ads.'
        case 'facebook-pixel':
          return 'Adding a Meta Pixel to your website makes a big difference to the potential power of your ad campaigns.'
            + '\n\n This short piece of code can detect when a Facebook or Instagram user visits your website. Selecting a Meta Pixel in Feed will enable a few things:'
            + '\n\n 1. Reporting on which actions people take on your website'
            + '\n\n 2. Creation of retargeting audiences containing people who have visited your website'
            + '\n\n 3. Targeting of those retargeting audiences with further ads'
        case 'custom-locations':
          return 'Feed analyses your audience to create a list of priority locations to target.'
            + '\n\n The list shows every city or country that contains more than 1% of your total audience.'
            + '\n\n You can target any combination of these locations with your ads.'
            + '\n\n The search box enables you to extend this list with any location and add it to your targeting.'
        case 'linkbank':
          return 'The "link bank" is your store of links to use across your ads.'
            + '\n\n You might have various product pages, music releases, or blog articles. Here you can save a link to each one and organise them in folders.'
            + '\n\n Those links will then be available to select as your default link or on individual posts.'
        case 'insights':
          return 'The insights page is all about the bigger picture.'
            + '\n\n How has has your Instagram follower count been growing over time?'
            + '\n\n What about Spotify Monthly Listeners?'
            + '\n\n Here you can see charts displaying the impact your marketing is having on your audience.'
        case 'budget':
          return `Growth includes a monthly limit of ad spend of ${formatCurrency(maxSpendGrowth, currency)}.`
            + `\n\n With Pro this increases to ${formatCurrency(maxSpendPro, currency)}.`
        case 'set-budget':
          return `Explanation about the profile not being able to run ads because it's not on a plan while the organisation has at least one profile on Growth or Pro.`
        default:
          return 'Description...?'
      }
    }
    const suffix = '\n**To try this feature, click upgrade below.**'
    return `
      ${getSectionDescription(section)}
      ${suffix}
    `
  },
  pricingUpgradePlanIntro: (hasMultipleUpgradableProfiles, name, plan, currency) => {
    const [planPrefix, planPeriod] = plan?.split('_') || []
    const monthlyCost = pricingNumbers[planPrefix].monthlyCost[currency]
    const isAnnualPricing = planPeriod === 'annual'
    const amount = isAnnualPricing ? monthlyCost * 0.8 : monthlyCost

    if (hasMultipleUpgradableProfiles) {
      return `Would you like to upgrade other profiles at the same time?

Each profile on **${capitalise(planPrefix)}** is charged at ${formatCurrency(amount, currency, true)} per month.`
    }

    return `### **Final confirmation**

${name} will be upgraded to <span className="text-insta font-bold">${capitalise(planPrefix)}</span>.`
  },
  pricingUpgradeCurrentPaymentList: (prorationsPreview, currency, hasSetUpProfile) => {
    const { upgradedProfiles, period: { isFirstDayOfPeriod } } = prorationsPreview

    const list = upgradedProfiles.map(({ name, plan, currentPayment }) => {
      if ((!currentPayment && plan === 'pro') || (!currentPayment && !hasSetUpProfile)) return
      if (!currentPayment) return `- No change to ${name}`

      return `- ${formatCurrency(currentPayment, currency)} ${hasSetUpProfile ? `to upgrade ${name} to` : `to set ${name} on`} <span className="text-insta font-bold">${capitalise(plan)}</span>${!isFirstDayOfPeriod ? '^' : ''}`
    })

    return `**To pay today:**

${list.join('\n')}`
  },
  pricingUpgradeNextPaymentList: (prorationsPreview, currency) => {
    const {
      upgradedProfiles,
      nextInvoice: {
        amount,
        usageAmount,
      },
      period: {
        daysInPeriod,
        daysRemainingInPeriod,
      },
    } = prorationsPreview

    const daysPassedInPeriod = daysInPeriod - daysRemainingInPeriod

    const list = upgradedProfiles.map(({ name, plan, nextPayment }) => {
      return `- ${formatCurrency(nextPayment, currency)} for ${name} on <span className="text-insta font-bold">${capitalise(plan)}</span>*`
    })

    if (usageAmount) {
      list.push(`- ${formatCurrency(usageAmount, currency)} service fee from Basic plan during first ${daysPassedInPeriod} ${daysPassedInPeriod > 1 ? 'days' : 'day'} of current billing period`)
    }

    return `**Your next invoice will be for ${formatCurrency(amount, currency)}:**

${list.join('\n')}`
  },
  pricingUpgradeSummary: (prorationsPreview) => {
    const {
      currency,
      upgradedProfiles,
      prorations: {
        amount,
      },
    } = prorationsPreview

    const list = upgradedProfiles.map(({ name, plan, currentPayment }) => {
      if (currentPayment <= 0) return

      return `- ${name} has been upgraded to <span className="text-insta font-bold">${capitalise(plan)}</span>.`
    })

    return `You have paid ${formatCurrency(amount, currency)}.`
      + `\n\n ${list.join('\n')}`
    // TODO: Add message to use feature from initial prompt that opened the upgrade flow. "Close this window to..."
  },
  disabledReason: (section, hasSetUpProfile, hasOverflow) => {
    const shouldUpgradeToPro = section === 'facebook-pixel' || section === 'objective-sales'
    const setupBaseString = 'Continue set-up to'
    const planBaseString = `Upgrade to <span className="text-insta font-bold">${shouldUpgradeToPro ? 'Pro' : 'Growth'}</span>`

    if (!hasSetUpProfile) {
      if (section === 'objective') return `${setupBaseString} choose your objective`
      if (section === 'linkbank') return `${setupBaseString} add to the link bank`
      if (section === 'integrations') return `${setupBaseString} integrate other platforms`
      if (section === 'budget') return `${setupBaseString} choose your budget`
      if (section === 'targeting') return `${setupBaseString} adjust your targeting`
      if (section === 'promotion-settings') return `${setupBaseString} fill in these fields`
    }

    if (hasOverflow) return planBaseString

    if (section === 'connect-accounts') return `${planBaseString} to connect more profiles`
    if (section === 'objective-traffic') return `${planBaseString} to use the website visits objective`
    if (section === 'objective-sales') return `${planBaseString} to use the website sales objective.`
    if (section === 'default-promotion') return `${planBaseString} to turn off Automated Post Selection`
    if (section === 'facebook-pixel') return `${planBaseString} to use Meta (Facebook) pixel in your Feed ads`
    if (section === 'custom-locations') return `${planBaseString} to add custom cities and countries`
    if (section === 'linkbank') return `${planBaseString} to add and store links`
    if (section === 'post-link') return `${planBaseString} to set custom links on specific posts`
    if (section === 'post-cta') return `${planBaseString} to set custom CTAs on specific posts`
    if (section === 'post-caption') return `${planBaseString} to edit caption of promoted posts`
    if (section === 'insights') return `${planBaseString} to track audience data from connected integrations`
    if (section === 'single-post-page') return `${planBaseString} to use custom settings for specific posts`
    if (section === 'set-budget') return `${planBaseString} to set a budget`
  },
}
