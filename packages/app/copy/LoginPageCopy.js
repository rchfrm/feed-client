/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  tcText: (action) => `By ${action}, you agree to our [Terms of Service](https://archform.ltd/terms) and [Privacy Policy](https://archform.ltd/privacy).`,

  signupReminder: `Don't have an account? [Sign up here](${ROUTES.SIGN_UP})`,
}
