/* eslint-disable quotes */
// import * as ROUTES from '@/app/constants/routes'

export default {
  emailVerify: (emailType) => `We've sent you an email, click the link to verify your ${emailType === 'email' ? 'email address' : 'contact email'}.`,
  emailQuestion: `Can't find the email?`,
  emailVerifySuccess: (emailType, isReauthenticateNeeded) => {
    const hasBeenVerifiedText = `Your new ${emailType === 'contactEmail' ? 'contact' : ''} email has been verified.`
    const reEnterPasswordText = 'Re-enter your password to continue.'

    if (isReauthenticateNeeded) {
      return `${hasBeenVerifiedText} ${reEnterPasswordText}`
    }
    return hasBeenVerifiedText
  },
}
