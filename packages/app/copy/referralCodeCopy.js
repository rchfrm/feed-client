/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  signupClosedCopy: `There is currently a waiting list to join the Feed beta.
  
  Have a <span class="green--underline">referral code️</span> from a Feed user, or one of our partners? [Sign up here](${ROUTES.REFERRAL}).

If not, add your email below and we'll get in touch as soon as a space is available!`,

  submitReferralCopy: `Sign up here with your referral code`,

  invalidCodeCopy: `Sorry, this referral code is not valid.`,

  successfulCodeCopy: `Success! Your referral code is good.`,

  // Explain to users what their referral code is
  explanation: `This is your referral code. Share it with others to let them jump the queue and sign up to Feed. You'll also benefit from our referral scheme when it starts running.`,
}
