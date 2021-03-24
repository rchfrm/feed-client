
/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  noArtists: `It looks like you haven't connected any Facebook pages yet. Please finish the sign up process [here](${ROUTES.SIGN_UP_CONNECT_PROFILES}).`,

  unverifiedEmails: ({ emails = [], isNewUser, isAccountPage }) => {
    return `It looks like you have ${emails.length === 1 ? `an unverified email: **${emails[0]}**` : `some unverified emails: ${emails.join(', ')}`}.
    
Please check your inbox to confirm. ${!isAccountPage ? `Or change the email address on the [Account Page](${ROUTES.ACCOUNT}).` : ''}`
  },
}
