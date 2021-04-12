/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  connectionsSummary: `Add links for your social profiles and any other website(s) you manage here. If you have more than one website, you can just put the link in any empty field.`,
  connectionsDialogue: `The default link in your promoted posts is marked by *. You can change the link on each specific post [here](${ROUTES.POSTS}).
  
When you enter a link, make sure it starts with "https://".
  `,
  paymentsSummary: `Right now, the beta version of Feed is free to use! In the future, you’ll be able to add payment details here. 

  More details on Feed’s pricing is [here](${ROUTES.PRICING}).`,

  selectPaymentIntro: `Select your default payment method, or add a new one.`,

  addPaymentIntro: `After your trial period, you’ll need to enter your card details here.

  To keep it simple, the daily budget you set in Feed is the total amount you’ll spend each day - including our service fee. Our fee is 10% of your chosen daily budget, dropping to 5% for spend over £150 in the billing month.

  More details on Feed’s pricing is [here](${ROUTES.PRICING}).`,

  changeEmailAlert: `After changing your email you will be logged out of your account.`,
}
