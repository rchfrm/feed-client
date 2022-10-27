// * ADMIN VERSION

export const LOGIN = '/login'
export const PASSWORD_FORGET = '/forgot-password'
export const ARTISTS = '/'
export const ARTIST = '/artists'
export const USERS = '/users'
export const USER = '/user'
export const ORGANIZATION = '/organisation'
export const ORGANIZATIONS = '/organisations'
export const TOURNAMENTS = '/tournaments'
export const TOURNAMENT = '/tournament'
export const HOME = ARTISTS
// Array of restricted pages
export const restrictedPages = [
  ARTISTS,
  ARTIST,
  USERS,
  ORGANIZATION,
  ORGANIZATIONS,
  TOURNAMENTS,
  TOURNAMENT,
]

export const signedOutPages = [
  LOGIN,
  PASSWORD_FORGET,
]
