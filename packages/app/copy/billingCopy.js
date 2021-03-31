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
}
