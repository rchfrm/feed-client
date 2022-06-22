// * ADMIN VERSION

export const LOGIN = '/login'
export const PASSWORD_FORGET = '/forgot-password'
export const ARTISTS = '/'
export const ARTIST = '/artists'
export const USERS = '/users'
export const USER = '/user'
export const ORGANISATION = '/organisation'
export const ORGANISATIONS = '/organisations'
export const TOURNAMENTS = '/tournaments'
export const TOURNAMENT = '/tournament'
export const HOME = ARTISTS
// Array of restricted pages
export const restrictedPages = [
  ARTISTS,
  ARTIST,
  USERS,
  ORGANISATION,
  ORGANISATIONS,
  TOURNAMENTS,
  TOURNAMENT,
]

export const signedOutPages = [
  LOGIN,
  PASSWORD_FORGET,
]
