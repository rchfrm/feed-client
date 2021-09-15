// * APP VERSION

export const SIGN_UP = '/join'
export const SIGN_UP_EMAIL = '/join/email'
export const SIGN_UP_MISSING_EMAIL = '/join/missing-email'
export const SIGN_UP_CONNECT_PROFILES = '/join/final-step'
export const CONFIRM_EMAIL = '/confirm-email'
export const REFERRAL = '/join/referral'
export const LOGIN = '/login'
export const LOGIN_EMAIL = '/login/email'
export const PASSWORD_FORGET = '/forgot-password'
export const PASSWORD_RESET = '/password-reset'

export const FAQ = '/faq'
export const PRICING = 'https://tryfeed.co/pricing'

export const CONNECT_PROFILES = '/connect-profiles'
export const THANK_YOU = '/thank-you'
export const POSTS = '/'
export const INSIGHTS = '/insights'
export const ACCOUNT = '/account'
export const MYREFERRAL = '/my-referral-code'
export const PAYMENT = '/account?add-payment'
export const CONNECTIONS = '/account?connections'
export const RESULTS = '/results'
export const TOURNAMENTS = '/results/tournaments'
export const NOTIFICATIONS = '/notifications'
export const TARGETING = '/targeting'
export const CONTROLS = '/controls'
export const CONTROLS_TARGETING = '/controls/targeting'
export const CONTROLS_LINKS = '/controls/links'
export const CONTROLS_INTEGRATIONS = '/controls/integrations'
export const CONTROLS_ADS = '/controls/ads'
export const CONTROLS_CONVERSIONS = '/controls/conversions'
export const BILLING = '/billing'

export const HOME = POSTS

// Array of RESTRICTED PAGES
export const restrictedPages = [
  SIGN_UP_MISSING_EMAIL,
  SIGN_UP_CONNECT_PROFILES,
  CONFIRM_EMAIL,
  CONNECT_PROFILES,
  THANK_YOU,
  POSTS,
  CONTROLS,
  INSIGHTS,
  ACCOUNT,
  MYREFERRAL,
  PAYMENT,
  CONNECTIONS,
  RESULTS,
  TOURNAMENTS,
  NOTIFICATIONS,
  TARGETING,
]

// Array of pages that you can access without being signed in
export const signedOutPages = [
  SIGN_UP,
  SIGN_UP_EMAIL,
  REFERRAL,
  LOGIN,
  LOGIN_EMAIL,
  PASSWORD_FORGET,
  PASSWORD_RESET,
]

// Array of controls sub-pages
export const controlsPages = [
  CONTROLS_TARGETING,
  CONTROLS_LINKS,
  CONTROLS_INTEGRATIONS,
  CONTROLS_ADS,
  CONTROLS_CONVERSIONS,
]
