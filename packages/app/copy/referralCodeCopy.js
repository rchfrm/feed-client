/* eslint-disable quotes */
import { formatCurrency } from '@/helpers/utils'

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
  introToProgress: (totalReferrals, totalCompleteReferrals, minSpend, upcomingBenefit) => {
    const totalReferredText = totalReferrals === 1 ? 'someone' : `${totalReferrals} people`
    const totalCompleteReferredText = totalCompleteReferrals === 1 ? 'someone' : `${totalCompleteReferrals} people`
    const totalPendingReferrals = totalReferrals - totalCompleteReferrals
    // No referrals of any kind
    if (!totalReferrals && !totalCompleteReferrals) return `Make your first referral to Feed by sharing your unique link. Once they sign up and spend ${minSpend} through the platform, you’ll both receive ${minSpend} in credit!`
    // Only incomplete referrals
    if (totalReferrals && !totalCompleteReferrals) return `Thank you for referring ${totalReferredText} to Feed! Once they have spent ${minSpend} through the platform, we’ll give you both ${minSpend} in credit.`
    // Only complete referrals
    if (!totalReferrals && totalCompleteReferrals) return `Thanks for referring ${totalCompleteReferredText} to Feed! Keep sharing your unique link to get ${upcomingBenefit}`
    // Mix of complete and incomplete referrals
    return `Thanks for referring ${totalCompleteReferredText} to Feed! There ${totalPendingReferrals === 1 ? 'is' : 'are'} also ${totalPendingReferrals} account${totalPendingReferrals > 1 ? 's' : ''} that ${totalPendingReferrals === 1 ? 'hasn\'t' : 'haven\'t'} yet spent ${minSpend} through the platform. Once they do, you’ll get ${upcomingBenefit}.`
  },

  // TIERS
  tiers: (creditAmount, currency) => {
    const basicCredit = formatCurrency(creditAmount, currency, true)
    return [
      {
        referrals: 1,
        award: `${basicCredit} credit to referrer and referee`,
        footnoteSymbol: '*',
        footnote: 'Applicable for every qualifying referral.',
      },
      {
        referrals: 2,
        award: `Another ${basicCredit} credit`,
      },
      {
        referrals: 3,
        award: `Invitation to private Slack`,
      },
      {
        referrals: 5,
        award: `30 minute marketing consultation with Feed team`,
      },
      {
        referrals: 10,
        award: `${formatCurrency(creditAmount * 5, currency, true)} towards your advertising budget`,
      },
      {
        referrals: 20,
        award: `Monthly marketing consultations with Feed team for a year`,
      },
    ]
  },
}
