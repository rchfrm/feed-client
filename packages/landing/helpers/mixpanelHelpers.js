// DOCS: https://developer.mixpanel.com/docs/javascript
import mixpanel from 'mixpanel-browser'
import { parseUrl } from '@/landing/helpers/utils'

// INIT
// ---------
const isDevelopment = process.env.NODE_ENV === 'development'
const token = process.env.mixpanel_token
let isMixpanelSetup = false

export const initMixpanel = () => {
  mixpanel.init(
    token,
    {
      api_host: 'https://api-eu.mixpanel.com',
      loaded: () => {
        isMixpanelSetup = true
      },
    },
  )
}

// TRACK MIXPANEL EVENTS
export const mixpanelTrack = (action, payload, callback = () => {}) => {
  // Only LOG track if in dev
  if (isDevelopment) {
    console.group()
    console.info('MIXPANEL SEND')
    console.info('ACTION: ', action)
    console.info(payload)
    console.groupEnd()
    // Run callback
    callback()
    return
  }
  mixpanel.track(action, payload, callback)
}

// SPECIAL EVENTS

// Sign Up
export const mixpanelSignUp = (userId) => {
  mixpanel.alias(userId)
}

// Log in
export const mixpanelLogin = (userId) => {
  mixpanel.identify(userId)
}

// Sign Out
export const mixpanelSignOut = () => {
  mixpanel.reset()
}

// Page view
export const mixpanelPageView = (url) => {
  const { pathname: current_url_cleaned } = parseUrl(`${window.location.origin}${url}`)
  mixpanelTrack('page_view', { current_url_cleaned })
}

// Internal link click
export const mixpanelInternalLinkClick = (url, payload = {}) => {
  mixpanelTrack('link_click', { ...payload, value: url })
}

// External link click
export const mixpanelExternalLinkClick = (url, payload = {}, responseWait = 300) => {
  // Call this to go to page
  const goToPage = () => { window.location.href = url }
  // If mixpanel is not setup, just go to page
  if (!isMixpanelSetup) return goToPage()
  // Start timer ro run page change if mixpanel is too slow
  const waitTimer = setTimeout(goToPage, responseWait)
  // Track click
  mixpanelTrack('link_click', { ...payload, value: url }, () => {
    // After successful track....
    // Stop timer
    clearTimeout(waitTimer)
    // Go to page after succesful track
    goToPage()
  })
}

// REGISTER SUPER PROPERTIES
export const mixpanelRegister = (details) => {
  mixpanel.register(details)
}
