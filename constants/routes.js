export const SIGN_UP = '/join'
export const SIGN_UP_EMAIL = '/join/email'
export const CONNECT_ACCOUNTS = '/connect-accounts'
export const THANK_YOU = '/thank-you'
export const LOGIN = '/login'
export const LOGIN_EMAIL = '/login/email'
export const PASSWORD_FORGET = '/forgot-password'
export const POSTS = '/'
export const INSIGHTS = '/insights'
export const ACCOUNT = '/account'
export const PAYMENT = '/account?add-payment'
export const CONNECTIONS = '/account?connections'
export const RESULTS = '/results'
export const FAQ = '/faq'
export const PRICING = '/pricing'
export const TERMS = '/terms'
export const NOTIFICATIONS = '/notifications'
export const HOME = POSTS
// Array of restricted pages
export const restrictedPages = [
  LOGIN_EMAIL,
  CONNECT_ACCOUNTS,
  THANK_YOU,
  POSTS,
  INSIGHTS,
  ACCOUNT,
  PAYMENT,
  CONNECTIONS,
  RESULTS,
  NOTIFICATIONS,
  HOME,
]
