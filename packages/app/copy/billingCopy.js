/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  // BILLING PAGE
  noPaymentMethods: `It looks like you haven't set up a payment method.`,
  facebookInvoice: `You will receive a separate invoice directly from Facebook for the ad spend.`,

  // ADD PAYMENT METHODS
  addPaymentHeader: (success) => {
    if (success) return `Payment method added!`
    return `Enter your card details`
  },
  addMethodSucess: (shouldBeDefault) => `You've successfully added a payment method${shouldBeDefault ? ' and it has been set the default:' : ':'}`,

  // CHOOSE PAYMENT METHOD
  choosePaymentIntro: `Here are the payment methods you've added so far. Choose what to use as a default or add a new method.`,

  // FAILED INVOICE
  failedInvoiceIntro: (date, hasPaymentMethod) => `There was a problem with the payment method on your invoice from **${date}** ${hasPaymentMethod ? 'using the payment method below:' : ''}`,
  failedInvoiceAction: 'Please, **retry making the payment**:',

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
  profilesIntro: 'The following profiles are part of this billing account, and appear on the same invoice.',
  noProfiles: `It looks like you haven't connected any profiles to this billing account yet.`,
  transferHeader: 'Transfer a profile to another billing account',
  transferDescription: `If you need to move a profile to another billing account, send a transfer request to an admin of the other billing account by entering their email address below.`,
  resolveTransfers: (transferRequestsNumber) => `Would you like to add the ${transferRequestsNumber > 1 ? 'profiles' : 'profile'} below to your billing account?`,

  // USERS & INVITES
  usersInfo: 'Manage the users that have access to the billing settings.',
  noUsers: `It looks like you haven't connected any users to this billing account yet.`,
  inviteHeader: 'Enter their email address:',
  inviteDescription: 'We’ll send them a link inviting them join your team on Feed and manage the billing information for the profiles you have.',
  userDeleteAlert: 'This user will lose access to the billing account. Do you want to continue?',
  invited: (inviting_user_name) => `You’ve been invited to join ${inviting_user_name}'s billing account`,
}
