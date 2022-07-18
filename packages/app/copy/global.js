
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

    if (section) {
      return `${baseString} ...?`
    }
  },
  pricingUpgradeIntroDescription: (section) => {
    if (section) {
      return `Pulvinar elementum integer enim neque volutpat ac. Volutpat est velit egestas dui id ornare arcu odio ut.

      Tellus mauris a diam maecenas.`
    }
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

    return `${name} will be upgraded to <span className="text-insta font-bold">${capitalise(planPrefix)}</span>.`
  },
  pricingUpgradeSummary: (upgradedProfiles, amount, currency) => {
    const list = upgradedProfiles.map(({ name, plan, currentPayment }) => {
      if (currentPayment <= 0) return

      return `- ${name} has been upgraded to <span className="text-insta font-bold">${capitalise(plan)}</span>.`
    })

    return `You have paid ${formatCurrency(amount, currency)}.

${list.join('\n')}

Close this window to set an objective.`
  },
  pricingUpgradeCurrentPaymentList: (upgradedProfiles, currency) => {
    const list = upgradedProfiles.map(({ name, plan, currentPayment }) => {
      if (currentPayment < 0) return

      if (!currentPayment) {
        return `- No change to ${name}`
      }

      return `- ${formatCurrency(currentPayment, currency)} to upgrade ${name} to ${capitalise(plan)}`
    })

    return list.join('\n')
  },
  pricingUpgradeNextPaymentList: (upgradedProfiles, currency) => {
    const list = upgradedProfiles.map(({ name, plan, currentPayment, nextPayment }) => {
      if (currentPayment <= 0) return

      return `- ${formatCurrency(nextPayment, currency)} for ${name} on ${capitalise(plan)}`
    })

    return list.join('\n')
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
  },
}
