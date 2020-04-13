/* eslint-disable quotes */
import * as ROUTES from '../constants/routes'

export default {
  tcText: (cta) => `By clicking ${cta}, you agree to our [Terms of Service](https://archform.ltd/terms) and [Privacy Policy](https://archform.ltd/privacy).`,

  signupReminder: `Don't have an account? [Sign up here](${ROUTES.SIGN_UP})`,

  loginReminder: `Already have an account? [Log in here](${ROUTES.LOGIN})`,
}
