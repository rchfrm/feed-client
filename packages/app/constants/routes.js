// * APP VERSION

export const SIGN_UP = '/join'
export const CONFIRM_EMAIL = '/confirm-email'
export const REFERRAL = '/join/referral'
export const LOGIN = '/login'
export const LOGIN_EMAIL = '/login/email'
export const LOGIN_FACEBOOK = '/login/facebook'
export const PASSWORD_FORGET = '/forgot-password'
export const PASSWORD_RESET = '/password-reset'
export const PROFILE_INVITE_SUCCESS = '/profile-invite-success'

export const FAQS = '/faqs'
export const FAQS_SLUG = '/faqs/[slug]'
export const PRICING = 'https://tryfeed.co/pricing'

export const DASHBOARD = '/dashboard'
export const CONNECT_ACCOUNTS = '/connect-accounts'
export const POSTS = '/'
export const POST = '/posts/[id]'
export const ACCOUNT = '/account'
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
export const CONTROLS_TEAM = '/controls/team'
export const BILLING = '/billing'
export const GET_STARTED = '/get-started'

export const HOME = POSTS

// Array of RESTRICTED PAGES
export const restrictedPages = [
  CONFIRM_EMAIL,
  PROFILE_INVITE_SUCCESS,
  CONNECT_ACCOUNTS,
  DASHBOARD,
  POSTS,
  POST,
  CONTROLS,
  ACCOUNT,
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
  CONTROLS_SLUG,
  CONTROLS_OBJECTIVE,
  CONTROLS_BUDGET,
  CONTROLS_TARGETING,
  CONTROLS_LINKS,
  CONTROLS_INTEGRATIONS,
  CONTROLS_ADS,
  CONTROLS_TEAM,
]

export const generalPages = [
  POSTS,
  CONTROLS,
  ...controlsPages,
  RESULTS,
  DASHBOARD,
]

export const subPages = [
  CONTROLS_SLUG,
  FAQS_SLUG,
]
