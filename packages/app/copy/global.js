
/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  noArtists: `It looks like you haven't connected any Facebook pages yet. Please finish the sign up process [here](${ROUTES.CONNECT_ACCOUNTS}).`,

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
}
