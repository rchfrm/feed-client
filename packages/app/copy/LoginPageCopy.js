/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  tcText: (action) => `By ${action}, you agree to our [Terms of Service](https://archform.ltd/terms) and [Privacy Policy](https://archform.ltd/privacy).`,

  signupTitle: '# Enter a password to create your account',

  signupTeaser: 'You are this close to never having to set-up an ad campaign again!',

  signupReminder: `Don't have an account? [Sign up here](${ROUTES.SIGN_UP})`,

  loginReminder: `Already have an account? [Log in here](${ROUTES.LOGIN})`,
}
