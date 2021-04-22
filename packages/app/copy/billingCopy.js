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

  // FAILED INVOICE
  failedInvoiceIntro: (date) => `There was a problem with the payment method on your invoice from **${date}** using the payment method below:`,
  failedInvoiceAction: (hasNewDefault) => {
    return `You can either ${hasNewDefault ? '**retry with your new default payment method**' : '**retry making the payment**'} or **change how you pay** (choose or add a new default payment method):`
  },

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
}
