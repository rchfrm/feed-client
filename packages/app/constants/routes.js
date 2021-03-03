export const SIGN_UP = '/join'
export const SIGN_UP_EMAIL = '/join/email'
export const SIGN_UP_CONFIRM_EMAIL = '/join/confirm-email'
export const SIGN_UP_CONTINUE = '/join/final-step'
export const REFERRAL = '/join/referral'
export const LOGIN = '/login'
export const LOGIN_EMAIL = '/login/email'
export const PASSWORD_FORGET = '/forgot-password'

export const FAQ = '/faq'
export const PRICING = 'https://tryfeed.co/pricing'

export const CONNECT_PROFILES = '/connect-profiles'
export const THANK_YOU = '/thank-you'
export const POSTS = '/'
export const CONTROLS = '/controls'
export const INSIGHTS = '/insights'
export const ACCOUNT = '/account'
export const MYREFERRAL = '/my-referral-code'
export const PAYMENT = '/account?add-payment'
export const CONNECTIONS = '/account?connections'
export const RESULTS = '/results'
export const TOURNAMENTS = '/results/tournaments'
export const NOTIFICATIONS = '/notifications'
export const TARGETING = '/targeting'

export const HOME = POSTS

// Array of RESTRICTED PAGES
export const restrictedPages = [
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

export const signedOutPages = [
  SIGN_UP,
  SIGN_UP_EMAIL,
  SIGN_UP_CONFIRM_EMAIL,
  SIGN_UP_CONTINUE,
  REFERRAL,
  LOGIN,
  LOGIN_EMAIL,
  PASSWORD_FORGET,
]
