/* eslint-disable quotes */
// import * as ROUTES from '@/app/constants/routes'

export default {

  missingFbEmail: `There isn't an email address associated with your Facebook account, and we need a way to keep you updated on Feed's performance. Enter one below.`,

  emailVerify: (emailType) => `We’ve sent you an email, click the link to verify your ${emailType === 'email' ? 'email address' : 'contact email'}.`,

  emailVerifySuccess: {
    success: (email) => `Success! Your email **${email}** has been verified!`,
    logoutExplainer: `You will now need to sign in with your new email address.`,
    button: (hasAuthEmailChanged) => { return hasAuthEmailChanged ? `Sign in with new email` : 'Continue' },
  },
}
