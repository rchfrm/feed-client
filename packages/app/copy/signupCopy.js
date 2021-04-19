/* eslint-disable quotes */
// import * as ROUTES from '@/app/constants/routes'

export default {
  noReferralCode: {
    message: `It looks like you're not using a referral code.`,
    label: `No referral code provided`,
  },

  missingFbEmail: `There isn't an email address associated with your Facebook account, and we need a way to keep you updated on Feed's performance. Enter one below.`,

  emailVerify: (email) => `Please confirm your email address **${email}** by clicking on the link in the email we sent you.`,

  emailVerifySuccess: {
    success: (email) => `Success! Your email **${email}** has been verified!`,
    logoutExplainer: `You will now need to sign in with your new email address.`,
    button: (isAuthEmail) => { return isAuthEmail ? `Sign in with new email` : 'Continue' },
  },
}
