export const SIGN_UP = '/join'
export const SIGN_UP_EMAIL = '/join/email'
export const SIGN_UP_CONTINUE = '/join/final-step'
export const CONNECT_PROFILES = '/connect-profiles'
export const THANK_YOU = '/thank-you'
export const LOGIN = '/login'
export const LOGIN_EMAIL = '/login/email'
export const PASSWORD_FORGET = '/forgot-password'
export const POSTS = '/'
export const CONTROLS = '/controls'
export const INSIGHTS = '/insights'
export const ACCOUNT = '/account'
export const PAYMENT = '/account?add-payment'
export const CONNECTIONS = '/account?connections'
export const RESULTS = '/results'
export const TOURNAMENTS = '/tournaments'
export const FAQ = '/faq'
export const PRICING = '/pricing'
export const NOTIFICATIONS = '/notifications'
export const TARGETING = '/targeting'
export const HOME = POSTS
// Array of restricted pages
export const restrictedPages = [
  LOGIN_EMAIL,
  SIGN_UP_CONTINUE,
  CONNECT_PROFILES,
  THANK_YOU,
  POSTS,
  INSIGHTS,
  ACCOUNT,
  PAYMENT,
  CONNECTIONS,
  RESULTS,
  NOTIFICATIONS,
  TARGETING,
  HOME,
]
