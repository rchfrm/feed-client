/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  // BILLING PAGE
  noPaymentMethods: `It looks like you haven't set up a payment method.`,
  // ADD PAYMENT METHODS
  addPaymentHeader: (success) => {
    if (success) return `Payment method added!`
    return `Enter your card details`
  },
  addMethodSucess: (shouldBeDefault) => `You've successfully added a payment method${shouldBeDefault ? ' and it has been set the default:' : ':'}`,

  // CHOOSE PAYMENT METHOD
  choosePaymentIntro: `There are the payment methods you've added so far. Choose what to use as a default or add a new method.`,

  // REFERALLS
  referralsCopy: (data) => {
    const {
      total_referrals,
      total_referrals_complete,
    } = data
    // No referrals
    if (!total_referrals) return `You haven't made any referrals yet. You can get and share [your referral code here](${ROUTES.MYREFERRAL})`
    const intro = `🤝 You've referred ${total_referrals} people`
    // No *complete* referrals
    if (total_referrals && !total_referrals_complete) return `${intro} but none of the accounts have yet spent the required amount.`
    return `${intro} and ${total_referrals_complete} accounts have spent the required amount 🎉, earning you ${total_referrals_complete} credits 💰. Great work 👍`
  },

  // PROFILES
  profilesIntro: 'The following profiles are part of this billing account, and will appear on the same invoice.',
  noProfiles: `It looks like you haven't connected any profiles to this billing account yet.`,
  transferHeader: 'Transfer a profile to another billing account',
  transferDescription: `If you need to move a profile to another billing account, send a transfer request to an admin of the other billing account by entering their email address below.`,
  resolveTransfers: 'Would you like to add the profile(s) below to your billing account?',

  // USERS & INVITES
  usersInfo: 'Manage the users that have access to the billing settings.',
  noUsers: `It looks like you haven't connected any users to this billing account yet.`,
  inviteHeader: 'Enter their email address:',
  inviteDescription: 'We’ll send them a link inviting them join your team on Feed and manage the billing information for the profiles you have.',
  userDeleteAlert: 'This user is going to lose access to the billing account. Do you want to continue?',
  invited: (inviting_user_name) => `You’ve been invited to join ${inviting_user_name}'s billing account`,
}
