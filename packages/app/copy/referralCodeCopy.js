/* eslint-disable quotes */

export default {
  signupClosedIntro: `**There is currently a waiting list to join the Feed beta.**`,

  signupClosedReferral: `Do you have a <span class="green--underline">referral code️</span> from a Feed user, or one of our partners?`,

  signupClosedOutro: `If not, add your details below and we'll get in touch as soon as a space is available!`,

  submitReferralCopy: `Sign up here with your referral code`,

  invalidCodeCopy: `Sorry, this referral code does not exist.`,

  // Explain to users what their referral code is
  explanation: `This is your referral code. Share it with others to let them jump the queue and sign up to Feed.`,

  // Explain about sharing link
  sharingLinkExplanation: `You can also share a direct link that will let others sign up using your referral code.`,

  // Intro progress
  introToProgress: (referralsAchieved) => {
    if (!referralsAchieved) return `Refer your first friend to **Feed** to give them £10 credit and get the same for yourself!`
    return `You've referred ${referralsAchieved} people, great work! Refer more friends to get the next benefit...`
  },

  // TIERS
  tiers: [
    {
      referrals: 1,
      award: `Give £10 credit, get £10 credit`,
    },
    {
      referrals: 2,
      award: `Another £10!`,
    },
    {
      referrals: 3,
      award: `...and another!`,
    },
    {
      referrals: 5,
      award: `Access to private [Slack] and affiliate scheme`,
      footnoteSymbol: '*',
      footnote: 'Users get [10]% of the service fee and commission on sales from users they refer (excluding the first 3) for [6 months]. This is for implementation post payments, and the money earned could be paid out as cash, or used as credit for Feed.',
    },
    {
      referrals: 10,
      award: `£50 towards advertising budget`,
    },
    {
      referrals: 15,
      award: `1 hour marketing consultation with founder`,
    },
    {
      referrals: 25,
      award: `Set your price for Feed for a year`,
      footnoteSymbol: '',
      footnote: '',
    },
    {
      referrals: 50,
      award: `Set your price for Feed for life`,
      footnoteSymbol: '',
      footnote: '',
    },
  ],
}
