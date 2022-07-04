// * APP VERSION

export const SIGN_UP = '/join'
export const CONFIRM_EMAIL = '/confirm-email'
export const REFERRAL = '/join/referral'
export const LOGIN = '/login'
export const LOGIN_EMAIL = '/login/email'
export const LOGIN_FACEBOOK = '/login/facebook'
export const PASSWORD_FORGET = '/forgot-password'
export const PASSWORD_RESET = '/password-reset'

export const FAQS = '/faqs'
export const FAQS_SLUG = '/faqs/[slug]'
export const PRICING = 'https://tryfeed.co/pricing'

export const CONNECT_ACCOUNTS = '/connect-accounts'
export const THANK_YOU = '/thank-you'
export const POSTS = '/'
export const POST = '/posts/[id]'
export const INSIGHTS = '/insights'
export const ACCOUNT = '/account'
export const MYREFERRAL = '/my-referral-code'
export const PAYMENT = '/account?add-payment'
export const CONNECTIONS = '/account?connections'
export const RESULTS = '/results'
export const NOTIFICATIONS = '/notifications'
export const TARGETING = '/targeting'
export const CONTROLS = '/controls'
export const CONTROLS_SLUG = '/controls/[slug]'
export const CONTROLS_OBJECTIVE = '/controls/objective'
export const CONTROLS_BUDGET = '/controls/budget'
export const CONTROLS_TARGETING = '/controls/targeting'
export const CONTROLS_LINKS = '/controls/links'
export const CONTROLS_INTEGRATIONS = '/controls/integrations'
export const CONTROLS_ADS = '/controls/ads'
export const BILLING = '/billing'
export const GET_STARTED = '/get-started'

export const HOME = POSTS

// Array of RESTRICTED PAGES
export const restrictedPages = [
  CONFIRM_EMAIL,
  CONNECT_ACCOUNTS,
  THANK_YOU,
  POSTS,
  POST,
  CONTROLS,
  INSIGHTS,
  ACCOUNT,
  MYREFERRAL,
  PAYMENT,
  CONNECTIONS,
  RESULTS,
  NOTIFICATIONS,
  TARGETING,
  GET_STARTED,
]

// Array of pages that you can access without being signed in
export const signedOutPages = [
  SIGN_UP,
  REFERRAL,
  LOGIN,
  LOGIN_EMAIL,
  LOGIN_FACEBOOK,
  PASSWORD_FORGET,
  PASSWORD_RESET,
]

// Array of controls subpages
export const controlsPages = [
  CONTROLS_OBJECTIVE,
  CONTROLS_BUDGET,
  CONTROLS_TARGETING,
  CONTROLS_LINKS,
  CONTROLS_INTEGRATIONS,
  CONTROLS_ADS,
]

// Array of subpages
export const subPages = [
  CONTROLS_SLUG,
  FAQS_SLUG,
]
