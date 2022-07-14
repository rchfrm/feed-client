
/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'
import { capitalise } from '@/helpers/utils'

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
      return `${baseString} connect another profile?`
    }
  },
  pricingUpgradeIntroDescription: (section) => {
    if (section) {
      return `Manage multiple Facebook pages and Instagram accounts by upgrading to <span className="text-insta font-bold">Growth</span> or <span className="text-insta font-bold">Pro</span>.

      Pricing starts from £20 per month per profile.`
    }
  },
  pricingUpgradePlanIntro: (plan, monthlyCost) => `Would you like to add additional profiles to Feed at the same time?

Each profile on **${capitalise(plan)}** is charged at £${monthlyCost} per month.`,
  pricingUpgradeSummary: (currentProfile, currentPlan) => `You have paid £25.

${currentProfile} has been upgraded to <span className="text-insta font-bold">${capitalise(currentPlan)}</span>.

Jupiter Grey has been connected on <span className="text-insta font-bold">Pro</span>. Close this window to set an objective.`,
}
