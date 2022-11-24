/* eslint-disable quotes */

export default {
  // BILLING PAGE
  noPaymentMethods: `It looks like you haven't set up a payment method.`,
  facebookInvoice: `You will receive a separate invoice directly from Facebook for the ad spend.`,

  // ADD PAYMENT METHODS
  addPaymentHeader: (shouldBeDefault) => {
    if (shouldBeDefault) return `Add a payment method`
    return `Add a new card`
  },
  addMethodSuccess: (shouldBeDefault) => `You've successfully added a payment method${shouldBeDefault ? ' and it has been set as the default.' : '.'}`,

  // CHOOSE PAYMENT METHOD
  choosePaymentIntro: `Here are the payment methods you've added so far. Choose what to use as a default or add a new method.`,

  // FAILED INVOICE
  failedInvoiceIntro: (date, hasPaymentMethod) => `There was a problem with the payment method on your invoice from **${date}** ${hasPaymentMethod ? 'using the payment method below:' : ''}`,
  failedInvoiceAction: 'Please, **retry making the payment**:',

  // PROFILES
  profilesIntro: 'The following profiles are part of this billing account, and appear on the same invoice.',
  noProfiles: `It looks like you haven't connected any profiles to this billing account yet.`,

  // USERS & INVITES
  usersInfo: 'Manage the users that have access to the billing settings.',
  noUsers: `It looks like you haven't connected any users to this billing account yet.`,
  inviteDescription: 'We’ll send them a link inviting them join your team on Feed and manage the billing information for the profiles you have.',
  userDeleteAlert: 'This user will lose access to the billing account. Do you want to continue?',
  invited: (inviting_user_name) => `You’ve been invited to join ${inviting_user_name}'s billing account`,
}
