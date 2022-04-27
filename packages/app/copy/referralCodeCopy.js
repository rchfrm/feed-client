/* eslint-disable quotes */
import { formatCurrency } from '@/helpers/utils'

const referralAmount = 50

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
  introToProgress: (totalReferrals, totalCompleteReferrals, upcomingBenefit) => {
    const totalReferredText = totalReferrals === 1 ? 'someone' : `${totalReferrals} people`
    const totalPendingReferrals = totalReferrals - totalCompleteReferrals
    const referralAmountString = formatCurrency(referralAmount, 'GBP', true)
    // No referrals of any kind
    if (!totalReferrals && !totalCompleteReferrals) return `Make your first referral to Feed by sharing your unique link. Once they sign up and spend through the platform, you’ll get ${referralAmountString} in credit!`
    // Only incomplete referrals
    if (totalReferrals && !totalCompleteReferrals) return `Thank you for referring ${totalReferredText} to Feed! Once they have spent some budget through the platform, we’ll give you ${referralAmountString} in credit.`
    // Only complete referrals
    if (totalPendingReferrals === 0) return `Thanks for referring ${totalReferredText} to Feed! Keep sharing your unique link to get ${upcomingBenefit}`
    // Mix of complete and incomplete referrals
    return `Thanks for referring ${totalReferredText} to Feed! ${totalPendingReferrals} ${totalPendingReferrals === 1 ? 'hasn\'t' : 'haven\'t'} yet spent anything through the platform.\n\nOnce they do, you’ll ${upcomingBenefit}.`
  },

  // TIERS
  tiers: () => {
    const basicCredit = formatCurrency(referralAmount, 'GBP', true)
    return [
      {
        referrals: 1,
        award: `${basicCredit} towards your advertising budget`,
        footnoteSymbol: '*',
        footnote: 'Applicable for every qualifying referral made from February \'22.',
      },
      {
        referrals: 2,
        award: `Another ${basicCredit} (you get this everytime 😉)`,
        upcoming: `get another ${basicCredit}`,
      },
      {
        referrals: 3,
        award: `Invitation to our Discord`,
        upcoming: `get an invitation to our Discord`,
      },
      {
        referrals: 5,
        award: `30 minute marketing consultation with Feed team`,
        upcoming: `be closer to getting a 30 minute marketing consultation`,
      },
      {
        referrals: 20,
        award: `Monthly marketing consultations for a year`,
        upcoming: `be closer to getting monthly marketing consultations`,
      },
    ]
  },
}
